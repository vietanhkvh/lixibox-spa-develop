import { objectToHash } from '../../../utils/encode';
import { isUndefined } from '../../../utils/validate';
import Loading from '../../../components/ui/loading';

import { IProps, IState } from './model';
import { renderMainContainer } from './view-general';

function renderMobile({ props, state }) {
  const {
    match: {
      params: { feedbackId }
    },
    feedbackStore: { feedbackById }
  } = props as IProps;

  const { isLoading } = state as IState;

  const keyHash = objectToHash({ feedbackId });
  const feedItem = (feedbackById && !isUndefined(feedbackById[keyHash]) && feedbackById[keyHash]) || {};

  return isLoading ? <Loading /> : renderMainContainer({ feedItem });
}

export default renderMobile;
