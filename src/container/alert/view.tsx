import Modal from 'react-modal';
import classNames from 'classnames';

import Icon from '../../components/ui/icon';
import { IProps, IState } from './model';
import STYLE from './style';
import style from './style.module.scss';
import { generateTestId } from 'utils/test-utils';

interface IRenderViewProps {
  props: IProps;
  state: IState;
  handleCloseAlert: any;
}

const renderContent = ({ item, alertIconProps }) =>
  true === item.isShowIconText ? (
    <div style={STYLE.iconText(item.type)}>{item.iconText}</div>
  ) : (
    '' !== item.icon && <Icon {...alertIconProps} />
  );

const renderView = ({ props, state, handleCloseAlert }: IRenderViewProps) => {
  const {
    alertStore,
    cartStore: { isCartSummaryVisible }
  } = props;
  const { waitingClose, waitingShow } = state;

  const generateContainerProps = (item: any) => {
    const isRemove = waitingClose.indexOf(item.id) >= 0;
    const isShow = waitingShow.indexOf(item.id) >= 0;

    return {
      key: `alert-item-${item.id}`,
      style: STYLE.item(item.type, isRemove, isShow)
    };
  };

  const generateAlertIconProps = (item: any) => ({
    style: STYLE.icon(item.type),
    innerStyle: STYLE.iconInner,
    name: item.icon
  });

  /** Icon to force reomve alert item */
  const generateCloseIconProps = (item: any) => ({
    onClick: () => handleCloseAlert(item.id),
    innerStyle: STYLE.iconClose.inner,
    style: STYLE.iconClose,
    name: 'close'
  });
  const hasAlert = !!alertStore.list.length;

  return (
    <Modal
      isOpen={hasAlert}
      overlayClassName={{
        base: classNames('alertOverlay', style.alertOverlay),
        afterOpen: style.alertOverlayAfterOpen,
        beforeClose: style.alertOverlayBeforeClose
      }}
      className={style.alertContent}
    >
      <div className={style.alertContainer} style={STYLE.container(isCartSummaryVisible)}>
        {alertStore.list.map((item, index) => {
          const containerProps = generateContainerProps(item);
          const alertIconProps = generateAlertIconProps(item);
          const closeIconProps = generateCloseIconProps(item);

          return (
            index === alertStore.list.length - 1 && (
              <div {...generateTestId({ name: 'alert-modal' })} className={'alert-item'} {...containerProps}>
                {renderContent({ item, alertIconProps })}
                <div style={STYLE.info}>
                  <div style={STYLE.info.content}>{item.content}</div>
                </div>
                <Icon {...closeIconProps} />
              </div>
            )
          );
        })}
      </div>
    </Modal>
  );
};

export default renderView;
