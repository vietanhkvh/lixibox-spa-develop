import renderContent from './view-content';
import STYLE from './style';

const renderOverlayModal = (overlayProps) => <div id={'modal-overlay'} {...overlayProps} />;

/**
 * Render logic
 *
 * One overlay
 * Multi heading / content model: One each time just show the last modal item
 */

const renderMobileAlert = ({ props, state, handleCloseMobileAlert }) => {
  const { isShow, data } = props;
  const { isMobileAlertGoingOut } = state;

  const lastPopupIndex = data.length - 1;

  const containerStyle = Object.assign({}, STYLE.mobileAlert.container, isShow && STYLE.mobileAlert.containerWithShow);
  const overlayProps = {
    onClick: handleCloseMobileAlert,
    style: Object.assign(
      {},
      STYLE.overlay,
      STYLE.overlay.blur,
      !!isShow && !isMobileAlertGoingOut && STYLE.overlay.show,
      data[lastPopupIndex] && data[lastPopupIndex].modalStyle && data[lastPopupIndex].modalStyle.ovelay
    )
  };

  function renderContentModal(item, $index) {
    const modalContentProps = {
      className: 'scroll-view',
      style: Object.assign(
        {},
        STYLE.mobileAlert.content,
        !!this.isShow &&
          !isMobileAlertGoingOut &&
          $index === this.props.data.length - 1 &&
          STYLE.mobileAlert.content.show,
        { display: $index === this.props.data.length - 1 ? 'flex' : 'none' }
      ),
      key: `modal-content-${$index}`
    };

    const overlayProps = {
      style: STYLE.subMobileAlertOverlay,
      onClick: handleCloseMobileAlert
    };

    return (
      <div id="modal-content" {...modalContentProps}>
        <div {...overlayProps} />
        {renderContent(this.props, $index, handleCloseMobileAlert)}
      </div>
    );
  }

  return (
    <div id={'modal-container'} style={containerStyle}>
      {renderOverlayModal(overlayProps)}
      {Array.isArray(data) && data.map(renderContentModal, { isShow, props })}
    </div>
  );
};

export default renderMobileAlert;
