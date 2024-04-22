import { useState, useRef } from 'react';
import classNames from 'classnames';

import SvgIcon from '../../../../../presentation-component/ui/icon';
import ContextMenu from 'presentation-component/ui/context-menu';
import style from './style.module.scss';

const ENTRY_ACTION_TYPE = Object.freeze({
  SELECT: 'select',
  SET_PRIMARY: 'set_primary',
  EDIT: 'edit',
  DELETE: 'delete',
  ADD: 'add'
});

interface AddressEntryProps {
  className?: string;
  id: number | string;
  title: string;
  description: string;
  selectable: boolean;
  selected?: boolean;
  primary: boolean;
  actions: Array<{ type: string; name: string; icon: string }>;
  onAction: (param?: any) => any;
}
const AddressEntry = ({
  className,
  id,
  title,
  description,
  selectable,
  selected,
  primary,
  actions,
  onAction
}: AddressEntryProps) => {
  const [contextMenuVisible, setContextMenuVisibility] = useState(false);
  const menuElement: any = useRef(null);

  return (
    <div
      className={classNames(style.addressEntry, selected && style.addressEntrySelected, className)}
      onClick={() => onAction({ id, type: ENTRY_ACTION_TYPE.SELECT, repeat: selected })}
    >
      <div className={classNames(style.header, selectable || style.nonSelectableHeader)}>
        <div className={style.iconContainer}>
          <SvgIcon
            name={selected ? 'radio-checked' : 'radio-empty'}
            className={classNames(style.icon, selected && style.iconSelected)}
          />
        </div>
        <div className={style.title}>{title}</div>
        {!!actions.length && (
          <div
            className={style.action}
            onClick={(e) => {
              e.stopPropagation();
              if (menuElement.current && menuElement.current.contains(e.target)) return;
              setContextMenuVisibility(true);
            }}
          >
            <SvgIcon name="more" className={style.icon} />
            {contextMenuVisible && (
              <ContextMenu
                entries={actions}
                ref={menuElement}
                onSelect={(data) => {
                  setContextMenuVisibility(false);
                  onAction({ id, ...data });
                }}
                onRequestClose={() => setContextMenuVisibility(false)}
              />
            )}
          </div>
        )}
      </div>
      <div className={classNames(style.brief, selectable || style.nonSelectableBrief)}>
        <div className={style.description}>{description}</div>
        {primary && (
          <div className={style.tags}>
            <div className={style.tag}>Mặc định</div>
          </div>
        )}
      </div>
    </div>
  );
};

AddressEntry.defaultProps = {
  primary: false,
  actions: [],
  selectable: true,
  selected: false,
  onAction: () => {}
};

export default AddressEntry;
