import { ReactNode } from 'react';
import classNames from 'classnames';

import SvgIcon from '../../../../../presentation-component/ui/icon';
import style from './style.module.scss';

interface TabProps {
  id: string;
  title: string;
  component: ReactNode;
  selected: boolean;
}
interface TabHeaderProps {
  tabs: Array<TabProps>;
  currentTab: TabProps;
  onChange: (tab: TabProps) => any;
  className?: string;
}
const TabHeader = ({ tabs, className = '', currentTab, onChange }: TabHeaderProps) => {
  return (
    <div className={classNames(style.tabHeader, className)}>
      <div className={style.entries}>
        {tabs.map((entry) => (
          <div
            key={entry.id}
            className={classNames(style.entry, currentTab && entry.id === currentTab.id && style.activeEntry)}
            onClick={() => onChange(entry)}
          >
            <SvgIcon
              name={currentTab && entry.id === currentTab.id ? 'radio-checked' : 'radio-empty'}
              className={style.icon}
            />
            <div className={style.text}>{entry.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabHeader;
