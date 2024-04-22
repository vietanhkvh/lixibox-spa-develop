import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import MobileAutoDisplayHeader from 'presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from 'presentation-component/general/mobile-screen-header/component';
import Loading from 'components/ui/loading/component';
import Icon from '../../../components/ui/icon';
import { isMobileVersion } from 'utils/responsive';
import componentStyles from 'style/component.module.scss';
import { IProps } from './model';
import STYLE from './style';
import styles from './style.module.scss';

const renderHeader = ({ title, showHeader, showViewMore, linkProps, viewMoreText, iconProps, textAlignType }) => {
  return false === showHeader ? null : (
    <div
      className={classNames(componentStyles.blockHeading, componentStyles.blockHeadingAutoAlign, styles.textAlign)}
      style={STYLE.textAlign[textAlignType]}
    >
      {isMobileVersion() ? (
        <MobileAutoDisplayHeader row={1}>
          <MobileScreenHeader title={title} />
        </MobileAutoDisplayHeader>
      ) : (
        <div className={componentStyles.blockHeadingTitle}>
          <span className={classNames(componentStyles.blockHeadingTitleText, styles.headingTitle, 'headline-typo')}>
            {title}
          </span>
        </div>
      )}
      {true === showViewMore && (
        <NavLink {...linkProps}>
          {viewMoreText}
          <Icon {...iconProps} />
        </NavLink>
      )}
    </div>
  );
};

const renderView = (props: IProps) => {
  const {
    title,
    viewMoreText,
    viewMoreLink,
    showHeader,
    showViewMore,
    content,
    style,
    textAlignType,
    isIframeLoading
  } = props;

  const linkProps = {
    to: viewMoreLink,
    className: classNames(componentStyles.blockHeadingViewMore, componentStyles.blockHeadingViewMoreAutoAlign),
    style: STYLE.viewMore
  };

  const iconProps = {
    name: 'angle-right',
    className: componentStyles.blockHeadingViewMoreIcon
  };

  return (
    <div style={style}>
      {renderHeader({
        title,
        showHeader,
        showViewMore,
        linkProps,
        viewMoreText,
        iconProps,
        textAlignType
      })}
      {isIframeLoading && <Loading />}
      {content}
    </div>
  );
};

export default renderView;
