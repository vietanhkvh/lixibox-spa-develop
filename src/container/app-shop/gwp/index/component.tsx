import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GwpSchemes, GwpState } from 'flows/gwp/types';
import { FetchBannerActionParams } from 'flows/banner/action';
import { BannerState } from 'flows/banner/types';
import { CDN_ASSETS_PREFIX } from 'utils/uri';
import { isMobileVersion } from 'utils/responsive';
import { objectToHash } from 'utils';
import { GetBannerOutput, getBanner } from './utils';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';

const GWP_BANNER_FETCH_PARAMS = { idBanner: 'gwp', limit: 1 };
const WEEKLY_BANNER_FETCH_PARAMS = { idBanner: 'weekly-specials-large-02', limit: 30 };

interface ViewProps {
  schemes: GwpSchemes;
  gwpBanner: any;
  weeklyBanners: Array<any>;
  banner: GetBannerOutput;
  isLoading: boolean;
  onCountdownExpire?: () => void;
  onCopy?: (code: string) => void;
}
interface GwpIndexProps {
  bannerStore: BannerState;
  gwpStore: GwpState;
  fetchBannerAction: (data: FetchBannerActionParams) => void;
  getGwpSchemesAction: () => void;
  updateMetaInfoAction: any;
  updateUrlParamsAction: ({ mobileappWebviewStatus }) => void;
  copyTextToClipboard: (text: string) => void;
}
const GwpIndex = ({
  bannerStore: { bannerList, banner: bannerState },
  gwpStore: { schemes },
  fetchBannerAction,
  getGwpSchemesAction,
  updateUrlParamsAction,
  updateMetaInfoAction,
  copyTextToClipboard
}: GwpIndexProps) => {
  const { 'mobileapp-webview': mobileappWebView } = useParams<{ 'mobileapp-webview': string }>();
  useEffect(() => {
    fetchBannerAction(GWP_BANNER_FETCH_PARAMS);
    fetchBannerAction(WEEKLY_BANNER_FETCH_PARAMS);
    getGwpSchemesAction();

    mobileappWebView && updateUrlParamsAction({ mobileappWebviewStatus: true });
  }, []);

  useEffect(() => {
    if (!schemes.fetching) {
      const gwpBanner = bannerList[gwpBannerHash]?.[0];
      const cover = gwpBanner?.cover_image?.original_url || CDN_ASSETS_PREFIX('/meta/cover.png');

      updateMetaInfoAction({
        info: {
          url: window.location.href,
          type: 'article',
          title: 'Lixibox GWP: Free quà 2 Triệu cho mỗi đơn hàng (Gift With Purchase)',
          description:
            'Lixibox GWP: GWP lớn nhất Việt Nam, free quà tặng kèm lên đến 2 triệu. Tha hồ mua quà tặng mẹ, người yêu, đồng nghiệp. Mua 1 nhận đến 12 chỉ có tại Lixibox. Săn ngay!',
          keyword:
            'máy rửa mặt, halio, mỹ phẩm, dưỡng da, trị mụn, skincare, makeup, lustre, Lixibox GWP, GWP vietnam, gift with purchase, quà tặng kèm, GWP là gì?',
          image: cover
        },
        structuredData: {
          breadcrumbList: []
        }
      });
    }
  }, [schemes.fetching]);

  const gwpBannerHash = objectToHash(GWP_BANNER_FETCH_PARAMS);
  const weeklyBannersHash = objectToHash(WEEKLY_BANNER_FETCH_PARAMS);
  const gwpBanner = bannerList[gwpBannerHash]?.[0];
  const weeklyBanners: any = bannerList[weeklyBannersHash] || [];
  const isLoading = schemes.fetching;
  const banner = getBanner({ schemes, banner: gwpBanner, bannerState, bannerId: GWP_BANNER_FETCH_PARAMS.idBanner });

  const View = isMobileVersion() ? MobileView : DesktopView;

  return (
    <View
      {...{
        schemes,
        gwpBanner,
        weeklyBanners,
        banner,
        isLoading,
        onCountdownExpire: () => {
          getGwpSchemesAction();
        },
        onCopy: (content) => copyTextToClipboard(content)
      }}
    />
  );
};

export type { ViewProps };
export default GwpIndex;
