import ButtonSubmit from '../../../components/ui/submit-button';

import { IProps, IState } from './model';
import STYLE from './style';

function handleRenderReason(item) {
  const reasonId = (item && item.id) || 0;

  const reasonProps = {
    key: `reason-item-${reasonId}`,
    style: STYLE.container.reason,
    onClick: () => this.handleSelectedReason(reasonId)
  };

  return (
    <div {...reasonProps}>
      <div
        style={Object.assign(
          {},
          STYLE.container.reason.icon,
          this.cancelReasonId === reasonId && STYLE.container.reason.icon.selected
        )}
      >
        <div style={STYLE.container.reason.icon.firstCheck}></div>
        <div style={STYLE.container.reason.icon.lastCheck}></div>
      </div>
      <div style={STYLE.container.reason.text}>{(item && item.content) || ''}</div>
    </div>
  );
}

export function renderComponent({ props, state, handleSubmit, handleSelectedReason }) {
  const {
    data: {
      data: { cancelOrderReasonList }
    }
  } = props as IProps;
  const { cancelReasonId } = state as IState;

  const buttonProps = {
    loading: false,
    icon: '',
    title: 'Gửi',
    disabled: cancelReasonId === 0,
    onSubmit: handleSubmit,
    style: STYLE.container.btnWrap.btn,
    styleIcon: {}
  };

  return (
    <div style={STYLE.container.wrap}>
      <div>
        {Array.isArray(cancelOrderReasonList) &&
          !!cancelOrderReasonList.length &&
          cancelOrderReasonList.map(handleRenderReason, {
            handleSelectedReason,
            cancelReasonId
          })}
      </div>
      <div style={STYLE.container.btnWrap}>
        <ButtonSubmit {...buttonProps} />
      </div>
    </div>
  );
}
