import classNames from 'classnames';
import ImageSlider from '../../../container/landing-page/component/image-slider';
import { getDeviceVersion } from '../../../utils/responsive';

import { IProps } from './model';
import componentStyles from '../../../style/component.module.scss';
import STYLE from './style';

const renderTitle = ({ title, titleStyle = {} }) => {
  const mobileHeader = () => (
    <div>
      <div
        className={classNames(componentStyles.blockHeading, componentStyles.blockHeadingMultiLine)}
        style={Object.assign({}, STYLE.mobileTitle, titleStyle)}
      >
        <div className={componentStyles.blockHeadingTitleMultiLine}>
          <span
            className={classNames(
              componentStyles.blockHeadingTitleText,
              componentStyles.blockHeadingTitleTextMultiLine
            )}
          >
            {title}
          </span>
        </div>
      </div>
    </div>
  );

  const switchHeader = {
    MOBILE: () => mobileHeader(),
    DESKTOP: () => null
  };

  return switchHeader[getDeviceVersion()]();
};

export function renderComponent({ props }) {
  const { shopTheLooks, openModal } = props as IProps;

  return (
    <div style={STYLE.shopTheLook.container}>
      {renderTitle({ title: 'Shop to look' })}
      <div style={STYLE.shopTheLook.imageSlider}>
        <ImageSlider data={shopTheLooks} openModal={openModal} />
      </div>
    </div>
  );
}
