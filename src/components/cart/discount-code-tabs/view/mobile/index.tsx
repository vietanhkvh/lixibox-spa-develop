import { useState, useEffect } from 'react';
import { useHistory, generatePath } from 'react-router-dom';

import TabView from '../../../../../presentation-component/ui/tab-view/mobile';

import NoContentPlaceholder, {
  NO_CONTENT_LOGO
} from '../../../../../presentation-component/general/mobile/no-content-placeholder';
import DiscountCoupon from '../../../../../presentation-component/general/discount-coupon';
import { setTabQueryString, getInitialTabId } from '../../../../../utils/discount-code';
import { DISCOUNT_CODE_TAB } from '../../../../../constants/application/discount-code';
import Loading from '../../../../../components/ui/loading';
import { ROUTING_DISCOUNT_CODE_DETAIL } from '../../../../../routings/path';
import { objectToHash } from '../../../../../utils/encode';
import style from './style.module.scss';

interface DiscountCodesProps {
  codes: Array<any>;
  appliedCode: string;
  applyingCode: string;
  isApplying: boolean;
  transientState: { fetching: boolean; errored: boolean };
  placeholderText: string;
  onCodeSubmit: (param?: any) => any;
}
const DiscountCodes = ({
  codes,
  appliedCode,
  applyingCode,
  isApplying,
  transientState: { fetching, errored },
  placeholderText,
  onCodeSubmit
}: DiscountCodesProps) => {
  const history = useHistory();

  return (
    <div className={style.discountCodes}>
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

const View = (props) => {
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
      vouchers: { byQuery: vouchersByQuery, fetching: vouchersFetching, errored: vouchersErrored }
    },
    addDiscountCodeAction
  } = props;
  const pageHash = objectToHash(paging);
  const vouchers = vouchersByQuery[pageHash] || [];
  const [discountCodeTabs, setDiscountCodeTabs] = useState([
    { id: DISCOUNT_CODE_TAB.SuggestionDiscountCodes.slug, name: 'Gợi ý' },
    { id: DISCOUNT_CODE_TAB.UserDiscountCodes.slug, name: 'Của tôi' },
    { id: DISCOUNT_CODE_TAB.Vouchers.slug, name: 'Voucher' }
  ]);

  useEffect(() => {
    setCurrentDiscountCodeTab(getInitialTabId({ location }));
  }, []);

  const appliedCode = !!cartDetail ? cartDetail.discount_code : '';

  const setCurrentDiscountCodeTab = (id) => {
    setDiscountCodeTabs(discountCodeTabs.map((nthTab) => Object.assign({}, nthTab, { active: nthTab.id === id })));
    setTabQueryString({ tabSlug: id, history, location });
    onTabLoad(id);
  };

  return (
    <TabView
      classes={{ container: style.discountCodeTabs, headerEntry: style.headerEntry, body: style.tabBody }}
      entries={discountCodeTabs}
      onChange={(tab) => {
        setCurrentDiscountCodeTab(tab.id);
      }}
    >
      {({ id }) => {
        let codes = [];
        let transientState = { fetching: false, errored: false };
        let placeholderText = 'Không có mã giảm giá nào';
        switch (id) {
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
            transientState = { fetching: vouchersFetching, errored: vouchersErrored };
            placeholderText = 'Bạn không có voucher nào';
            break;
        }
        return (
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
        );
      }}
    </TabView>
  );
};

export default View;
