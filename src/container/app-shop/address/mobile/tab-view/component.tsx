import { useState } from 'react';
import classNames from 'classnames';

import style from './style.module.scss';

// FIXME: Not generic
// TODO: Provide generic functionality over two tabs
const TabView = ({ entries, className = '', initialEntryId = 1 }) => {
  const [currentTabId, setCurrentTabId] = useState(initialEntryId);
  const currentTab = entries.find((entry) => entry.id === currentTabId);

  return (
    <div className={classNames(style.tabView, className)}>
      <div className={style.header}>
        {entries.map((entry, index) => (
          <div
            key={index}
            className={classNames(style.entry, entry.id === currentTab.id && style.activeEntry)}
            onClick={() => setCurrentTabId(entry.id)}
          >
            {entry.name}
          </div>
        ))}
      </div>
      <div className={style.body}>{currentTab.component}</div>
    </div>
  );
};

export default TabView;
