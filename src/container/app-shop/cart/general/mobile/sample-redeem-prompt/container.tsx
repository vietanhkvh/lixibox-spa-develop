import { useState } from 'react';

import StickyActionButton from '../../../../../../components/ui/sticky-action-button';
import GeneralModal from '../../../../../../presentation-component/modal/general-modal';
import ItemVerticalList from '../../../../../../presentation-component/item-list-hoc/item-vertical-list';
import SampleItemWithAction from '../../../general/product/sample-item-with-action';
import { formatCurrency } from '../../../../../../utils/currency';
import { PURCHASE_TYPE } from '../../../../../../constants/application/purchase';
import RedeemPrompt from '../redeem-prompt';
import { ProductBox } from 'types/api/shop';
import style from './style.module.scss';

interface IProps {
  cartStore: any;
  onItemClick?: (box: ProductBox, index: number) => void;
}

const SampleRedeemPrompt = ({
  onItemClick,
  cartStore: {
    cartDetail: { subtotal_price },
    cartList,
    cartSampleList,
    constants: { threshold_to_pick_sample }
  }
}: IProps) => {
  const [isModalOpen, toggleModalVisibility] = useState(false);
  const samplesInCart = cartList.filter((cartItem) => cartItem.purchase_type === PURCHASE_TYPE.SAMPLE).length;
  // FIXME: Fix constants reducer and remove redundant checks and fallback below
  const thresholdToPickSample =
    typeof threshold_to_pick_sample === 'number' && !Number.isNaN(threshold_to_pick_sample)
      ? threshold_to_pick_sample
      : 1000000;
  const cartValue = subtotal_price || 0;
  const selectableSampleCount = cartValue < thresholdToPickSample ? 1 : 2;
  const valueToReachMaxSampleThreshold = thresholdToPickSample - cartValue;
  const yetToReachMaxSampleThreshold = selectableSampleCount === 1;
  const selectionFormattedText = `${samplesInCart}/${selectableSampleCount}`;

  return (
    <>
      <RedeemPrompt
        icon={'gift'}
        title={`Bạn được tặng ${selectableSampleCount} sản phẩm dùng thử`}
        body={
          <div>
            {yetToReachMaxSampleThreshold ? (
              <div>{`Mua thêm ${formatCurrency(valueToReachMaxSampleThreshold, {
                suffix: true
              })} để được 2 sản phẩm`}</div>
            ) : (
              <div>{`Cho đơn hàng từ ${formatCurrency(thresholdToPickSample, { suffix: true })}`}</div>
            )}
            <div>{`Bạn đã chọn ${selectionFormattedText} sản phẩm`}</div>
          </div>
        }
        onClick={() => toggleModalVisibility(true)}
      />
      <GeneralModal
        isOpen={isModalOpen}
        title={`Sản phẩm dùng thử (${selectionFormattedText})`}
        rightIcon={'close'}
        className={style.redeemSampleModal}
        testId={{ name: 'redeem-sample-modal' }}
        onRightActionClick={() => toggleModalVisibility(false)}
        onRequestClose={() => toggleModalVisibility(false)}
      >
        <div className={style.body}>
          <ItemVerticalList>
            {cartSampleList.map((product, index) => (
              <SampleItemWithAction
                key={product.id}
                product={product}
                onClickProductItem={() => onItemClick(product, index)}
              />
            ))}
          </ItemVerticalList>
        </div>
        <StickyActionButton
          action={{ text: 'Hoàn tất' }}
          buttonClass={style.primaryButton}
          onClick={() => toggleModalVisibility(false)}
        />
      </GeneralModal>
    </>
  );
};

export default SampleRedeemPrompt;
