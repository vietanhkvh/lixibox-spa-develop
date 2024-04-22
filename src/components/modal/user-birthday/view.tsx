import { getDeviceVersion } from '../../../utils/responsive';

import renderDesktopVersion from './view-desktop';
import renderMobileVersion from './view-mobile';

const renderView = ({
  props,
  inputValue,
  content,
  type,
  handleInputOnChange,
  handleSubmit,
  isMinimal,
  handleToggleMinial,
  successMessage
}) => {
  const switchView = {
    MOBILE: () =>
      renderMobileVersion({
        props,
        inputValue,
        handleInputOnChange,
        handleSubmit,
        type,
        content,
        isMinimal,
        handleToggleMinial,
        successMessage
      }),
    DESKTOP: () =>
      renderDesktopVersion({
        props,
        inputValue,
        handleInputOnChange,
        handleSubmit,
        isMinimal,
        handleToggleMinial,
        content,
        type,
        successMessage
      })
  };

  return switchView[getDeviceVersion()]();
};

export default renderView;
