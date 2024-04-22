import classNames from 'classnames';

import FeedbackNewInnerBlock from '../../feedback-new-inner-block';
import SplitLayout from '../../../../../layout/split';
import MobileTabHeader from '../../../../../../presentation-component/general/mobile-tab-header';
import FeedbackRightPanel from '../../right-panel';
import styles from './style.module.scss';

const View = ({ tabs }) => {
  const splitLayoutProps = {
    type: 'right',
    size: 'larger',
    subContainer: <FeedbackRightPanel />,
    mainContainer: (
      <div className={classNames('user-select-all', styles.container, styles.containerDesktop)}>
        <MobileTabHeader tabs={tabs} />
        <FeedbackNewInnerBlock />
      </div>
    )
  };

  return (
    <div className={styles.wrapLayout}>
      <SplitLayout {...splitLayoutProps} />
    </div>
  );
};

export default View;
