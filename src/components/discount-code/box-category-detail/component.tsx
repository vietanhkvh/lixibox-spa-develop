import { useEffect } from 'react';
import { generatePath } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { isMobileVersion } from '../../../utils/responsive';
import { objectToHash } from '../../../utils/encode';
import { ROUTING_DISCOUNT_CODE_CATEGORY_BOXES, ROUTING_SHOP_INDEX } from '../../../routings/path';
import MobileView from './view/mobile';
import DesktopView from './view/desktop';

const BOX_CATEGORY = Object.freeze({
  SpecialAddons: 'special-addons',
  ApplicableBoxes: 'applicable-boxes',
  GiftBoxes: 'gift-boxes'
});

interface DiscountCodeBoxCategoryDetailProps {
  code: string;
  classes?: { container?: string };
  boxCategory: string;
  perPage?: number;

  discountCodeStore: any;
  fetchDiscountCodesByCodeAction: (params: { code: string; page?: number; perPage?: number }) => any;
  fetchDiscountCodeSpecialAddonsAction: (params: { code: string; page?: number; perPage?: number }) => any;
  fetchDiscountCodeApplicableBoxesAction: (params: { code: string; page?: number; perPage?: number }) => any;
  fetchDiscountCodeGiftBoxesAction: (params: { code: string; page?: number; perPage?: number }) => any;
}
const DiscountCodeBoxCategoryDetail = ({
  code,
  classes,
  boxCategory,
  perPage,
  discountCodeStore: {
    discountCodes,
    discountCodeSpecialAddons: {
      byQuery: allSpecialAddons,
      pages: specialAddonsPages,
      lastPaging: specialAddonsLastPaging,
      fetching: specialAddonsFetching,
      loaded: specialAddonsLoaded
    },
    discountCodeApplicableBoxes: {
      byQuery: allApplicableBoxes,
      pages: applicableBoxesPages,
      lastPaging: applicableBoxesLastPaging,
      fetching: applicableBoxesFetching,
      loaded: applicableBoxesLoaded
    },
    discountCodeGiftBoxes: {
      byQuery: allGiftBoxes,
      pages: giftBoxesPages,
      lastPaging: giftBoxesLastPaging,
      fetching: giftBoxesFetching,
      loaded: giftBoxesLoaded
    }
  },
  fetchDiscountCodesByCodeAction,
  fetchDiscountCodeSpecialAddonsAction,
  fetchDiscountCodeApplicableBoxesAction,
  fetchDiscountCodeGiftBoxesAction
}: DiscountCodeBoxCategoryDetailProps) => {
  const discountCodeQueryHash = objectToHash({ code });
  const boxQuery = { code, page: 1, perPage };
  const discountCode = discountCodes[discountCodeQueryHash] || {};
  let fetchBoxesAction: any;
  let boxesPages: Array<any>;
  let allBoxes: { [key: string]: any };
  let boxCount: number;
  let boxes: { index: Array<any>; showAll: boolean; showAllLink: string; count: number };
  let boxesLoaded: boolean;
  let boxesLastPaging: any;
  let boxesFetching: boolean;

  const combineAllBoxes = ({ boxesPages, allBoxes }) => {
    const pages: Array<number> = Array.from(new Set(boxesPages.sort().filter((nth) => nth)));
    return pages.reduce((acc, page) => acc.concat(allBoxes[objectToHash({ code, page, perPage })] || []), []);
  };
  switch (boxCategory) {
    case BOX_CATEGORY.ApplicableBoxes:
      fetchBoxesAction = fetchDiscountCodeApplicableBoxesAction;
      boxesPages = applicableBoxesPages;
      allBoxes = allApplicableBoxes;
      boxCount = discountCode.applicable_box_count || 0;
      boxes = {
        index: combineAllBoxes({ boxesPages, allBoxes }),
        showAll: boxCount > perPage,
        showAllLink: generatePath(ROUTING_DISCOUNT_CODE_CATEGORY_BOXES, {
          discountCode: code,
          boxCategory: BOX_CATEGORY.ApplicableBoxes
        }),
        count: boxCount
      };
      boxesLoaded = applicableBoxesLoaded;
      boxesLastPaging = applicableBoxesLastPaging;
      boxesFetching = applicableBoxesFetching;
      break;
    case BOX_CATEGORY.SpecialAddons:
      fetchBoxesAction = fetchDiscountCodeSpecialAddonsAction;
      boxesPages = specialAddonsPages;
      allBoxes = allSpecialAddons;
      boxCount = discountCode.special_add_on_count || 0;
      boxes = {
        index: combineAllBoxes({ boxesPages, allBoxes }),
        showAll: boxCount > perPage,
        showAllLink: generatePath(ROUTING_DISCOUNT_CODE_CATEGORY_BOXES, {
          discountCode: code,
          boxCategory: BOX_CATEGORY.SpecialAddons
        }),
        count: boxCount
      };
      boxesLoaded = specialAddonsLoaded;
      boxesLastPaging = specialAddonsLastPaging;
      boxesFetching = specialAddonsFetching;
      break;
    case BOX_CATEGORY.GiftBoxes:
      fetchBoxesAction = fetchDiscountCodeGiftBoxesAction;
      boxesPages = giftBoxesPages;
      allBoxes = allGiftBoxes;
      boxCount = discountCode.gift_box_count || 0;
      boxes = {
        index: combineAllBoxes({ boxesPages, allBoxes }),
        showAll: boxCount > perPage,
        showAllLink: generatePath(ROUTING_DISCOUNT_CODE_CATEGORY_BOXES, {
          discountCode: code,
          boxCategory: BOX_CATEGORY.GiftBoxes
        }),
        count: boxCount
      };
      boxesLoaded = giftBoxesLoaded;
      boxesLastPaging = giftBoxesLastPaging;
      boxesFetching = giftBoxesFetching;
      break;
  }

  const history = useHistory();
  useEffect(() => {
    fetchDiscountCodesByCodeAction(boxQuery);
    fetchBoxesAction(boxQuery);
  }, []);

  const isLoaded = !!Object.keys(discountCode).length;
  const hasPageToLoad = !boxesLoaded || (boxesLastPaging && boxesLastPaging.total_pages > boxesLastPaging.current_page);
  const hasNoContent = !boxes.index.length;
  const onLoadMore = () => {
    if (!boxesFetching && hasPageToLoad) {
      const nextPageToLoad = !boxesLoaded ? 1 : boxesLastPaging.current_page + 1;
      fetchBoxesAction({ code, page: nextPageToLoad, perPage });
    }
  };
  const onNoContentClick = () => {
    history.push(ROUTING_SHOP_INDEX);
  };
  const View = isMobileVersion() ? MobileView : DesktopView;

  return (
    <View
      {...{
        code,
        classes,
        boxes,
        boxCategory,
        isLoaded,
        hasPageToLoad,
        hasNoContent,
        onNoContentClick,
        onLoadMore
      }}
    />
  );
};
DiscountCodeBoxCategoryDetail.defaultProps = {
  perPage: 20
};

export { BOX_CATEGORY };
export default DiscountCodeBoxCategoryDetail;
