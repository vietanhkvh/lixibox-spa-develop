import { isMobileVersion } from '../../../../utils/responsive';

import { BANNER_LIMIT_DEFAULT, BANNER_ID } from '../../../../constants/application/default';

/**
 * Initialize
 * 1. Check data exist or not to fetch
 * 2. add event listener for window scroll
 *
 * @param {store} bannerStore
 * @param {action} fetchBannerAction
 */
export const init = ({ fetchBannerAction, handleScroll }) => {
  /** 1. Fetch header top banner */
  setTimeout(
    () =>
      fetchBannerAction({
        idBanner: BANNER_ID.HEADER_TOP,
        limit: BANNER_LIMIT_DEFAULT
      }),
    2000
  );

  /** 2. add event listener for window scroll */
  if (!isMobileVersion()) {
    handleScroll();
    window.addEventListener('scroll', () => handleScroll());
  }
};

/**
 * Handle when component will un-mount
 *
 * 1. Remove event listener for scroll
 */
export const destroy = () => !isMobileVersion() && window.removeEventListener('scroll', () => {});
