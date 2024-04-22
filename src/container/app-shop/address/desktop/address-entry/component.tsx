import { useState } from 'react';
import classNames from 'classnames';

import SvgIcon from 'presentation-component/ui/icon';
import InlineConfirmation from 'presentation-component/general/desktop/inline-confirmation';
import Tooltip from 'presentation-component/ui/tooltip';
import style from './style.module.scss';

const ENTRY_ACTION_TYPE = Object.freeze({
  SELECT: 'select',
  SET_PRIMARY: 'set_primary',
  EDIT: 'edit',
  DELETE: 'delete',
  ADD: 'add'
});

interface Action {
  type: string;
  name: string;
  icon: string;
  confirmation?: any;
}
interface AddressEntryProps {
  id: number | string;
  title: string;
  description: string;
  selectable: boolean;
  selected?: boolean;
  clickable?: boolean;
  primary: boolean;
  actions: Array<Action>;
  onAction: (param?: any) => any;
  className: string;
}
const AddressEntry = ({
  id,
  title,
  description,
  selectable,
  selected,
  clickable,
  primary,
  actions,
  onAction,
  className
}: AddressEntryProps) => {
  const [confirmationPromptState, setConfirmationPromptState] = useState<{ visible: boolean; action?: Action }>({
    visible: false
  });
  const setConfirmationVisibility = (visibility: boolean) =>
    setConfirmationPromptState((prevState) => ({ visible: visibility, action: prevState.action }));
  const confirmationVisible =
    confirmationPromptState.visible && confirmationPromptState.action && confirmationPromptState.action.confirmation;
  const confirmationMessage =
    (confirmationPromptState.action &&
      confirmationPromptState.action.confirmation &&
      confirmationPromptState.action.confirmation.message) ||
    '';

  return (
    <div
      className={classNames(
        style.addressEntry,
        clickable && style.clickable,
        className,
        confirmationVisible || style.addressEntryHoverable,
        selected && style.addressEntrySelected
      )}
      onClick={() => onAction({ id, type: ENTRY_ACTION_TYPE.SELECT, repeat: selected })}
    >
      <div className={style.header}>
        {selectable && (
          <div className={style.iconContainer}>
            <SvgIcon
              name={selected ? 'radio-checked' : 'radio-empty'}
              className={classNames(style.icon, selected && style.iconSelected)}
            />
          </div>
        )}
        <div className={classNames(style.title, selectable || style.nonSelectableTitle)}>{title}</div>
      </div>
      <div className={classNames(style.brief, selectable || style.nonSelectableBrief)}>
        <div className={style.description}>{description}</div>
      </div>
      {primary && <div className={style.tag}>Mặc định</div>}
      {!!actions.length && (
        <div className={style.actions}>
          {actions.map((action, index) => (
            <Tooltip key={index} tip={action.name} classes={{ tooltip: style.tooltip }} position="left">
              <div
                key={action.type}
                className={style.action}
                onClick={(e) => {
                  e.stopPropagation();
                  action.confirmation
                    ? setConfirmationPromptState({ visible: true, action })
                    : onAction({ id, type: action.type });
                }}
              >
                <SvgIcon name={action.icon} className={style.icon} />
              </div>
            </Tooltip>
          ))}
        </div>
      )}
      <InlineConfirmation
        promptMessage={confirmationMessage}
        className={style.confirmationPrompt}
        visible={confirmationVisible}
        confirmationAction={{
          title: 'Xóa',
          icon: 'trash',
          onClick: () => {
            onAction({ id, type: confirmationPromptState.action && confirmationPromptState.action.type });
            setConfirmationVisibility(false);
          }
        }}
        cancelAction={{
          title: 'Huỷ',
          icon: 'close',
          onClick: () => setConfirmationVisibility(false)
        }}
      />
    </div>
  );
};

AddressEntry.defaultProps = {
  primary: false,
  actions: [],
  selectable: true,
  selected: false,
  clickable: true,
  onAction: () => {},
  className: ''
};

export default AddressEntry;
