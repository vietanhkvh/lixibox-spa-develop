import { ReactNode } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { isExternalLink, isSameOriginLink } from 'utils/validate';
import { getLinkPath } from 'utils/uri';
import styles from './style.module.scss';

interface AdLinkProps {
  to: string;
  isDisabled?: boolean;
  tag?: 'span';
  children?: ReactNode;
  className?: string;
  onClick?: (event: any) => void;
  [key: string]: boolean | string | ((param?: any) => any) | { [key: string]: any } | ReactNode;
}
const AdLink = (props: AdLinkProps) => {
  const { to, tag, children: _children, className, isDisabled, onClick } = props;
  const history = useHistory();
  const children = _children || null;

  if (tag) {
    return (
      <span
        {...{
          ...props,
          className: classNames(styles.customTagStyle, className, isDisabled && styles.disabled),
          onClick: (e) => {
            if (isDisabled) return;

            onClick?.(e);
            if (isSameOriginLink(to)) {
              history.push(getLinkPath(to));
              return;
            }
            window.open(to, isExternalLink(to) ? '_blank' : '_self');
          }
        }}
      >
        {children}
      </span>
    );
  }

  return isExternalLink(to) || isSameOriginLink(to) ? (
    <NavLink
      {...{
        ...props,
        to: { pathname: isSameOriginLink(to) ? getLinkPath(to) : to },
        className: classNames(className, isDisabled && styles.disabled),
        target: isSameOriginLink(to) ? '_self' : '_blank',
        rel: isSameOriginLink(to) ? 'dofollow' : 'nofollow',
        onClick: (e) => onClick?.(e)
      }}
    >
      {children}
    </NavLink>
  ) : (
    // TODO: Refactor the following element to use `children` prop explicitly, to avoid triggering the eslint rule
    // eslint-disable-next-line
    <a
      {...{
        ...props,
        href: to,
        target: '_self',
        onClick: (e) => onClick?.(e)
      }}
    >
      {children}
    </a>
  );
};

export default AdLink;
