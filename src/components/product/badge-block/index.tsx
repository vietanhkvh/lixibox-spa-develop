import classNames from 'classnames';
import { ProductBox, ProductBoxBadgeItemResponse } from 'types/api/shop';
import styles from './style.module.scss';

const BadgePositions = ['top_left', 'top_right', 'bottom_left', 'bottom_right'] as const;

interface BadgeBlockProps {
  box: ProductBox;
  classes?: { container?: string; item?: string };
}
const BadgeBlock = ({ box, classes }: BadgeBlockProps) => {
  // aggregate available badges from all available positions
  const badges = !!box?.badge
    ? BadgePositions.reduce<Array<ProductBoxBadgeItemResponse>>((acc, position) => {
        const _positionVal = box.badge[position];
        let badgesInPosition = _positionVal ? (Array.isArray(_positionVal) ? _positionVal : [_positionVal]) : [];
        const textBadgesInPosition = badgesInPosition.filter((badge) => badge?.type === 'text' && badge?.content);

        return [...acc, ...textBadgesInPosition];
      }, [])
    : [];

  return (
    !!badges?.length && (
      <div className={classNames(styles.container, classes?.container)}>
        {badges.map((badge, index) => (
          <div
            key={index}
            className={classNames(styles.badge, classes?.item)}
            style={Object.assign(
              {},
              badge.background_color && { backgroundColor: badge.background_color },
              badge.text_color && { color: badge.text_color }
            )}
          >
            {badge.content}
          </div>
        ))}
      </div>
    )
  );
};

export default BadgeBlock;
