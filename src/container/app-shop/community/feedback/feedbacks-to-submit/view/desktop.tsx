import classNames from 'classnames';

import SplitLayout from '../../../../../layout/split';
import MobileTabHeader from '../../../../../../presentation-component/general/mobile-tab-header';
import FeedbacksToSubmit from '../../../../../../presentation-component/feedback/feedbacks-to-submit';
import FeedbackRightPanel from '../../right-panel';
import { isMobileVersion } from '../../../../../../utils/responsive';
import styles from './style.module.scss';

const View = ({ tabs, boxesToFeedback, isWaiting, onBoxClick }) => {
  const splitLayoutProps = {
    type: 'right',
    size: 'larger',
    subContainer: <FeedbackRightPanel />,
    mainContainer: (
      <div className={classNames(styles.container, isMobileVersion() || styles.containerDesktop, 'user-select-all')}>
        <MobileTabHeader tabs={tabs} />
        <FeedbacksToSubmit {...{ boxesToFeedback, isWaiting, onBoxClick }} />
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
