import WrapLayout from '../../layout/wrap';
import { objectToHash } from '../../../utils/encode';
import { isUndefined } from '../../../utils/validate';

import Loading from '../../../components/ui/loading';

import { renderMainContainer } from './view-general';
import { IProps, IState } from './model';
import STYLE from './style';

function renderDesktop({ props, state }) {
  const {
    match: {
      params: { feedbackId }
    },
    feedbackStore: { feedbackById }
  } = props as IProps;

  const { isLoading } = state as IState;

  const keyHash = objectToHash({ feedbackId });
  const feedItem = (feedbackById && !isUndefined(feedbackById[keyHash]) && feedbackById[keyHash]) || {};

  return isLoading ? (
    <Loading />
  ) : (
    <WrapLayout>
      <div style={STYLE.wrapLayout}>{renderMainContainer({ feedItem })}</div>
    </WrapLayout>
  );
}

export default renderDesktop;
