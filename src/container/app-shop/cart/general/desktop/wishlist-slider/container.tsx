import { useState } from 'react';

import ProductSlider from '../../../../../../presentation-component/general/desktop/product-slider';
import WishlistItemWithAction from '../../product/wishlist-item-with-action';
import WishlistSliderItemWithAction from '../../product/wishlist-slider-item-with-action';
import WishlistModal from '../wishlist-modal';
import GeneralModal from '../../../../../../presentation-component/modal/general-modal';
import SvgIcon from '../../../../../../presentation-component/ui/icon';
import { generateTestId } from '../../../../../../utils/test-utils';
import { objectToHash } from '../../../../../../utils/encode';
import { ProductBox } from 'types/api/shop';
import style from './style.module.scss';

interface IProps {
  likeStore: any;
  onItemClick?: (box: ProductBox, index: number) => void;
  onViewMoreClick?: () => void;
}

const SECTION_HEADING = 'Sản phẩm yêu thích';

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

  if (!likedBoxes || !likedBoxes.length) return null;

  return (
    <div id={'WishlistSlider'} className={style.addonSlider} {...generateTestId({ name: 'wishlist-slider' })}>
      <div className={style.titleSection}>
        {SECTION_HEADING}
        <div
          className={style.viewMore}
          onClick={() => {
            setOpenModal(true);
            onViewMoreClick?.();
          }}
        >
          {'Xem tất cả'}
          <SvgIcon name={'angle-right'} className={style.icon} />
        </div>
      </div>
      <ProductSlider
        column={4}
        data={dataProps}
        template={WishlistSliderItemWithAction}
        className={style.sliderSection}
      />

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
    </div>
  );
};

export default WishlistSlider;
