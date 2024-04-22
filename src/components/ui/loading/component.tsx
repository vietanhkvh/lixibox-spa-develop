import classNames from 'classnames';

import styles from './style.module.scss';

interface LoadingProps {
  style?: any;
  classes?: {
    container?: string;
    innerContainer?: string;
  };
}
const Loading = ({ classes, style }: LoadingProps) => {
  return (
    <div className={classNames('loading-icon', styles.loadingContainer, classes && classes.container)} style={style}>
      <div className={classNames('loader', classes && classes.innerContainer)}>
        <svg className="circular" viewBox="25 25 50 50">
          <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
        </svg>
      </div>
    </div>
  );
};
Loading.defaultProps = {
  style: {}
};

export default Loading;
