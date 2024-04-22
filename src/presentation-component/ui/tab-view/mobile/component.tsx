import classNames from 'classnames';

import style from './style.module.scss';
import { generateTestId } from 'utils/test-utils';

interface Tab {
  id: string | number;
  name: string;
  data?: { [key: string]: any };
  active?: boolean;
}
interface TabViewProps {
  entries: Array<Tab>;
  classes?: { container?: string; header?: string; body?: string; headerEntry?: string };
  children?: any;
  onChange?: (tab: Tab) => any;
}
// FIXME: Not generic
// TODO: Provide generic functionality over two tabs
// TODO: Remove duplicate implementation
const TabView = ({ entries, classes, children: Children, onChange }: TabViewProps) => {
  const currentEntry = entries.find((entry) => entry.active);

  return (
    <div className={classNames(style.tabView, classes && classes.container)} {...generateTestId({ name: 'tab-view' })}>
      <div className={classNames(style.header, classes && classes.header)}>
        {entries.map((entry, index) => (
          <div
            key={index}
            className={classNames(style.entry, entry.active && style.activeEntry, classes && classes.headerEntry)}
            onClick={() => {
              onChange && onChange(entry);
            }}
          >
            {entry.name}
          </div>
        ))}
      </div>
      <div className={classNames(style.body, classes && classes.body)}>
        {Children && currentEntry && <Children {...currentEntry} />}
      </div>
    </div>
  );
};

export default TabView;
