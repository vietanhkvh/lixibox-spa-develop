import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import ProductSlider from 'presentation-component/general/desktop/product-slider';
import TabHeader from 'presentation-component/general/mobile-tab-header';
import { usePrevious } from 'utils/hook';
import { generateTestId } from 'utils/test-utils';
import { ROUTING_REDEEM_PATH } from 'routings/path';
import SvgIcon from 'presentation-component/ui/icon';
import Icon from 'presentation-component/ui/icon';
import { ProductBox } from 'types/api/shop';
import { CustomCurrencyType, formatCurrency } from 'utils/currency';
import { isEmptyObject } from 'utils';
import RedeemableItemWithAction from '../../product/redeemable-item-with-action';
import { PropsFromRedux } from './store';
import style from './style.module.scss';

interface IProps extends PropsFromRedux {
  onItemClick?: (box: ProductBox, index: number) => void;
  onViewMoreClick?: () => void;
}
const RedeemSliders = ({
  onItemClick,
  onViewMoreClick,
  authStore: { profile },
  cartStore: {
    cartDetail,
    redeemable,
    redeemable: {
      special: { index: specialRedeemable, loaded: specialLoaded },
      user: { index: userRedeemable, loaded: userLoaded },
      latest: { index: latestRedeemable, loaded: latestLoaded }
    }
  }
}: IProps) => {
  const anySliderLoaded = specialLoaded || userLoaded || latestLoaded;
  const anySliderHasData = !!specialRedeemable.length || !!userRedeemable.length || !!latestRedeemable.length;
  const specialWasLoaded = usePrevious(specialLoaded);
  const userWasLoaded = usePrevious(userLoaded);
  const latestWasLoaded = usePrevious(latestLoaded);

  const coinsInCart = isEmptyObject(cartDetail) ? 0 : cartDetail.total_coins || 0;
  const totalCoinsInProfile = profile?.coins || 0;
  const remainingCoins = totalCoinsInProfile - coinsInCart;

  const generateTabEntries = ({ special, user, latest }, selectedId = 0) => {
    const tabEntries: Array<any> = [];
    // specialLoaded &&
    //   special.index.length &&
    //   tabEntries.push({ id: 0, title: 'Quà Hot hiện nay', products: special.index });
    // userLoaded && user.index.length && tabEntries.push({ id: 1, title: 'Dành riêng cho bạn', products: user.index });
    latestLoaded && latest.index.length && tabEntries.push({ id: 0, title: 'Mới nhất', products: latest.index });

    return tabEntries.map((entry) => Object.assign({}, entry, { selected: entry?.id === selectedId }));
  };
  const [tabEntries, setTabEntries] = useState<Array<any>>(generateTabEntries(redeemable));
  const [currentTabId, setCurrentTabId] = useState(tabEntries[0]?.id); //Select 'Mới nhất' tab all the time
  const updateCurrentTab = (tab) => {
    setTabEntries(tabEntries.map((entry) => Object.assign({}, entry, { selected: entry?.id === tab?.id })));
    setCurrentTabId(tab?.id);
  };

  useEffect(() => {
    if ((!specialWasLoaded && specialLoaded) || (!userWasLoaded && userLoaded) || (!latestWasLoaded && latestLoaded)) {
      setTabEntries(generateTabEntries(redeemable, tabEntries[0]?.id));
    }
  }, [redeemable]);

  useEffect(() => {
    setCurrentTabId(tabEntries[0]?.id);
  }, [tabEntries]);

  return !(anySliderLoaded && anySliderHasData) ? null : (
    <div className={style.redeemSliders} {...generateTestId({ name: 'redeem-sliders' })}>
      <div className={style.headerContainer}>
        <div className={style.titleSection}>ĐỔI LIXICOIN NHẬN QUÀ NGAY</div>
        <NavLink to={ROUTING_REDEEM_PATH} onClick={() => onViewMoreClick?.()} className={style.viewMore}>
          Xem tất cả <SvgIcon name="angle-right" className={style.icon} />
        </NavLink>
      </div>
      <div className={style.subheader}>
        <Icon name="dollar" className={style.icon} />
        <div className={style.text}>
          Bạn đang có:<span>{formatCurrency(remainingCoins, { suffix: CustomCurrencyType.LIXICOIN })}</span>
        </div>
      </div>
      <TabHeader
        isEqually={false}
        tabs={tabEntries}
        onSelect={(tab) => updateCurrentTab(tab)}
        className={style.tabHeader}
      />
      {tabEntries.map((entry, index) => (
        <ProductSlider
          key={index}
          column={4}
          data={entry.products.map((product, productIndex) => ({
            key: product?.id,
            product,
            onClickProductItem: () => onItemClick?.(product, productIndex)
          }))}
          template={RedeemableItemWithAction}
          className={classNames(style.sliderSection, entry?.id !== currentTabId && style.noDisplay)}
        />
      ))}
    </div>
  );
};

export default RedeemSliders;
