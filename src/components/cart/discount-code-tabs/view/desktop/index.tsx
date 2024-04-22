import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useHistory, generatePath } from 'react-router-dom';

import WrapLayout from '../../../../../container/layout/wrap';
import SplitLayout from '../../../../../container/layout/split';
import UserSidePanel from '../../../../../container/app-shop/user/side-panel';
import NoContentPlaceholder, {
  NO_CONTENT_LOGO
} from '../../../../../presentation-component/general/mobile/no-content-placeholder';
import DiscountCoupon from '../../../../../presentation-component/general/discount-coupon';
import MobileTabHeader from '../../../../../presentation-component/general/mobile-tab-header';
import { DISCOUNT_CODE_TAB } from '../../../../../constants/application/discount-code';
import { setTabQueryString, getInitialTabId } from '../../../../../utils/discount-code';
import Loading from '../../../../../components/ui/loading';
import { ROUTING_DISCOUNT_CODE_DETAIL } from '../../../../../routings/path';
import { objectToHash } from '../../../../../utils/encode';
import { generateTestId } from 'utils/test-utils';
import style from './style.module.scss';

interface DiscountCodesProps {
  codes: Array<any>;
  appliedCode: string;
  applyingCode: string;
  isApplying: boolean;
  transientState: { fetching: boolean; errored: boolean };
  placeholderText: string;
  classes?: { container?: string };
  onCodeSubmit: (param?: any) => any;
}
const DiscountCodes = ({
  codes,
  appliedCode,
  applyingCode,
  isApplying,
  transientState: { fetching, errored },
  placeholderText,
  classes,
  onCodeSubmit
}: DiscountCodesProps) => {
  const history = useHistory();

  return (
    <div
      className={classNames(style.coupons, codes.length || style.couponsEmpty, classes && classes.container)}
      {...generateTestId({ name: 'discount-codes' })}
    >
      {fetching || errored ? (
        <Loading />
      ) : codes.length ? (
        codes.map((coupon) => (
          <DiscountCoupon
            key={coupon.id}
            coupon={coupon}
            enabled={!!coupon.available}
            isApplied={coupon.code === appliedCode}
            isApplying={coupon.code === applyingCode && isApplying}
            classes={{ container: style.couponEntry }}
            onClickCoupon={() =>
              history.push(generatePath(ROUTING_DISCOUNT_CODE_DETAIL, { discountCode: coupon.code }))
            }
            onClickApply={() => onCodeSubmit(coupon.code)}
          />
        ))
      ) : (
        <NoContentPlaceholder
          title={placeholderText}
          logo={NO_CONTENT_LOGO.COUPONS}
          classes={{ container: style.errorPlaceholder, logo: style.logo }}
        />
      )}
    </div>
  );
};

const DiscountCodeSections = (props) => {
  const {
    onTabLoad,
    history,
    location,
    paging,
    cartStore: {
      suggestionDiscountCodes,
      suggestionDiscountCodesFetching,
      suggestionDiscountCodesErrored,
      cartDetail,
      addDiscountCode: { code: applyingCode, loading: isApplyingCode }
    },
    userStore: {
      personalDiscountCode: {
        index: personalDiscountCodes,
        fetching: personalDiscountCodeFetching,
        errored: personalDiscountCodeErrored
      },
      vouchers: { byQuery: vouchersByQuery, fetching: voucherFetching, errored: voucherErrored }
    },
    addDiscountCodeAction
  } = props;
  const pageHash = objectToHash(paging);
  const vouchers = vouchersByQuery[pageHash] || [];
  const appliedCode = !!cartDetail ? cartDetail.discount_code : '';

  const [discountCodeTabs, setDiscountCodeTabs] = useState<Array<{ id: string; title: string; selected?: boolean }>>([
    { id: DISCOUNT_CODE_TAB.SuggestionDiscountCodes.slug, title: 'Mã giảm giá hot' },
    { id: DISCOUNT_CODE_TAB.UserDiscountCodes.slug, title: 'Dành riêng cho bạn' },
    { id: DISCOUNT_CODE_TAB.Vouchers.slug, title: 'Vouchers' }
  ]);
  useEffect(() => {
    setCurrentDiscountCodeTab(getInitialTabId({ location }));
  }, []);

  const setCurrentDiscountCodeTab = (id) => {
    setDiscountCodeTabs(discountCodeTabs.map((nthTab) => Object.assign({}, nthTab, { selected: nthTab.id === id })));
    setTabQueryString({ tabSlug: id, history, location });
    onTabLoad(id);
  };
  const currentDiscountCodeTab = discountCodeTabs.find((tab) => tab.selected);
  let codes = [];
  let transientState = { fetching: false, errored: false };
  let placeholderText = 'Không có mã giảm giá nào';
  switch (currentDiscountCodeTab && currentDiscountCodeTab.id) {
    case DISCOUNT_CODE_TAB.SuggestionDiscountCodes.slug:
      codes = suggestionDiscountCodes;
      transientState = { fetching: suggestionDiscountCodesFetching, errored: suggestionDiscountCodesErrored };
      break;
    case DISCOUNT_CODE_TAB.UserDiscountCodes.slug:
      codes = personalDiscountCodes;
      transientState = { fetching: personalDiscountCodeFetching, errored: personalDiscountCodeErrored };
      break;
    case DISCOUNT_CODE_TAB.Vouchers.slug:
      codes = vouchers;
      transientState = { fetching: voucherFetching, errored: voucherErrored };
      placeholderText = 'Bạn không có voucher nào';
      break;
  }

  return (
    <div className={style.discountCodeSections} {...generateTestId({ name: 'discount-code-sections' })}>
      <MobileTabHeader
        tabs={discountCodeTabs}
        className={style.mobileTabHeader}
        onSelect={(tab) => setCurrentDiscountCodeTab(tab.id)}
      />
      <DiscountCodes
        codes={codes}
        appliedCode={appliedCode}
        applyingCode={applyingCode}
        isApplying={isApplyingCode}
        transientState={transientState}
        placeholderText={placeholderText}
        onCodeSubmit={(code) =>
          isApplyingCode ||
          addDiscountCodeAction(
            {
              discountCode: code,
              isOpenCartSummary: false,
              whereAdded: 'Discount code Tab'
            },
            true
          )
        }
      />
    </div>
  );
};

const View = (props) => {
  const splitLayoutProps = {
    subContainer: <UserSidePanel />,
    size: 'larger',
    mainContainerClassName: style.mainContainer,
    mainContainer: <DiscountCodeSections {...props} />
  };

  return (
    <div className={style.desktopWrapOuter} {...generateTestId({ name: 'discount-code-tabs' })}>
      <WrapLayout>
        <SplitLayout {...splitLayoutProps} />
      </WrapLayout>
    </div>
  );
};

export default View;
