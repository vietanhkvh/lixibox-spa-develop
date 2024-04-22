import classNames from 'classnames';
import { getDeviceVersion } from '../../../utils/responsive';
import WrapLayout from '../../../container/layout/wrap';
import { IProps } from './model';
import componentStyles from '../../../style/component.module.scss';
import STYLE from './style';

const renderTitle = ({ title, titleStyle = {} }) => {
  const mobileHeader = () => (
    <div
      className={classNames(componentStyles.blockHeading, componentStyles.blockHeadingMultiLine)}
      style={Object.assign({}, STYLE.mobileTitle, titleStyle)}
    >
      <div className={componentStyles.blockHeadingTitleMultiLine}>
        <span
          className={classNames(componentStyles.blockHeadingTitleText, componentStyles.blockHeadingTitleTextMultiLine)}
        >
          {title}
        </span>
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
  const { video } = props as IProps;

  return (
    <WrapLayout>
      {renderTitle({ title: 'Video ' })}
      <div style={STYLE.videoContainer.iframeVideo}>
        <video id={'main-video'} style={STYLE.videoContainer.video} src={(video && video.url) || ''}>
          {/* <source src={video && video.url || ''} /> */}
        </video>
      </div>
    </WrapLayout>
  );
}
