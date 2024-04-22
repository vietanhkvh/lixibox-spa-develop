import { useState } from 'react';

import Image from 'presentation-component/ui/image';
import { renderHtmlContent } from '../../../../../utils/html';
import SubmitButton from '../../../../../presentation-component/ui/submit-button';
import styles from './style.module.scss';
import { ProductBox } from 'types/api/shop';

const Description = ({ description }) => {
  if (!description) return null;

  return (
    <div className={styles.description}>
      {renderHtmlContent({ content: description.replace('\n', '<br /><br />') })}
    </div>
  );
};

const ProductItem = ({ product, selectedIds, onClick, onBodyClick }) => {
  const isSelected = selectedIds.includes(product.id);

  const buttonProps = {
    title: isSelected ? 'Hoàn tác' : 'Không liên quan',
    classes: { container: styles.button },
    color: isSelected ? 'lightGrey' : 'signin',
    onSubmit: () => onClick(product.id),
    size: 'small' as const
  };

  return (
    <div className={styles.productItem} onClick={() => onBodyClick?.()}>
      <div className={styles.productImage}>
        <div className={styles.imageOuter}>
          <Image src={product.primary_picture.square_url} alt={product.name} />
        </div>
      </div>
      <div className={styles.productInfo}>
        <div className={styles.productName}>{product.name}</div>
        <SubmitButton {...buttonProps} />
      </div>
    </div>
  );
};

const ProductList = ({ products, selectedIds, onClick, onItemClick }) => {
  return (
    <div className={styles.productPanel}>
      <div className={styles.productPanelHeading}>Phản hồi của bạn</div>
      <div className={styles.productList}>
        {products.map((box, index) => (
          <ProductItem
            {...{
              product: box,
              selectedIds,
              onClick,
              onBodyClick: () => onItemClick?.(box, index)
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Component = ({
  featureInfo: { description },
  products,
  onSubmit,
  onItemClick
}: {
  featureInfo: { description: string };
  products: Array<any>;
  onSubmit: any;
  onItemClick?: (box: ProductBox, index: number) => void;
}) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const onClick = (selectedId) => {
    const isSelected = selectedIds.includes(selectedId);
    const newSelectedIds = isSelected ? selectedIds.filter((id) => selectedId !== id) : [...selectedIds, selectedId];

    onSubmit(newSelectedIds);
    setSelectedIds(newSelectedIds);
  };

  return (
    <div className={styles.container}>
      <Description description={description} />
      <ProductList {...{ products, selectedIds, onClick, onItemClick }} />
    </div>
  );
};

export default Component;
