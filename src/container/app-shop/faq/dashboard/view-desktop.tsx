import WrapLayout from '../../../layout/wrap';
import SplitLayout from '../../../layout/split';

import Loading from '../../../../components/ui/loading';

import FaqCover from '../../../../presentation-component/faq/cover';
import NotFound from '../../../../presentation-component/faq/not-found';
import FaqNavigation from '../../../../presentation-component/faq/navigation';
import FaqHeading from '../../../../presentation-component/faq/heading';

import { ROUTING_PRODUCT_MANUAL, ROUTING_ARTICLE_DETAIL_PATH } from '../../../../routings/path';

import * as VARIABLE from '../../../../style/variable';

function render() {
  const {
    faqStore: { topicList, articlesList, isFetchTopicList, isFetchArticlesList }
  } = this.props;
  const mainStyle = {
    border: `1px solid ${VARIABLE.colorF0}`,
    backgroundColor: VARIABLE.colorWhite,
    borderRadius: 8,
    height: '100%',
    width: 'calc(100% - 10px)',
    marginLeft: 10
  } as any;

  const selectedTopicSlug = !!topicList && !!topicList.length ? topicList[0].slug : null;
  const selectedTopicName = !!topicList && !!topicList.length ? topicList[0].name : null;

  const splitLayoutProps = {
    type: 'left',
    mainContainer: (
      <div style={mainStyle}>
        {!!isFetchTopicList || !!isFetchArticlesList ? (
          <Loading />
        ) : !!articlesList.length ? (
          <>
            <FaqHeading title={''} description={selectedTopicName} />
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
        <FaqNavigation selectedSlug={selectedTopicSlug} list={topicList} urlPath={ROUTING_PRODUCT_MANUAL} />
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
