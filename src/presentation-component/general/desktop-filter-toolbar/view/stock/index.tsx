import { useEffect, useState } from 'react';
import classnames from 'classnames';

import SubmitButton from '../../../../../components/ui/submit-button';
import SvgIcon from '../../../../ui/icon';
import styles from './style.module.scss';

interface StockFilterOption {
  id: string;
  title: string;
  selected: boolean;
}

export function SelectListItem({ item, onClick }) {
  const checkIconProps = {
    name: !!item.selected ? 'checkbox-checked' : 'checkbox-empty',
    className: styles.icon
  };

  return (
    <div onClick={() => onClick?.(item)} className={styles.selectListItem}>
      <SvgIcon {...checkIconProps} />
      <span className={styles.title}>{item.title}</span>
      {item.count && <span className={styles.count}>{`(${item.count})`}</span>}
    </div>
  );
}

interface StockPanelProps {
  isOpen: boolean;
  options: Array<StockFilterOption>;
  onSubmit: (options: Array<StockFilterOption>) => any;
  onClickOverlay: () => any;
}
export const StockPanel = ({ isOpen, options, onSubmit, onClickOverlay }: StockPanelProps) => {
  const [currentOptions, setCurrentOptions] = useState(options);
  useEffect(() => {
    setCurrentOptions(options);
  }, [options]);

  return (
    <div className={classnames(styles.brandPanel, { [styles.isOpen]: !!isOpen })}>
      <div className={styles.overlay} onClick={onClickOverlay} />
      <div className={styles.brandList}>
        <div className={classnames(styles.selectList, styles.column)}>
          <div className={styles.list}>
            {currentOptions.map((option, index) => (
              <SelectListItem
                {...{
                  key: index,
                  item: option,
                  onClick: (option) =>
                    setCurrentOptions((prevOptions) =>
                      prevOptions.map((prevOption) =>
                        Object.assign(
                          {},
                          prevOption,
                          option.id === prevOption.id && ({ selected: !option.selected } as any)
                        )
                      )
                    )
                }}
              />
            ))}
            {``}
          </div>
          <div className={styles.action}>
            <SubmitButton
              {...{
                title: 'Áp dụng',
                color: 'black',
                style: { margin: '0 16px 0 0' },
                onSubmit: () => onSubmit?.(currentOptions)
              }}
            />
            <SubmitButton
              {...{
                title: 'Bỏ chọn',
                color: 'white',
                style: { margin: 0 },
                onSubmit: () => {
                  setCurrentOptions((prevOptions) =>
                    prevOptions.map((prevOption) => Object.assign({}, prevOption, { selected: false }))
                  );
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
