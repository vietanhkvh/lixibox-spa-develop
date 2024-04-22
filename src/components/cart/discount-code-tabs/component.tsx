import { isMobileVersion } from '../../../utils/responsive';
import { DISCOUNT_CODE_TAB } from '../../../constants/application/discount-code';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';

interface DiscountCodeTabsProps {
  history: any;
  location: any;
  match: any;

  authStore: any;
  cartStore: any;
  errorStore: any;
  userStore: any;
  addDiscountCodeAction: (param?: any) => any;
  popErrorAction: (param?: any) => any;
  fetchUserPersonalDiscountCodesAction: (param?: any) => any;
  fetchUserVouchersAction: (param0?: any) => any;
  fetchSuggestionDiscountCodesAction: (param?: any) => any;
}
const DiscountCodeTabs = (props: DiscountCodeTabsProps) => {
  const { fetchSuggestionDiscountCodesAction, fetchUserPersonalDiscountCodesAction, fetchUserVouchersAction } = props;
  const paging = { page: 1, perPage: 30 };

  const onTabLoad = (id: string) => {
    switch (id) {
      case DISCOUNT_CODE_TAB.SuggestionDiscountCodes.slug:
        fetchSuggestionDiscountCodesAction();
        break;
      case DISCOUNT_CODE_TAB.UserDiscountCodes.slug:
        fetchUserPersonalDiscountCodesAction(paging);
        break;
      case DISCOUNT_CODE_TAB.Vouchers.slug:
        fetchUserVouchersAction(paging);
        break;
    }
  };

  const View = isMobileVersion() ? MobileView : DesktopView;

  return <View paging={paging} onTabLoad={onTabLoad} {...props} />;
};

export default DiscountCodeTabs;
