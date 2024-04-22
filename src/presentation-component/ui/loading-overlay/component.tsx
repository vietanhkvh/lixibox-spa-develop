import classNames from 'classnames';
import styles from './style.module.scss';

interface LoadingOverlayProps {
  className?: string;
}
const LoadingOverlay = ({ className }: LoadingOverlayProps) => {
  return (
    <div className={classNames(styles.loadingOverlay, className)}>
      <svg className={classNames(styles.loader)} viewBox="25 25 50 50">
        <circle className="path-loader" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
      </svg>
    </div>
  );
};

export default LoadingOverlay;
