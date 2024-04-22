import classnames from 'classnames';
import { useEffect, forwardRef } from 'react';

import SvgIcon from 'presentation-component/ui/icon';
import style from './style.module.scss';

interface ContextMenuProps {
  entries: Array<{ id?: number | string; type: string; name: string; icon: string }>;
  onSelect: (param: any) => any;
  onRequestClose: (param?: any) => any;
  classes?: { container?: string; item?: string };
}
const ContextMenu = forwardRef(
  (
    { entries, onSelect = () => {}, onRequestClose = () => {}, classes }: ContextMenuProps,
    ref: React.RefObject<any>
  ) => {
    useEffect(() => {
      document.addEventListener('mousedown', (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          event.preventDefault();
          event.stopPropagation();
          onRequestClose(event);
          return false;
        }
      });
    }, [ref]);

    const Entry = ({ entry: { type, name, icon }, onClick }) => {
      return (
        <div className={classnames(style.contextEntry, classes?.item)} onClick={() => onClick({ type })}>
          <div className={style.contextIconContainer}>
            <SvgIcon name={icon} className={style.icon} />
          </div>
          <div className={style.contextName}>{name}</div>
        </div>
      );
    };

    return (
      <div ref={ref} className={classnames(style.contextMenu, classes?.container)}>
        {entries.map((entry) => (
          <Entry key={entry.type} entry={entry} onClick={(data) => onSelect(data)} />
        ))}
      </div>
    );
  }
);

export default ContextMenu;
