import { getDeviceVersion } from '../../../utils/responsive';

import renderDesktop from './view-desktop';
import renderMobile from './view-mobile';

export function renderComponent({
  props,
  state,
  handleAddComment,
  handleInputOnChange,
  handleOnKeyUp,
  handlePaginationClick,
  handleFetchApi,
  handleSetReplyComment
}) {
  const dataProps = {
    props,
    state,
    handleAddComment,
    handleInputOnChange,
    handleOnKeyUp,
    handlePaginationClick,
    handleFetchApi,
    handleSetReplyComment
  };

  const switchView = {
    MOBILE: () => renderMobile(dataProps),
    DESKTOP: () => renderDesktop(dataProps)
  };

  return switchView[getDeviceVersion()]();
}
