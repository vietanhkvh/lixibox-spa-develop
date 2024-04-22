import classNames from 'classnames';

import SvgIcon from '../icon';
import style from './style.module.scss';
import { generateTestId } from 'utils/test-utils';

interface Content {
  id: number | string;
  title: string;
  icon?: string;
  data?: any;
  testId?: { name: string; id?: string | number };
}
interface ListProps {
  list: Array<Content>;
  data?: any;
  classes?: { container?: string; item?: string; iconContainer?: string; icon?: string; title?: string };
  onClick?: (param0: any, event: any) => any;
}
const List = ({ data, list, classes, onClick }: ListProps) => {
  if (!list.length) return null;
  const hasAnyIcon = !!list.find((item) => item.icon);

  return (
    <div className={classNames(style.list, classes && classes.container)}>
      {list.map((action) => {
        const { id, title, icon, testId } = action;

        return (
          <div
            key={id}
            id={id.toString()}
            className={classNames(style.item, classes && classes.item)}
            onClick={(e) => onClick && onClick({ action, data }, e)}
            {...generateTestId(testId)}
          >
            {hasAnyIcon && (
              <div className={classNames(style.iconContainer, classes && classes.iconContainer)}>
                {icon && <SvgIcon name={icon} className={classNames(style.icon, classes && classes.icon)} />}
              </div>
            )}
            <div className={classNames(style.title, classes && classes.title)}>{title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
