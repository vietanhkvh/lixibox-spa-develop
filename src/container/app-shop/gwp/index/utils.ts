import { GwpSchemes } from 'flows/gwp/types';
import { Banner, BannerTransientState } from 'flows/banner/types';
import { isMobileVersion } from 'utils/responsive';
import { VideoBannerResponse } from 'types/api/gwp';

export interface GetBannerParams {
  schemes: GwpSchemes;
  banner: Banner;
  bannerState: BannerTransientState;
  bannerId: string;
}
export interface GetBannerOutput {
  isBannerLoading: boolean;
  isBannerLoaded: boolean;
  isVideoBanner: boolean;
  shouldShowBanner: boolean;
  currentBanner: Banner | VideoBannerResponse;
  currentBannerUrl: string;
}
export const getBanner = ({ schemes, banner, bannerState, bannerId }: GetBannerParams): GetBannerOutput => {
  const videoBannerUrl = isMobileVersion() ? schemes?.videoBanner?.portrait?.url : schemes?.videoBanner?.landscape?.url;
  const imageBannerUrl = banner?.cover_image?.original_url;
  const isVideoBanner = !!videoBannerUrl;

  return {
    isBannerLoading: schemes?.fetching || (bannerState?.lastId === bannerId && bannerState?.fetching),
    isBannerLoaded: isVideoBanner || !!imageBannerUrl,
    isVideoBanner,
    shouldShowBanner: isVideoBanner || !!imageBannerUrl,
    currentBanner: isVideoBanner
      ? isMobileVersion
        ? schemes?.videoBanner?.portrait
        : schemes?.videoBanner?.landscape
      : banner,
    currentBannerUrl: (isVideoBanner ? videoBannerUrl : imageBannerUrl) || ''
  };
};
