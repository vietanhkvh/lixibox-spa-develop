import WrapLayout from '../../../layout/wrap';
import FaqCover from '../../../../presentation-component/faq/cover';
import FaqNavigation from '../../../../presentation-component/faq/navigation';
import NotFound from '../../../../presentation-component/faq/not-found';

import Loading from '../../../../components/ui/loading';

import { ROUTING_PRODUCT_MANUAL } from '../../../../routings/path';

import * as VARIABLE from '../../../../style/variable';

function render() {
  const {
    faqStore: { topicList, isFetchTopicList }
  } = this.props;

  const wrapStyle = {
    padding: 20,
    position: 'relative',
    marginTop: -60,
    zIndex: VARIABLE.zIndex5
  };

  return (
    <>
      <FaqCover />
      <WrapLayout style={wrapStyle}>
        {!!isFetchTopicList ? (
          <Loading />
        ) : !!topicList.length ? (
          <FaqNavigation list={topicList} urlPath={ROUTING_PRODUCT_MANUAL} />
        ) : (
          <NotFound />
        )}
      </WrapLayout>
    </>
  );
}

export default render;
