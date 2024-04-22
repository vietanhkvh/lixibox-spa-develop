import WrapLayout from '../../../layout/wrap';
import SplitLayout from '../../../layout/split';

import Loading from '../../../../components/ui/loading';

import FaqCover from '../../../../presentation-component/faq/cover';
import NotFound from '../../../../presentation-component/faq/not-found';
import FaqHeading from '../../../../presentation-component/faq/heading';
import FaqNavigation from '../../../../presentation-component/faq/navigation';

import { ROUTING_PRODUCT_MANUAL, ROUTING_ARTICLE_DETAIL_PATH } from '../../../../routings/path';

import * as VARIABLE from '../../../../style/variable';

function render() {
  const {
    match,
    faqStore: { topicList, articlesList, isFetchTopicList, isFetchArticlesList }
  } = this.props;
  const topicSlug = !!match && !!match.params ? match.params.topicSlug : '';

  const mainStyle = {
    border: `1px solid ${VARIABLE.colorF0}`,
    backgroundColor: VARIABLE.colorWhite,
    borderRadius: 8,
    height: '100%',
    width: 'calc(100% - 10px)',
    marginLeft: 10
  } as any;

  const filteredTopicList = Array.isArray(topicList) && topicList.find((item) => item.slug === topicSlug);
  const selectedTopicName = !!filteredTopicList ? filteredTopicList.name : '';

  const splitLayoutProps = {
    type: 'left',
    mainContainer: (
      <div style={mainStyle}>
        <FaqHeading title={''} description={selectedTopicName} />
        {!!isFetchTopicList || !!isFetchArticlesList ? (
          <Loading />
        ) : !!articlesList.length ? (
          <>
            <FaqNavigation
              isWithoutBorder={true}
              isBoldTitle={true}
              isBigTitle={true}
              list={articlesList}
              isWithNumberOrdering={true}
              urlPath={ROUTING_ARTICLE_DETAIL_PATH}
            />
          </>
        ) : (
          <NotFound />
        )}
      </div>
    ),
    subContainer: (
      <div>
        <FaqNavigation list={topicList} urlPath={ROUTING_PRODUCT_MANUAL} selectedSlug={topicSlug} />
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
      <FaqCover selectedTopicName={selectedTopicName} />
      <WrapLayout style={wrapStyle}>
        <SplitLayout {...splitLayoutProps} />
      </WrapLayout>
    </div>
  );
}

export default render;
