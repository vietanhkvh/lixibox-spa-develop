import classNames from 'classnames';

import styles from './style.module.scss';

interface SizeVariantProps {
  item: any;
  type: string;
  selected: number;
  onSelect: (param0?: any) => any;
}

const SizeVariant = ({ item, type, selected, onSelect }: SizeVariantProps) => {
  const isSelected = item.option_value_id * 1 === selected * 1;

  return (
    <div onClick={() => !isSelected && onSelect && onSelect({ item, type })} className={styles.link}>
      <span className={classNames(styles.name, isSelected && styles.nameSelected)}>{item.presentation}</span>
    </div>
  );
};

export default SizeVariant;
