import { ReactNode } from 'react';

import styles from './style.module.css';

interface DesktopAutoDisplayToolbarProps {
  children: ReactNode;
  fixHeight?: number;
}
const DesktopAutoDisplayToolbar = ({ children, fixHeight = 100 }: DesktopAutoDisplayToolbarProps) => {
  return (
    <div style={{ height: fixHeight }} className={styles.container} id={'auto-display-header'}>
      <div className={styles.fixed}>{children}</div>
    </div>
  );
};

export default DesktopAutoDisplayToolbar;
