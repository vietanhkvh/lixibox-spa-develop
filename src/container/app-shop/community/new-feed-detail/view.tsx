import { getDeviceVersion } from '../../../../utils/responsive';

import renderDesktop from './view-desktop';
import renderMobile from './view-mobile';
import STYLE from './style';

export const renderLoadingPlaceholder = () => (
  <div style={STYLE.placeholder}>
    {[1, 2, 3].map((item) => (
      <div style={STYLE.placeholder.item} key={item}>
        <div style={STYLE.placeholder.item.top}>
          <div className={'ani-bg'} style={STYLE.placeholder.item.top.avatar} />
          <div style={STYLE.placeholder.item.top.info}>
            <div className={'ani-bg'} style={STYLE.placeholder.item.top.username} />
            <div className={'ani-bg'} style={STYLE.placeholder.item.top.star} />
          </div>
        </div>
        <div style={STYLE.placeholder.item.bottom}>
          <div className={'ani-bg'} style={STYLE.placeholder.item.bottom.firstText} />
          <div className={'ani-bg'} style={STYLE.placeholder.item.bottom.text} />
          <div className={'ani-bg'} style={STYLE.placeholder.item.bottom.text} />
          <div className={'ani-bg'} style={STYLE.placeholder.item.bottom.lastText} />
        </div>
      </div>
    ))}
  </div>
);

const renderView = ({ props }) => {
  const switchView = {
    MOBILE: () => renderMobile({ props }),
    DESKTOP: () => renderDesktop({ props })
  };

  return switchView[getDeviceVersion()]();
};

export default renderView;
