import { getDeviceVersion } from '../../../../utils/responsive';
import LoadingPlaceholder from '../../../../components/ui/loading-placeholder';

import renderDesktop from './view-desktop';
import renderMobile from './view-mobile';
import STYLE from './style';

export const renderLoadingPlaceholder = () => (
  <div style={STYLE.placeholder.container}>
    <div style={STYLE.placeholder.productList}>
      {(getDeviceVersion() === 'DESKTOP' ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] : [1, 2, 3, 4, 5]).map(
        (item) => (
          <div
            style={{ ...STYLE.placeholder.productItem.init, ...STYLE.placeholder.productItem[getDeviceVersion()] }}
            key={item}
          >
            <LoadingPlaceholder style={STYLE.placeholder.productItem.image} />
            <LoadingPlaceholder style={STYLE.placeholder.productItem.text} />
            <LoadingPlaceholder style={STYLE.placeholder.productItem.lastText} />
          </div>
        )
      )}
    </div>
  </div>
);

const renderView = ({ props, state }) => {
  const switchView = {
    MOBILE: () => renderMobile({ props, state }),
    DESKTOP: () => renderDesktop({ props, state })
  };

  return switchView[getDeviceVersion()]();
};

export default renderView;
