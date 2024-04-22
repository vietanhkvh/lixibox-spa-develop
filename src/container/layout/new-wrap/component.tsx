import React, { forwardRef } from 'react';
import classnames from 'classnames';
import style from './style.module.scss';
interface IWrapLayoutFC {
  className?: string;
  children?: any;
  type?: string;
}
const WrapLayoutFC: React.FC<IWrapLayoutFC> = forwardRef((props, ref: any) => {
  const { children, type = 'larger', className = '' } = props;

  const classStyle = (type) => {
    let classn = '';
    switch (type) {
      case 'smaller':
        classn = style.smaller;
        break;
      case 'larger':
        classn = style.larger;
        break;
      case 'largest':
        classn = style.largest;
        break;
      default:
        classn = '';
        break;
    }
    return classn;
  };

  const containerProps = {
    className: classnames(style.container, className, classStyle(type)),
    key: 'wrap-layout-container',
    ref: ref
  };

  return <div {...containerProps}>{children}</div>;
});

export default WrapLayoutFC;
