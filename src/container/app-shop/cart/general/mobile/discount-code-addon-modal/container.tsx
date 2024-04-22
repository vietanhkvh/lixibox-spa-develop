import StickyActionButton from '../../../../../../components/ui/sticky-action-button';
import GeneralModal from '../../../../../../presentation-component/modal/general-modal';
import ItemVerticalList from '../../../../../../presentation-component/item-list-hoc/item-vertical-list';
import DiscountCodeAddonItemWithAction from '../../product/discount-code-addon-item-with-action';
import { ProductBox } from 'types/api/shop';
import style from './style.module.scss';

interface IProps {
  onItemClick?: (box: ProductBox, index: number) => void;
  cartStore: any;
  toggleDiscountCodeAddonModalVisibilityAction: (param: any) => any;
}

const DiscountCodeAddonModal = ({
  onItemClick,
  toggleDiscountCodeAddonModalVisibilityAction,
  cartStore: { specialAddOns, isDiscountCodeAddonModalOpen }
}: IProps) => {
  const requestClose = () => toggleDiscountCodeAddonModalVisibilityAction(false);

  return (
    <GeneralModal
      isOpen={isDiscountCodeAddonModalOpen}
      title={'Chọn ưu đãi đặc biệt'}
      leftTitle=""
      rightIcon={'close'}
      className={style.discountCodeAddonModal}
      fullHeight
      testId={{ name: 'discount-code-addon-modal' }}
      onRightActionClick={() => requestClose()}
      onRequestClose={() => requestClose()}
    >
      <div className={style.body}>
        <ItemVerticalList>
          {specialAddOns.map((product, index) => (
            <DiscountCodeAddonItemWithAction
              key={product.id}
              product={product}
              onClickProductItem={() => onItemClick?.(product, index)}
              // className={style.discountCodeAddonItemWithAction}
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

export default DiscountCodeAddonModal;
