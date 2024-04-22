import classNames from 'classnames';

import style from './style.module.scss';

const LoadingPlaceholder = ({ className }: { className: string }) => (
  <div className={classNames('ani-bg', style.loadingPlaceholder, className)} />
);
LoadingPlaceholder.defaultProps = { className: '' };

export default LoadingPlaceholder;
