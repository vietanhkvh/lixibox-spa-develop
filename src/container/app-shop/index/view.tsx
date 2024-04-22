import { getDeviceVersion } from '../../../utils/responsive';

import renderMobile from './view-mobile';
import renderDesktop from './view-desktop';

const renderView = ({
  props,
  state,
  handleFeatureBanner,
  handleFetchHotBoxes,
  handleFetchMagazineList,
  handleFetchNewProducts,
  handleFetchPopularSearch,
  handleFetchWatchedList,
  handleFetchActivityFeed,
  handleFetchFooterBanner,
  handleFetchRecommendationBox,
  handleOpenCategoryModal,
  handleCloseCategoryModal
}) => {
  const switchView = {
    MOBILE: () =>
      renderMobile({
        props,
        state,
        handleFeatureBanner,
        handleFetchHotBoxes,
        handleFetchNewProducts,
        handleFetchPopularSearch,
        handleFetchWatchedList,
        handleFetchRecommendationBox,
        handleOpenCategoryModal,
        handleCloseCategoryModal
      }),
    DESKTOP: () =>
      renderDesktop({
        props,
        state,
        handleFeatureBanner,
        handleFetchHotBoxes,
        handleFetchMagazineList,
        handleFetchNewProducts,
        handleFetchPopularSearch,
        handleFetchWatchedList,
        handleFetchActivityFeed,
        handleFetchFooterBanner,
        handleFetchRecommendationBox
      })
  };

  return switchView[getDeviceVersion()]();
};

export default renderView;
