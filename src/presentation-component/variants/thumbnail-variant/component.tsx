import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';

import Image from 'presentation-component/ui/image/component';
import { isMobileVersion } from '../../../utils/responsive';
import styles from './style.module.scss';

// NOTE: ThumbnailVariant was resized to be smaller (72px to 40px), as suggested by Mobile team
interface ThumbnailVariantProps {
  item: any;
  type: string;
  selected: number;
  onSelect: (param0?: any) => any;
}
const ThumbnailVariant = ({ item, type, selected, onSelect }: ThumbnailVariantProps) => {
  const isSelected = item.option_value_id * 1 === selected * 1;

  return (
    <>
      <div
        onClick={() => !isSelected && onSelect && onSelect({ item, type })}
        style={{ backgroundColor: item.color_code }}
        className={styles.container}
        data-tip={item.presentation || item.name}
        data-for={`tooltip-${item.option_value_id}`}
      >
        <Image className={classNames(isSelected && styles.imgSelected)} alt="" src={item.image_url} />
      </div>
      {isMobileVersion() || <ReactTooltip id={`tooltip-${item.option_value_id}`} effect="solid" place="bottom" />}
    </>
  );
};

export default ThumbnailVariant;
