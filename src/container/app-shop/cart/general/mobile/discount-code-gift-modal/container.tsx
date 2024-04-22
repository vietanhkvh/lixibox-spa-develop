import StickyActionButton from '../../../../../../components/ui/sticky-action-button';
import GeneralModal from '../../../../../../presentation-component/modal/general-modal';
import ItemVerticalList from '../../../../../../presentation-component/item-list-hoc/item-vertical-list';
import DiscountCodeGiftItemWithAction from '../../product/discount-code-gift-item-with-action';
import style from './style.module.scss';
import { ProductBox } from 'types/api/shop';

interface IProps {
  onItemClick?: (box: ProductBox, index: number) => void;
  cartStore: any;
  toggleDiscountCodeGiftModalVisibilityAction: (param: any) => any;
}

const DiscountCodeGiftModal = ({
  onItemClick,
  toggleDiscountCodeGiftModalVisibilityAction,
  cartStore: { cartGiftList, isDiscountCodeGiftModalOpen }
}: IProps) => {
  const requestClose = () => toggleDiscountCodeGiftModalVisibilityAction(false);

  return (
    <GeneralModal
      isOpen={isDiscountCodeGiftModalOpen}
      title={'Chọn quà tặng'}
      leftTitle=""
      rightIcon={'close'}
      className={style.discountCodeGiftModal}
      fullHeight
      testId={{ name: 'discount-code-gift-modal' }}
      onRightActionClick={() => requestClose()}
      onRequestClose={() => requestClose()}
    >
      <div className={style.body}>
        <ItemVerticalList>
          {cartGiftList.map((product, index) => (
            <DiscountCodeGiftItemWithAction
              key={product.id}
              product={product}
              onClickProductItem={() => onItemClick?.(product, index)}
              // className={style.discountCodeGiftItemWithAction}
            />
          ))}
        </ItemVerticalList>
      </div>
      <StickyActionButton
        action={{ text: 'Hoàn tất' }}
        buttonClass={style.primaryButton}
        onClick={() => requestClose()}
      />
    </GeneralModal>
  );
};

export default DiscountCodeGiftModal;
