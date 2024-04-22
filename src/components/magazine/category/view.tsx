import { getDeviceVersion } from '../../../utils/responsive';
import { MAGAZINE_CATEGORY_TYPE } from '../../../constants/application/magazine-category';

import { IProps } from './model';
import renderDesktop from './view-desktop';
import renderMobile from './view-mobile';
import renderCategoryVideo from './view-video';

const renderView = (props: IProps) => {
  const { type, list, title, url, titleStyle, onItemClick } = props as IProps;
  let switchView = {};

  switch (type) {
    case 1:
      switchView = {
        MOBILE: () => renderMobile({ title, url, list, onItemClick }),
        DESKTOP: () => renderDesktop({ title, url, list, titleStyle, onItemClick })
      };
      return switchView[getDeviceVersion()]();

    case 2:
      switchView = {
        MOBILE: () => renderMobile({ title, url, list, onItemClick }),
        DESKTOP: () => renderDesktop({ title, url, list, titleStyle, onItemClick })
      };
      return switchView[getDeviceVersion()]();

    case 3:
      switchView = {
        MOBILE: () => renderMobile({ title, url, list, onItemClick }),
        DESKTOP: () => renderDesktop({ title, url, list, titleStyle, onItemClick })
      };
      return switchView[getDeviceVersion()]();

    case 4:
      switchView = {
        MOBILE: () => renderMobile({ title, url, list, onItemClick }),
        DESKTOP: () => renderDesktop({ title, url, list, titleStyle, onItemClick })
      };
      return switchView[getDeviceVersion()]();

    case 5:
      switchView = {
        MOBILE: () => renderMobile({ title, url, list, onItemClick }),
        DESKTOP: () => renderDesktop({ title, url, list, titleStyle, onItemClick })
      };
      return switchView[getDeviceVersion()]();

    case MAGAZINE_CATEGORY_TYPE.VIDEO.type:
      switchView = {
        MOBILE: () =>
          renderMobile({
            title: MAGAZINE_CATEGORY_TYPE.VIDEO.title,
            url: '',
            list,
            type: 'video',
            onItemClick
          }),
        DESKTOP: () =>
          renderCategoryVideo({
            title: MAGAZINE_CATEGORY_TYPE.VIDEO.title,
            list,
            onItemClick
          })
      };
      return switchView[getDeviceVersion()]();

    case MAGAZINE_CATEGORY_TYPE.TRENDING.type:
      return renderDesktop({
        title: MAGAZINE_CATEGORY_TYPE.TRENDING.title,
        url: '',
        list,
        size: 'small',
        titleStyle,
        onItemClick
      });

    default:
      switchView = {
        MOBILE: () => renderMobile({ title, url, list, onItemClick }),
        DESKTOP: () => renderDesktop({ title, url, list, titleStyle, onItemClick })
      };

      return switchView[getDeviceVersion()]();
  }
};

export default renderView;
