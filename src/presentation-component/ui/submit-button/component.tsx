import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { generateTestId } from 'utils/test-utils';
import SvgIcon from '../icon';
import Loading from '../../../components/ui/loading';
import styles from './style.module.scss';

const Content = ({ classes, loading, icon, size, title, color }) => {
  return (
    <>
      {!loading && (
        <div
          className={classNames(
            styles.content,
            icon && 'right' === icon.position && styles.reverseContent,
            classes && classes.content
          )}
        >
          <div className={classNames(styles.innerContent, classes && classes.innerContent)}>
            {icon && icon.name && (
              <SvgIcon name={icon.name} className={classNames(styles.submitIconSVG, classes && classes.icon)} />
            )}
            <div
              className={classNames(
                styles.title,
                size === 'small' && styles.titleSmall,
                ('red' === color || 'pink' === color || 'black' === color) && styles.titleBold,
                classes && classes.title
              )}
            >
              {title}
            </div>
          </div>
        </div>
      )}
      {loading ? <Loading classes={{ container: styles.loader }} /> : <div className={styles.overlay} />}
    </>
  );
};

interface SubmitButtonClassesProps {
  container?: string;
  content?: string;
  innerContent?: string;
  icon?: string;
  title?: string;
}
interface SubmitButtonProps {
  title?: string;
  icon?: { name: string; position?: 'left' | 'right' };
  color: string;
  size: 'small' | 'normal';
  disabled?: boolean;
  loading?: boolean;
  type?: string;
  id?: string;
  classes?: SubmitButtonClassesProps;
  testId?: { name: string; id?: string };
  link?: { to?: string; target?: string };
  onSubmit?: (event: React.MouseEvent<HTMLAnchorElement | NavLink | HTMLDivElement>) => void;
  dataTestId?: string;
}
const SubmitButton = (props: SubmitButtonProps) => {
  const { title, icon, color, size, disabled, loading, type, id, classes, testId, link, onSubmit, dataTestId } = props;
  const containerProps = Object.assign(
    {
      onClick: (e) => !disabled && !loading && onSubmit?.(e),
      className: classNames(
        styles.submitButton,
        styles[`button-theme-${color}`],
        styles[`color-${color}`],
        size === 'normal' && styles.buttonNormal,
        size === 'small' && styles.buttonSmall,
        loading && styles.isLoading,
        disabled && styles.isDisabled,
        classes && classes.container
      ),
      id
    },
    testId && generateTestId(testId)
  );

  const linkProps = {
    ...containerProps,
    onClick: (event) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      onSubmit?.(event);
    },
    to: (link && link.to) || '',
    target: link && link.target
  };

  switch (type) {
    case 'force-link':
      return (
        <a {...generateTestId({ name: dataTestId })} {...linkProps} href={link && link.to}>
          <Content {...{ classes, loading, icon, size, title, color }} />
        </a>
      );
    case 'link':
      return (
        <NavLink {...generateTestId({ name: dataTestId })} {...linkProps}>
          <Content {...{ classes, loading, icon, size, title, color }} />
        </NavLink>
      );
    case 'submit':
      return (
        <div {...generateTestId({ name: dataTestId })} {...containerProps}>
          {' '}
          <Content {...{ classes, loading, icon, size, title, color }} />{' '}
        </div>
      );

    default:
      return null;
  }
};

SubmitButton.defaultProps = {
  type: 'submit',
  size: 'normal',
  color: 'pink',
  loading: false,
  disabled: false
};

export type { SubmitButtonProps, SubmitButtonClassesProps };
export default SubmitButton;
