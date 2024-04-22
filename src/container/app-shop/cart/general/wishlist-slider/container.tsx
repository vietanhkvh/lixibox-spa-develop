import { useState } from 'react';

import ItemCarousel from '../../../../../presentation-component/item-list-hoc/item-carousel';
import WishlistSliderItemWithAction from '../product/wishlist-slider-item-with-action';
import WishlistItemWithAction from '../product/wishlist-item-with-action';
import GeneralModal from '../../../../../presentation-component/modal/general-modal';
import WishlistModal from '../../general/desktop/wishlist-modal';
import { objectToHash } from '../../../../../utils/encode';
import { ProductBox } from 'types/api/shop';
import style from './style.module.scss';

const SECTION_HEADING = 'Sản phẩm yêu thích';

interface IProps {
  likeStore: any;
  onItemClick: (box: ProductBox, index: number) => void;
  onViewMoreClick?: () => void;
}

const WishlistSlider = ({ likeStore: { liked }, onItemClick, onViewMoreClick }: IProps) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const params = { page: 1, perPage: 12 };
  const keyHash = objectToHash(params);
  const likedBoxes = liked?.box[keyHash]?.boxes?.filter((box) => box.stock > 0 || box.store_stock > 0) || [];
  const dataProps = likedBoxes.map((product, index) => ({
    key: product.id,
    product,
    onClickProductItem: () => onItemClick?.(product, index)
  }));

  return (
    !!likedBoxes?.length && (
      <>
        <ItemCarousel
          id={'WishlistSlider'}
          viewMore={'Xem tất cả'}
          className={style.wishlistSlider}
          title={SECTION_HEADING}
          testId={{ name: 'wishlist-slider' }}
          onViewMoreClick={() => {
            setOpenModal(true);
            onViewMoreClick?.();
          }}
        >
          {likedBoxes.map((product, index) => (
            <WishlistSliderItemWithAction
              key={product.id}
              product={product}
              className={style.wishlistItemWithAction}
              onClickProductItem={() => onItemClick?.(product, index)}
            />
          ))}
        </ItemCarousel>
        <GeneralModal
          isOpen={isOpenModal}
          title={SECTION_HEADING}
          leftTitle=""
          rightIcon={'close'}
          fullHeight
          classes={{}}
          className={{}}
          testId={{}}
          onRightActionClick={() => setOpenModal(false)}
          onRequestClose={() => setOpenModal(false)}
        >
          <WishlistModal data={dataProps} template={WishlistItemWithAction} />
        </GeneralModal>
      </>
    )
  );
};

export default WishlistSlider;
