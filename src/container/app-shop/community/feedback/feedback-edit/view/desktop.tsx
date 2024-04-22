import classNames from 'classnames';

import SplitLayout from '../../../../../layout/split';
import FeedbackEditInnerBlock from '../../feedback-edit-inner-block';
import FeedbackRightPanel from '../../right-panel';
import styles from './style.module.scss';

const View = ({ feedbackId }) => {
  const splitLayoutProps = {
    type: 'right',
    size: 'largest',
    subContainer: <FeedbackRightPanel />,
    mainContainer: (
      <div className={classNames('user-select-all', styles.container, styles.containerDesktop)}>
        <FeedbackEditInnerBlock {...{ feedbackId }} />
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
