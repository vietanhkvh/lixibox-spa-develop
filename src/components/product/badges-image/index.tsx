import classNames from 'classnames';
import Image from 'presentation-component/ui/image';
import { ProductBoxBadge, ProductBoxBadgeItemResponse, ProductBoxBadgeResponse } from 'types/api/shop';
import styles from './style.module.scss';

const BadgePositions = ['top_left', 'top_right', 'bottom_left', 'bottom_right'] as const;

type BadgePositionType = 'top_left' | 'top_right' | 'bottom_right' | 'bottom_left';
type ProductBoxTextBadgeItemResponse = ProductBoxBadgeItemResponse & { type: 'text' };
type ProductBoxImageBadgeItemResponse = ProductBoxBadgeItemResponse & { type: 'image' };

interface TextBadgeProps {
  badge: ProductBoxTextBadgeItemResponse;
  position: BadgePositionType;
  stackIndex: number;
}
const TextBadge = ({ badge, position, stackIndex }: TextBadgeProps) => {
  return (
    <div
      className={classNames(styles.textBadge, 'lineClamp1', styles[position])}
      style={Object.assign(
        {},
        { '--stack-index': stackIndex },
        badge.background_color && { backgroundColor: badge.background_color },
        badge.text_color && { color: badge.text_color }
      )}
    >
      {badge.content}
    </div>
  );
};

interface ImageBadgeProps {
  badge: ProductBoxImageBadgeItemResponse;
  position: BadgePositionType;
}
const ImageBadge = ({ badge, position }: ImageBadgeProps) => {
  return <Image alt={'badge'} className={classNames(styles.imageBadge, styles[position])} src={badge.content} />;
};

interface BadgeImagesProps {
  badge?: ProductBoxBadgeResponse;
  badges: ProductBoxBadge;
  showTextBadge?: boolean;
}
const BadgeImages = ({ badge, badges, showTextBadge }: BadgeImagesProps) => {
  let _badge = badge;

  if (_badge) {
    _badge = BadgePositions.reduce((acc, position) => {
      if (!_badge[position]) return acc;

      if (Array.isArray(_badge[position])) {
        let positionN = (_badge[position] as ProductBoxBadgeItemResponse[]).filter((badge) => badge?.content);
        // if position includes both text and image badges, only show text badges
        if (positionN.find((badge) => badge?.type === 'text') && positionN.find((badge) => badge?.type === 'image')) {
          positionN = positionN.filter((badge) => badge?.type === 'text');
        }
        // if position includes only image badges, only show the first one
        if (!positionN.find((badge) => badge?.type === 'text')) {
          positionN = positionN.length ? [positionN[0]] : [];
        }
        // order by marketing > system
        positionN = positionN.sort((a, b) => (a?.kind === 'marketing' ? -1 : 1));

        acc[position] = positionN.length ? positionN : [];
      } else {
        const badgeInPosition = _badge[position] as ProductBoxBadgeItemResponse;
        acc[position] = badgeInPosition.content ? [badgeInPosition] : [];
      }
      return acc;
    }, {} as ProductBoxBadgeResponse);
  }

  return (
    <>
      {_badge
        ? BadgePositions.map((position: BadgePositionType, positionIndex) =>
            // Display max 3 badges per position
            ((_badge[position] || []) as ProductBoxBadgeItemResponse[])
              .slice(0, 3)
              .map((badgeItem, itemIndex) =>
                badgeItem?.type === 'text' ? (
                  !showTextBadge ? null : (
                    <TextBadge
                      key={`${positionIndex}-${itemIndex}`}
                      stackIndex={itemIndex}
                      badge={badgeItem as ProductBoxTextBadgeItemResponse}
                      position={position}
                    />
                  )
                ) : badgeItem?.type === 'image' ? (
                  <ImageBadge
                    key={`${positionIndex}-${itemIndex}`}
                    badge={badgeItem as ProductBoxImageBadgeItemResponse}
                    position={position}
                  />
                ) : null
              )
          )
        : badges
        ? BadgePositions.filter((position) => badges[position]).map((position, index) => (
            <Image
              key={index}
              alt={'badge'}
              className={classNames(styles.imageBadgeLegacy, styles[position])}
              src={badges[position]}
            />
          ))
        : null}
    </>
  );
};
BadgeImages.defaultProps = {
  showTextBadge: true
};

export default BadgeImages;
