// TODO: Define reusable infinite loading strategy
import { useEffect, useState } from 'react';
import { generatePath, useHistory } from 'react-router-dom';

import { isMobileVersion } from '../../../utils/responsive';
import { objectToHash } from '../../../utils/encode';
import { usePrevious } from 'utils/hook';
import { gatewayTrackViewContentFromList, gatewayTrackViewDiscountCode } from 'tracking/gateway';
import { ROUTING_DISCOUNT_CODE_CATEGORY_BOXES, ROUTING_SHOP_INDEX } from '../../../routings/path';
import MobileView from './view/mobile';
import DesktopView from './view/desktop';
import { ProductBox } from 'types/api/shop';
import { ViewedSource } from 'tracking/constants';

const BOX_CATEGORY = Object.freeze({
  SpecialAddons: 'special-addons',
  ApplicableBoxes: 'applicable-boxes',
  GiftBoxes: 'gift-boxes'
});

export interface ViewProps {
  code: string;
  specialAddons: { index: Array<any>; showAll: boolean; showAllLink: string; count: number };
  applicableBoxes: { index: Array<any>; showAll: boolean; showAllLink: string; count: number };
  giftBoxes: { index: Array<any>; showAll: boolean; showAllLink: string; count: number };
  isLoaded: boolean;
  isFailed: boolean;
  isCompact: boolean;
  hasPageToLoad: boolean;
  hasNoContent: boolean;
  onNoContentClick: () => any;
  onLoadMore: () => any;
  onSectionItemClick?: (box: ProductBox, index: number, section: string) => void;
  classes?: { container?: string };
}
interface DiscountCodeDetailProps {
  code: string;
  classes?: { container?: string };

  isCompact?: boolean;
  perPage?: number;
  discountCodeStore: any;
  fetchDiscountCodesByCodeAction: (params: { code: string; page?: number; perPage?: number }) => any;
  fetchDiscountCodeSpecialAddonsAction: (params: { code: string; page?: number; perPage?: number }) => any;
  fetchDiscountCodeApplicableBoxesAction: (params: { code: string; page?: number; perPage?: number }) => any;
  fetchDiscountCodeGiftBoxesAction: (params: { code: string; page?: number; perPage?: number }) => any;
}
const DiscountCodeDetail = ({
  code,
  classes,
  isCompact,
  perPage,
  discountCodeStore: {
    discountCodes,
    discountCodeSpecialAddons: { byQuery: allSpecialAddons },
    discountCodeApplicableBoxes: {
      byQuery: allApplicableBoxes,
      pages: applicableBoxesPages,
      lastPaging: applicableBoxesLastPaging,
      fetching: applicableBoxesFetching,
      loaded: applicableBoxesLoaded
    },
    discountCodeGiftBoxes: { byQuery: allGiftBoxes },
    isFetchingDiscountCode,
    isFetchDiscountCodeSuccess
  },
  fetchDiscountCodesByCodeAction,
  fetchDiscountCodeSpecialAddonsAction,
  fetchDiscountCodeApplicableBoxesAction,
  fetchDiscountCodeGiftBoxesAction
}: DiscountCodeDetailProps) => {
  const discountCodeQueryHash = objectToHash({ code });
  const boxQuery = { code, page: 1, perPage };
  const boxQueryHash = objectToHash(boxQuery);
  const history = useHistory();
  useEffect(() => {
    fetchDiscountCodesByCodeAction(boxQuery);
    fetchDiscountCodeSpecialAddonsAction(boxQuery);
    fetchDiscountCodeApplicableBoxesAction(boxQuery);
    fetchDiscountCodeGiftBoxesAction(boxQuery);
  }, []);
  const [isFailed, setIsFailed] = useState(false);
  const wasFetchingDiscountCode = usePrevious(isFetchingDiscountCode);
  useEffect(() => {
    if (wasFetchingDiscountCode && !isFetchingDiscountCode) {
      setIsFailed(!isFetchDiscountCodeSuccess);

      const discountCode = discountCodes[discountCodeQueryHash];
      isFetchDiscountCodeSuccess && discountCode && gatewayTrackViewDiscountCode({ discountCode });
    }
  }, [isFetchingDiscountCode, discountCodes, discountCodeQueryHash]);

  const combineAllApplicableBoxes = () => {
    const pages: Array<number> = Array.from(new Set(applicableBoxesPages.sort().filter((nth) => nth)));
    return pages.reduce((acc, page) => acc.concat(allApplicableBoxes[objectToHash({ code, page, perPage })] || []), []);
  };

  const discountCode = discountCodes[discountCodeQueryHash] || {};
  const specialAddonCount = discountCode.special_add_on_count || 0;
  const applicableBoxCount = discountCode.applicable_box_count || 0;
  const giftBoxCount = discountCode.gift_box_count || 0;
  const giftBoxes = {
    index: allGiftBoxes[boxQueryHash] || [],
    showAll: giftBoxCount > perPage,
    showAllLink: generatePath(ROUTING_DISCOUNT_CODE_CATEGORY_BOXES, {
      discountCode: code,
      boxCategory: BOX_CATEGORY.GiftBoxes
    }),
    count: giftBoxCount
  };
  const specialAddons = {
    index: allSpecialAddons[boxQueryHash] || [],
    showAll: specialAddonCount > perPage,
    showAllLink: generatePath(ROUTING_DISCOUNT_CODE_CATEGORY_BOXES, {
      discountCode: code,
      boxCategory: BOX_CATEGORY.SpecialAddons
    }),
    count: specialAddonCount
  };
  const applicableBoxes = {
    index: combineAllApplicableBoxes(),
    showAll: applicableBoxCount > perPage,
    showAllLink: generatePath(ROUTING_DISCOUNT_CODE_CATEGORY_BOXES, {
      discountCode: code,
      boxCategory: BOX_CATEGORY.ApplicableBoxes
    }),
    count: applicableBoxCount
  };
  const isLoaded = !!Object.keys(discountCode).length;
  const hasPageToLoad =
    !applicableBoxesLoaded ||
    (applicableBoxesLastPaging && applicableBoxesLastPaging.total_pages > applicableBoxesLastPaging.current_page);
  const hasNoContent = !specialAddons.index.length && !applicableBoxes.index.length && !giftBoxes.index.length;
  const onLoadMore = () => {
    if (!applicableBoxesFetching && hasPageToLoad) {
      const nextPageToLoad = !applicableBoxesLoaded ? 1 : applicableBoxesLastPaging.current_page + 1;
      fetchDiscountCodeApplicableBoxesAction({ code, page: nextPageToLoad, perPage });
    }
  };
  const onNoContentClick = () => {
    history.push(ROUTING_SHOP_INDEX);
  };
  const onSectionItemClick = (box, index, _) => {
    gatewayTrackViewContentFromList({ source: ViewedSource.DISCOUNT_CODE, sourceId: code, box, index });
  };
  const View = isMobileVersion() || isCompact ? MobileView : DesktopView;

  return (
    <View
      {...{
        code,
        classes,
        specialAddons,
        applicableBoxes,
        giftBoxes,
        isLoaded,
        isFailed,
        isCompact,
        hasPageToLoad,
        hasNoContent,
        onNoContentClick,
        onLoadMore,
        onSectionItemClick
      }}
    />
  );
};
DiscountCodeDetail.defaultProps = {
  perPage: 20,
  isCompact: false
};

export default DiscountCodeDetail;
