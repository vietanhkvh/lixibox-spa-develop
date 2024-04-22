import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import StickyActionButton from '../../../../../../components/ui/sticky-action-button';
import GeneralModal from '../../../../../../presentation-component/modal/general-modal';
import { formatCurrency, CustomCurrencyType } from '../../../../../../utils/currency';
import { isEmptyObject, objectToHash } from '../../../../../../utils';
import RedeemPrompt from '../redeem-prompt';
import { LIXICOIN_REDEEM_TYPE } from '../../../../../../constants/application/cart';
import RedeemableItemWithAction from '../../product/redeemable-item-with-action';
import LixicoinRedeemAllModal from '../lixicoin-redeem-all-modal';
import ItemVerticalList from 'presentation-component/item-list-hoc/item-vertical-list';
import FadeIn from 'container/layout/fade-in';
import BannerCarousel from 'components/banner/carousel';
import { BANNER_ID } from 'constants/application/default';
import { ROUTING_REDEEM_PATH } from 'routings/path';
import SvgIcon from 'presentation-component/ui/icon';
import { ProductBox } from 'types/api/shop';
import { PropsFromRedux } from './store';
import style from './style.module.scss';

interface IProps extends PropsFromRedux {
  onItemClick?: (box: ProductBox, index: number) => void;
  onViewMoreClick?: () => void;
}

const RedeemableCategory = ({ title, onShowAll, products, banners, onItemClick }) => {
  return (
    <>
      <BannerCarousel list={banners} isShowIndicator={true} />
      <FadeIn>
        <ItemVerticalList column={2} title={title}>
          {products.map((product, index) => (
            <RedeemableItemWithAction
              key={product.id}
              product={product}
              onClickProductItem={() => onItemClick?.(product, index)}
              // className={style.redeemableItemWithAction}
            />
          ))}
        </ItemVerticalList>
      </FadeIn>
    </>
  );
};

const LixicoinRedeemPrompt = ({
  onItemClick,
  onViewMoreClick,
  authStore: { profile },
  cartStore: {
    cartDetail,
    redeemable: { latest }
  },
  bannerStore,
  fetchBannerAction
}: IProps) => {
  const [isModalOpen, toggleModalVisibility] = useState(false);
  const [dedicatedModalState, updateDedicatedModalState] = useState({
    isOpen: false,
    title: '',
    type: LIXICOIN_REDEEM_TYPE.SPECIAL
  });
  const coinsInCart = isEmptyObject(cartDetail) ? 0 : cartDetail.total_coins;
  const totalCoinsInProfile = profile?.coins || 0;
  const remainingCoins = totalCoinsInProfile - coinsInCart;

  const onShowAllClick = ({ title, type }) => {
    toggleModalVisibility(false);
    updateDedicatedModalState({ isOpen: true, title, type });
  };

  const bannerHash = objectToHash({
    idBanner: BANNER_ID.REDEEM,
    limit: 12
  });
  const banners = bannerStore.bannerList[bannerHash] || [];
  useEffect(() => {
    if (!banners.length)
      fetchBannerAction &&
        fetchBannerAction({
          idBanner: BANNER_ID.REDEEM,
          limit: 12
        });
  }, []);

  const redeemProps = {
    icon: 'dollar',
    title: 'Đổi quà bằng Lixicoin',
    body: (
      <div className={style.redeemPromptBody}>
        <div className={style.line}>
          Bạn đang có <span className={style.bold}>{formatCurrency(remainingCoins)}</span> Lixicoin
        </div>
        {!!coinsInCart && (
          <div className={style.line}>Bạn đã chọn quà trị giá {formatCurrency(coinsInCart)} Lixicoin</div>
        )}
      </div>
    ),
    onClick: () => toggleModalVisibility(true)
  };

  const generateRedeemableCategory = ({ title, type }) => ({
    title,
    onShowAll: () => onShowAllClick({ title, type }),
    products: latest.index,
    banners,
    onItemClick
  });
  const redeemableCategories =
    latest.index.length && generateRedeemableCategory({ title: 'Danh sách quà', type: LIXICOIN_REDEEM_TYPE.LATEST });

  return (
    <>
      <RedeemPrompt {...redeemProps} />
      <GeneralModal
        isOpen={isModalOpen}
        title={'Đổi quà bằng Lixicoin'}
        leftTitle=""
        rightIcon={'close'}
        className={style.redeemLixicoinModal}
        testId={{ name: 'redeem-lixicoin-modal' }}
        onRightActionClick={() => toggleModalVisibility(false)}
        onRequestClose={() => toggleModalVisibility(false)}
      >
        <div className={style.body}>
          <RedeemableCategory {...redeemableCategories} />
          <div className={style.viewMoreContainer}>
            <NavLink to={ROUTING_REDEEM_PATH} onClick={() => onViewMoreClick?.()} className={style.viewMore}>
              {`Xem tất cả`}
              <SvgIcon name="angle-right" className={style.icon} />
            </NavLink>
          </div>
        </div>

        <StickyActionButton
          info={{
            title: 'Bạn đang còn:',
            content: formatCurrency(remainingCoins, { suffix: CustomCurrencyType.LIXICOIN })
          }}
          action={{ text: 'Hoàn tất' }}
          buttonClass={style.primaryButton}
          onClick={() => toggleModalVisibility(false)}
        />
      </GeneralModal>
      <LixicoinRedeemAllModal
        {...dedicatedModalState}
        onClose={() => {
          updateDedicatedModalState({ isOpen: false, title: '', type: LIXICOIN_REDEEM_TYPE.SPECIAL });
          toggleModalVisibility(true);
        }}
      />
    </>
  );
};

export default LixicoinRedeemPrompt;
