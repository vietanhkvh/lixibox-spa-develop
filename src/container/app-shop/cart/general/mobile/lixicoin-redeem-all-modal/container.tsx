import StickyActionButton from '../../../../../../components/ui/sticky-action-button';
import GeneralModal from '../../../../../../presentation-component/modal/general-modal';
import ItemVerticalList from '../../../../../../presentation-component/item-list-hoc/item-vertical-list';
import { formatCurrency, CustomCurrencyType } from '../../../../../../utils/currency';
import { isEmptyObject } from '../../../../../../utils';
import RedeemableItemWithAction from '../../product/redeemable-item-with-action';
import { PropsFromRedux } from './store';
import style from './style.module.scss';

interface IProps extends PropsFromRedux {
  isOpen: boolean;
  title: string;
  type: number | string;
  onClose: (param0?: any) => any;
}

const LixicoinRedeemAllModal = ({
  isOpen,
  title,
  type,
  onClose,
  authStore: { profile },
  cartStore: { cartDetail, redeemable }
}: IProps) => {
  const coinsInCart = isEmptyObject(cartDetail) ? 0 : cartDetail.total_coins;
  const totalCoinsInProfile = profile?.coins || 0;
  const remainingCoins = totalCoinsInProfile - coinsInCart;

  return (
    <>
      <GeneralModal
        isOpen={isOpen}
        title={title}
        leftTitle=""
        leftIcon="angle-left"
        rightIcon={'close'}
        className={style.lixicoinRedeemAllModal}
        testId={{ name: 'lixicoin-redeem-all-modal' }}
        onLeftActionClick={() => onClose()}
        onRightActionClick={() => onClose()}
        onRequestClose={() => onClose()}
      >
        <div className={style.body}>
          <ItemVerticalList>
            {redeemable[type].index.map((product) => (
              <RedeemableItemWithAction key={product.id} product={product} />
            ))}
          </ItemVerticalList>
        </div>
        <StickyActionButton
          info={{
            title: 'Bạn đang còn:',
            content: formatCurrency(remainingCoins, { suffix: CustomCurrencyType.LIXICOIN })
          }}
          action={{ text: 'Hoàn tất' }}
          buttonClass={style.primaryButton}
          onClick={() => onClose()}
        />
      </GeneralModal>
    </>
  );
};

export default LixicoinRedeemAllModal;
