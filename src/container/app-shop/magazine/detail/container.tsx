import { PureComponent } from 'react';

import { isMobileVersion } from 'utils';
import { DATETIME_FORMAT_TYPE } from 'constants/application/global';
import { formatDateTime } from 'utils/date-time';
import { isUndefined } from 'utils/validate';
import { objectToHash } from 'utils/encode';
import { getCurrentScrollPercentage } from 'utils/scroll';
import { debounceEvent } from 'utils/rate-limiter';

import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';
import renderView from './view';
import { gatewayTrackCompleteMagazine, gatewayTrackViewedMagazine } from 'tracking/gateway';

class MagazineDetailContainer extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  // timeout ID
  scrollResetTimeoutId: NodeJS.Timeout;
  maxScrollPercentage: number;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE as IState;
    this.scrollResetTimeoutId = null;
    this.maxScrollPercentage = 0;
  }

  handleFetchMagazineBySlug(slug) {
    const {
      fetchMagazineBySlug,
      magazineStore: { magazineBySlug }
    } = this.props as IProps;

    fetchMagazineBySlug({ slug });
    !isUndefined(magazineBySlug[objectToHash({ slug })]) && this.handleFetchMagazineRelatedBlog(slug);
  }

  handleFetchMagazineRelatedBlog(slug) {
    const {
      fetchMagazineRelatedBlog,
      magazineStore: { magazineRelatedBlog }
    } = this.props as IProps;

    const keyHash = objectToHash({ slug });

    fetchMagazineRelatedBlog({ slug });
    !isUndefined(magazineRelatedBlog[keyHash]) &&
      this.state.isPriorityBlock &&
      this.setState({ isPriorityBlock: false });
  }

  getBlogPostScrollPercentage(): number {
    const magazineDetail = document.getElementsByClassName('magazinePostDetail');
    const scrollPercentage = getCurrentScrollPercentage({
      targetElement: magazineDetail[0],
      targetOffset: isMobileVersion() ? 50 /* header */ : 188 + 50 /* header + marginTop */
    });

    return scrollPercentage;
  }

  onScroll(ctx, event) {
    debounceEvent(100)(
      function () {
        this.state.didScroll || this.setState({ didScroll: true });
        const scrollPercentage = this.getBlogPostScrollPercentage();
        if (scrollPercentage > this.maxScrollPercentage) {
          this.maxScrollPercentage = scrollPercentage;
        }
      }.bind(this)
    ).bind(this)();
  }

  sendScrollStatistics({ magazine, percentage }) {
    gatewayTrackCompleteMagazine({ magazine, scrollPercentage: percentage });
  }

  componentDidMount(): void {
    const {
      match: {
        params: { idPost }
      }
    } = this.props;

    this.handleFetchMagazineBySlug(idPost);

    window.addEventListener('scroll', this.onScroll.bind(this));
    // Delay 3s to get max scroll percentage and reset. Because, image lazy load will make scroll percentage change.
    this.scrollResetTimeoutId = setTimeout(() => {
      const scrollPercentage = this.getBlogPostScrollPercentage();
      this.maxScrollPercentage = scrollPercentage;
    }, 3000);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { magazineStore } = this.props;

    const {
      match: {
        params: { idPost }
      },
      magazineStore: { magazineBySlug, isFetchMagazineBySlugSuccess, isFetchMagazineRelatedBlogSuccess }
    } = nextProps;
    const keyHash = objectToHash({ slug: idPost });

    if (this.props.match?.params?.idPost !== idPost) {
      // this.state.didScroll &&
      this.sendScrollStatistics({
        magazine:
          this.props.magazineStore?.magazineBySlug?.[objectToHash({ slug: this.props.match?.params?.idPost })]
            ?.magazine,
        percentage: this.maxScrollPercentage
      });
      this.setState({ didScroll: false });
      this.maxScrollPercentage = 0;
    }

    if (magazineStore && !magazineStore.isFetchMagazineBySlugSuccess && isFetchMagazineBySlugSuccess) {
      this.handleFetchMagazineRelatedBlog(idPost);

      const magazine = magazineBySlug[keyHash] && magazineBySlug[keyHash].magazine;
      gatewayTrackViewedMagazine({ magazine });
    }

    magazineStore &&
      !magazineStore.isFetchMagazineRelatedBlogSuccess &&
      isFetchMagazineRelatedBlogSuccess &&
      this.state.isPriorityBlock &&
      this.setState({ isPriorityBlock: false });

    this.props.match.params.idPost !== idPost && this.handleFetchMagazineBySlug(idPost);

    const magazineBySlugResult =
      true === isUndefined(magazineBySlug[keyHash]) ? null : magazineBySlug[keyHash].magazine;
    if (!!magazineBySlugResult) {
      const currentMagazineBySlugResult = !!isUndefined(this.props.magazineStore.magazineBySlug[keyHash])
        ? null
        : this.props.magazineStore.magazineBySlug[keyHash].magazine;

      if (!currentMagazineBySlugResult || currentMagazineBySlugResult.slug !== magazineBySlugResult.slug) {
        this.props.updateMetaInfoAction({
          info: {
            url: `https://www.lixibox.com/magazine/${magazineBySlugResult.slug}`,
            type: 'article',
            title: magazineBySlugResult.title,
            description: magazineBySlugResult.description,
            keyword: magazineBySlugResult.tags.join(', '),
            image: magazineBySlugResult.cover_image.large_url,
            author: magazineBySlugResult.author && magazineBySlugResult.author.name,
            publishDate: formatDateTime(magazineBySlugResult.published_at, DATETIME_FORMAT_TYPE.DD_MM_YYYY)
          },
          structuredData: {
            breadcrumbList: [
              {
                position: 2,
                name: magazineBySlugResult.title,
                item: `https://www.lixibox.com/magazine/${magazineBySlugResult.slug}`
              }
            ]
          }
        });
      }
    }
  }

  componentWillUnmount() {
    this.props.clearDataMagazineAction();
    window.removeEventListener('scroll', this.onScroll.bind(this));
    // this.state.didScroll &&
    this.sendScrollStatistics({
      magazine:
        this.props.magazineStore?.magazineBySlug?.[objectToHash({ slug: this.props.match?.params?.idPost })]?.magazine,
      percentage: this.maxScrollPercentage
    });
    clearTimeout(this.scrollResetTimeoutId);
  }

  render() {
    const args = {
      props: this.props,
      state: this.state
    };

    return renderView(args);
  }
}

export default MagazineDetailContainer;
