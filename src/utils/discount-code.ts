import { DISCOUNT_CODE_TAB } from '../constants/application/discount-code';

export const DefaultTab = DISCOUNT_CODE_TAB.Vouchers.slug;

export const setTabQueryString = ({
  tabSlug,
  history,
  location
}: {
  tabSlug: string | number;
  history: any;
  location: any;
}) => {
  const search = new URLSearchParams(location.search);

  switch (tabSlug) {
    case DefaultTab:
      search.delete('tab');
      break;
    case DISCOUNT_CODE_TAB.SuggestionDiscountCodes.slug:
      search.set('tab', DISCOUNT_CODE_TAB.SuggestionDiscountCodes.slug);
      break;
    case DISCOUNT_CODE_TAB.UserDiscountCodes.slug:
      search.set('tab', DISCOUNT_CODE_TAB.UserDiscountCodes.slug);
      break;
    case DISCOUNT_CODE_TAB.Vouchers.slug:
      search.set('tab', DISCOUNT_CODE_TAB.Vouchers.slug);
      break;
    default:
  }

  history.replace(`${location.pathname}?${search.toString()}`);
};

export const getInitialTabId = ({ location }: { location: any }) => {
  const search = new URLSearchParams(location.search);

  if (search.has('tab')) {
    return search.get('tab');
  }

  return DefaultTab;
};
