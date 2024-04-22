import WrapLayout from '../../../layout/wrap';
import SplitLayout from '../../../layout/split';
import Loading from '../../../../components/ui/loading';

import NotFound from '../../../../presentation-component/faq/not-found';
import FaqCover from '../../../../presentation-component/faq/cover';
import FaqHeading from '../../../../presentation-component/faq/heading';
import FaqNavigation from '../../../../presentation-component/faq/navigation';
import ArticleDetail from '../../../../presentation-component/faq/article-detail';

import { ROUTING_PRODUCT_MANUAL, ROUTING_ARTICLE_DETAIL_PATH } from '../../../../routings/path';

import * as VARIABLE from '../../../../style/variable';

function render() {
  const {
    faqStore: { topicList, articlesList, articlesDetail, isFetchArticlesDetail }
  } = this.props;

  const mainStyle = {
    border: `1px solid ${VARIABLE.colorF0}`,
    backgroundColor: VARIABLE.colorWhite,
    borderRadius: 8,
    height: '100%',
    width: 'calc(100% - 10px)',
    marginLeft: 10
  } as any;

  const relatedArticleList = articlesList?.filter((item) => item.slug !== articlesDetail?.slug) || [];

  const relatedArticlesProps = {
    list: relatedArticleList,
    isBoldTitle: true,
    urlPath: ROUTING_ARTICLE_DETAIL_PATH,
    isWithoutBorder: true,
    isWithNumberOrdering: true
  };

  const splitLayoutProps = {
    type: 'left',
    mainContainer: (
      <div style={mainStyle}>
        <FaqHeading title={''} description={articlesDetail.name} />
        {!!isFetchArticlesDetail ? (
          <Loading />
        ) : !!articlesDetail ? (
          <>
            <ArticleDetail title={articlesDetail.name} content={articlesDetail.content} />
            {!!relatedArticleList.length && (
              <>
                <FaqHeading title={''} description={'Thông tin liên quan'} />
                <FaqNavigation {...relatedArticlesProps} />
              </>
            )}
          </>
        ) : (
          <NotFound />
        )}
      </div>
    ),
    subContainer: (
      <div>
        <FaqNavigation list={topicList} urlPath={ROUTING_PRODUCT_MANUAL} selectedSlug={''} />
      </div>
    )
  };

  const wrapStyle = {
    paddingTop: 30,
    paddingBottom: 30,
    position: 'relative',
    marginTop: -87,
    zIndex: VARIABLE.zIndex5
  };

  return (
    <div>
      <FaqCover selectedTopicName={articlesDetail.name} />
      <WrapLayout style={wrapStyle}>
        <SplitLayout {...splitLayoutProps} />
      </WrapLayout>
    </div>
  );
}

export default render;
