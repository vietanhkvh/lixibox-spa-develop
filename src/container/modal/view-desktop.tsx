import Icon from '../../components/ui/icon';
import MainBlock from '../layout/main-block';
import * as LAYOUT from '../../style/layout';

import { IModalProps } from './model';
import renderContent from './view-content';
import STYLE from './style';

function renderContentModal(item, $index) {
  const mainBlockProps = {
    showHeader: true,
    showViewMore: false,
    title: item.title,
    content: null,
    style: {
      width: '100%',
      display: 'block',
      background: '#FFF',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 10
    }
  };

  const innerStyle = Object.assign(
    {},
    STYLE.content.inner,
    item.isShowDesktopTitle && STYLE.content.innerWithShowDesktopTitle,
    STYLE.content.desktopContent,
    item.modalStyle && item.modalStyle.content
  );

  const contentStyle = Object.assign(
    {},
    LAYOUT.flexContainer.center,
    LAYOUT.flexContainer.verticalFlex,
    LAYOUT.flexContainer.verticalCenter,
    STYLE.content,
    item.modalStyle && item.modalStyle.contentOuter,
    true === this.isShow && $index === this.props.data.length - 1 && STYLE.content.show
  );

  const iconProps = {
    name: 'close',
    style: STYLE.mobile.closeButton,
    onClick: () => {
      this.backStateWhenClosingModalAction();
      this.closeModal();
    },
    innerStyle: STYLE.mobile.closeButton.inner
  };

  return (
    <div id="modal-content" style={contentStyle} key={`modal-content-${$index}`}>
      {true === item.isShowDesktopTitle && (
        <div>
          {item && item.title && item.title.length > 0 && <MainBlock {...mainBlockProps} />}
          <Icon {...iconProps} />
        </div>
      )}
      <div style={innerStyle}>{true === this.isShow && renderContent(this.props, $index, this.handleCloseModal)}</div>
    </div>
  );
}

/**
 * Render logic
 *
 * One overlay
 * Multi content model: One each time just show the last modal item
 */
const renderDesktop = (props: IModalProps, state, handleCloseModal) => {
  const { closeModal, backStateWhenClosingModalAction, isShow, data } = props;

  const lastPopupIndex = data.length - 1;

  const containerStyle = Object.assign(
    {},
    LAYOUT.flexContainer.center,
    LAYOUT.flexContainer.verticalCenter,
    STYLE,
    true === isShow && STYLE.show,
    data[lastPopupIndex] && data[lastPopupIndex].modalStyle && data[lastPopupIndex].modalStyle.container
  );

  const overlayStyle = Object.assign(
    {},
    STYLE.overlay,
    true === isShow && STYLE.overlay.show,
    data[lastPopupIndex] && data[lastPopupIndex].modalStyle && data[lastPopupIndex].modalStyle.ovelay
  );

  const overlayProps = {
    onClick: () => {
      backStateWhenClosingModalAction();
      closeModal();
    },
    style: overlayStyle as any
  };

  return (
    <div id={'modal-container'} style={containerStyle as any}>
      <div id={'modal-overlay'} {...overlayProps} />
      {Array.isArray(data) &&
        data.map(renderContentModal, {
          isShow,
          props,
          backStateWhenClosingModalAction,
          closeModal,
          handleCloseModal: handleCloseModal
        })}
    </div>
  );
};

export default renderDesktop;
