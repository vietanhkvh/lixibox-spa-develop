import classNames from 'classnames';

import SVGIcon from '../icon';
import style from './style.module.scss';

const STAR_COUNT = 5;

type StarRatingValue = 0 | 1 | 2 | 3 | 4 | 5;
interface StarRatingProps {
  rating: StarRatingValue;
  onChange?: (rating: number) => any;
  classes?: { container?: string; star?: string };
}
const StarRating = ({ rating, onChange, classes }: StarRatingProps) => {
  const iconNames = [...new Array(rating).fill('star-full'), ...new Array(STAR_COUNT - rating).fill('star')];

  return (
    <div className={classNames(style.container, classes && classes.container)}>
      {iconNames.map((name, index) => (
        <SVGIcon
          key={index}
          name={name}
          onClick={() => onChange && onChange(index + 1)}
          className={classNames(style.star, classes && classes.star)}
        />
      ))}
    </div>
  );
};

export { STAR_COUNT };
export type { StarRatingValue };
export default StarRating;
