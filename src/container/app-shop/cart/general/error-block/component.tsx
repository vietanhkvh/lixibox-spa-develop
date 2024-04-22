import { ReactNode } from 'react';
import classNames from 'classnames';
import { generateTestId } from 'utils/test-utils';
import SvgIcon from '../../../../../presentation-component/ui/icon';
import style from './style.module.scss';

interface ErrorBlockProps {
  children?: ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: (param0?: any) => any;
}
const ErrorBlock = ({
  children = '',
  className = '',
  interactive = false,
  onClick = (param0?: any) => {}
}: ErrorBlockProps) => {
  return (
    <div className={classNames(style.errorBlock, className)} {...generateTestId({ name: 'error-block' })}>
      <div className={style.message}>{children}</div>
      {interactive && (
        <div className={style.action} onClick={() => onClick && onClick()}>
          <SvgIcon name="close" className={style.icon} />
        </div>
      )}
    </div>
  );
};

export default ErrorBlock;
