import classNames from 'classnames';
import CreateNewUnboxingFeed from '../../../unboxing-feedback-inner-block';
import SplitLayout from '../../../../../../layout/split';
import FeedbackRightPanel from '../../../right-panel';
import styles from './style.module.scss';

const Heading = ({ title }) => {
  return <div className={styles.heading}>{title}</div>;
};

const MainContainer = () => {
  return (
    <div className={classNames(styles.container, 'user-select-all')}>
      <Heading title={'Chia sẻ link đập hộp'} />
      <CreateNewUnboxingFeed />
    </div>
  );
};

const View = () => {
  const splitLayoutProps = {
    type: 'right',
    size: 'larger',
    subContainer: <FeedbackRightPanel />,
    mainContainer: <MainContainer />
  };

  return (
    <div className={styles.wrapLayout}>
      <SplitLayout {...splitLayoutProps} />
    </div>
  );
};

export default View;
