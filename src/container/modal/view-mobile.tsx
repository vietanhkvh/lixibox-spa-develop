import Icon from '../../components/ui/icon';
import { IModalProps } from './model';

import renderContent from './view-content';
import componentStyles from 'style/component.module.scss';
import STYLE from './style';
import styles from './style.module.scss';

const renderOverlayModal = (overlayProps) => <div id={'modal-overlay'} {...overlayProps} />;

function renderHeaderModal(item, $index) {
  const iconProps = {
    name: 'close',
    style: STYLE.mobile.closeButton,
    onClick: () => {
      this.backStateWhenClosingModalAction();
      this.closeModal();
    },
    innerStyle: STYLE.mobile.closeButton.inner
  };

  const modalHeaderProps = {
    style: Object.assign({}, STYLE.mobile.header, {
      display: $index === this.props.data.length - 1 ? 'block' : 'none'
    }),
    key: `modal-header-${$index}`
  };

  return !item.canShowHeaderMobile ? null : (
    <div id={'modal-header'} {...modalHeaderProps}>
      <div style={STYLE.mobile.header.inner} className={styles.mobileHeaderInner}>
        <div className={componentStyles.blockHeadingTitle}>
          <div className={componentStyles.blockHeadingTitleText}>{item.title}</div>
        </div>
        <Icon {...iconProps} />
      </div>
    </div>
  );
}

function renderContentModal(item, $index) {
  const modalContentProps = {
    className: 'scroll-view',
    style: Object.assign({}, STYLE.mobile.content, item.modalStyle && item.modalStyle.content, {
      display: $index === this.props.data.length - 1 ? 'block' : 'none'
    }),
    key: `modal-content-${$index}`
  };

  return (
    <div id="modal-content" {...modalContentProps}>
      {this.isShow && (
        <div style={STYLE.mobile.scrollView} className={'scroll-view'}>
          {renderContent(this.props, $index)}
        </div>
      )}
    </div>
  );
}

/**
 * Render logic
 *
 * One overlay
 * Multi heading / content model: One each time just show the last modal item
 */

const renderMobile = (props: IModalProps) => {
  const { closeModal, backStateWhenClosingModalAction, isShow, data } = props;

  const lastPopupIndex = data.length - 1;

  const containerStyle = Object.assign({}, STYLE.mobile.container, isShow && STYLE.mobile.containerWithShow);
  const overlayProps = {
    style: Object.assign(
      {},
      STYLE.overlay,
      STYLE.mobileOverlay,
      true === isShow && STYLE.overlay.show,
      data[lastPopupIndex] && data[lastPopupIndex].modalStyle && data[lastPopupIndex].modalStyle.ovelay
    )
  };

  return (
    <div id={'modal-container'} style={containerStyle}>
      {renderOverlayModal(overlayProps)}
      {Array.isArray(data) &&
        data.map(renderHeaderModal, {
          backStateWhenClosingModalAction,
          closeModal,
          props
        })}
      {Array.isArray(data) && data.map(renderContentModal, { isShow, props })}
    </div>
  );
};

export default renderMobile;
