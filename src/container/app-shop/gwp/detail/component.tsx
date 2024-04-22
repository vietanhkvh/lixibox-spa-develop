import { useEffect, useRef, useState } from 'react';
import { useParams, useHistory, generatePath } from 'react-router-dom';
import classNames from 'classnames';
import GeneralModal from 'presentation-component/modal/general-modal';
import { GwpLoadedScheme } from 'flows/gwp/types';
import { GiftBox as GiftBoxType } from 'types/api/gwp';
import { isMobileVersion } from 'utils/responsive';
import { usePrevious } from 'utils/hook';
import {
  areTimestampsInRange,
  isTimestampInFuture,
  isTimestampInPast,
  timestampDeltaToFormattedDuration,
  unixSecondsNow
} from 'utils/time';
import { ProductBox } from 'types/api/shop';
import { objectToHash } from 'utils';
import { ROUTING_PRODUCT_CATEGORY, ROUTING_PRODUCT_DETAIL } from 'routings/path';
import { gatewayTrackViewedGwpScheme } from 'tracking/gateway';
import GwpComboDetail from '../combo-detail';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';
import { PropsFromRedux } from './store';
import styles from './view/styles.module.scss';

const COUNTDOWN_UPDATE_INTERVAL_MS = 1000;
const HOT_DEAL_FETCH_PER_PAGE = 15;
const HOT_DEAL_FETCH_PAGE = 1;
const BEST_SELLING_BOXES_FETCH_QUERY = {
  idCategory: 'best-selling-beauty-box',
  searchQuery: 'stock_status=in_stock'
};

interface CountdownState {
  day: number;
  hour: number;
  minute: number;
  second: number;
}
interface ViewProps {
  scheme: GwpLoadedScheme;
  descriptionText: string;
  countdown: CountdownState;
  shouldShowCountdown: boolean;
  countdownText: string;
  isExpired: boolean;
  shouldShowProductLists: boolean;
  hotDeals: ProductBox[];
  isHotDealsLoading: boolean;
  isHotDealsLoaded: boolean;
  bestSellingBoxes: ProductBox[];
  isBestSellingBoxesLoading: boolean;
  isBestSellingBoxesLoaded: boolean;
  isExclusiveBoxesLoading: boolean;
  isExclusiveBoxesLoaded: boolean;
  exclusiveBoxes: ProductBox[];
  bestSellingBoxesPath: string;
  onBoxClick: ({ box }: { box: GiftBoxType }) => void;
  onCopy: (code: string) => void;
}
interface GwpDetailProps extends PropsFromRedux {}
const GwpDetail = ({
  gwpStore: { loadedScheme: scheme },
  shopStore: { hotDeals, productByCategory, fetchProductByCategory },
  themeStore: { gwpSchemeExclusiveBoxes },
  getGwpSchemeDetailAction,
  updateMetaInfoAction,
  updateUrlParamsAction,
  fetchDataHotDealAction,
  fetchProductByCategoryAction,
  fetchGwpSchemeExclusiveBoxesAction,
  copyTextToClipboard
}: GwpDetailProps) => {
  const bestSellingBoxesQueryHash = objectToHash(BEST_SELLING_BOXES_FETCH_QUERY);
  const intervalId = useRef<NodeJS.Timeout>();
  const [countdown, setCountdown] = useState<{ day: number; hour: number; minute: number; second: number }>({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0
  });
  const descriptionText = scheme.detail?.description || '';
  const discountCodeStartDate = scheme.detail?.discount_code?.start_date || 0;
  const discountCodeEndDate = scheme.detail?.discount_code?.end_date || 0;
  const aDayInSeconds = 24 * 60 * 60;

  const shouldShowUpcomingCountdown =
    discountCodeStartDate &&
    isTimestampInFuture(discountCodeStartDate) &&
    areTimestampsInRange({
      timestamp1: discountCodeStartDate,
      timestamp2: unixSecondsNow(),
      rangeSeconds: aDayInSeconds * 3
    });
  const shouldShowExpiringCountdown =
    (!discountCodeStartDate || isTimestampInPast(discountCodeStartDate)) &&
    isTimestampInFuture(discountCodeEndDate) &&
    areTimestampsInRange({
      timestamp1: discountCodeEndDate,
      timestamp2: unixSecondsNow(),
      rangeSeconds: aDayInSeconds
    });

  const shouldShowCountdown = shouldShowUpcomingCountdown || shouldShowExpiringCountdown;
  const countdownText = shouldShowCountdown ? (shouldShowUpcomingCountdown ? 'Bắt đầu sau' : 'Kết thúc trong') : '';
  const didShowCountdown = usePrevious(shouldShowCountdown);
  const didShowUpcomingCountdown = usePrevious(shouldShowUpcomingCountdown);
  const didShowExpiringCountdown = usePrevious(shouldShowExpiringCountdown);
  useEffect(() => {
    if (!didShowCountdown && shouldShowCountdown) {
      clearInterval(intervalId.current);
      intervalId.current = setInterval(() => {
        shouldShowUpcomingCountdown &&
          setCountdown(
            timestampDeltaToFormattedDuration({ timestamp1: unixSecondsNow(), timestamp2: discountCodeStartDate })
          );
        shouldShowExpiringCountdown &&
          setCountdown(
            timestampDeltaToFormattedDuration({ timestamp1: unixSecondsNow(), timestamp2: discountCodeEndDate })
          );
      }, COUNTDOWN_UPDATE_INTERVAL_MS);
    }

    if (
      (didShowUpcomingCountdown && !shouldShowUpcomingCountdown) ||
      (didShowExpiringCountdown && !shouldShowExpiringCountdown)
    ) {
      clearInterval(intervalId.current);
      window.location.reload();
    }

    return () => {
      clearInterval(intervalId.current);
    };
  }, [shouldShowCountdown, shouldShowUpcomingCountdown, shouldShowExpiringCountdown]);
  const isExpired = !!discountCodeEndDate && unixSecondsNow() > discountCodeEndDate;

  const { gwpSlug, 'mobileapp-webview': mobileappWebView } = useParams<{
    gwpSlug: string;
    'mobileapp-webview': string;
  }>();
  const [modalState, setModalState] = useState<{
    title: string;
    box: GiftBoxType;
    isOpen: boolean;
  }>({ title: '', box: null, isOpen: false });
  const updateModalState = (stateUpdate) => setModalState((prevState) => Object.assign({}, prevState, stateUpdate));
  const history = useHistory();
  useEffect(() => {
    getGwpSchemeDetailAction({ slug: gwpSlug });
    mobileappWebView && updateUrlParamsAction({ mobileappWebviewStatus: true });
  }, []);
  const wasFetchingSchemeDetail = usePrevious(scheme.fetching);
  useEffect(() => {
    if (wasFetchingSchemeDetail && !scheme.fetching && scheme.loaded) {
      const cover = scheme?.detail?.banner?.url;
      updateMetaInfoAction({
        info: {
          url: window.location.href,
          title: scheme.detail?.name || '',
          description: scheme.detail?.description || '',
          keyword:
            'máy rửa mặt, halio, mỹ phẩm, dưỡng da, trị mụn, skincare, makeup, lustre, Lixibox GWP, GWP vietnam, gift with purchase, quà tặng kèm, GWP là gì?',
          image: cover
        }
      });
      gatewayTrackViewedGwpScheme({ scheme: scheme?.detail });
    }
  }, [scheme.fetching]);

  useEffect(() => {
    fetchDataHotDealAction({
      perPage: HOT_DEAL_FETCH_PER_PAGE,
      page: HOT_DEAL_FETCH_PAGE
    });
    fetchProductByCategoryAction(BEST_SELLING_BOXES_FETCH_QUERY);
    fetchGwpSchemeExclusiveBoxesAction({ schemeSlug: gwpSlug });
  }, [gwpSlug]);

  const shouldShowProductLists = !scheme?.detail?.discount_code?.is_applicable_to_limited_product_set;
  const exclusiveBoxes = gwpSchemeExclusiveBoxes.bySchemeSlug[gwpSlug];

  const View = isMobileVersion() ? MobileView : DesktopView;
  const onModalClose = () => {
    updateModalState({ isOpen: false });
  };

  return (
    <>
      <View
        {...{
          scheme,
          descriptionText,
          countdown,
          shouldShowCountdown,
          countdownText,
          isExpired,
          shouldShowProductLists,
          hotDeals: hotDeals.index,
          isHotDealsLoading: hotDeals.fetching,
          isHotDealsLoaded: hotDeals.loaded,
          bestSellingBoxes: productByCategory[bestSellingBoxesQueryHash]?.boxes || [],
          isBestSellingBoxesLoading: fetchProductByCategory.fetching,
          isBestSellingBoxesLoaded: fetchProductByCategory.loaded,
          bestSellingBoxesPath: generatePath(ROUTING_PRODUCT_CATEGORY, {
            categoryFilter: BEST_SELLING_BOXES_FETCH_QUERY.idCategory
          }),
          isExclusiveBoxesLoading: exclusiveBoxes?.fetching,
          isExclusiveBoxesLoaded: exclusiveBoxes?.loaded,
          exclusiveBoxes: exclusiveBoxes?.index || [],
          onBoxClick: ({ box }) => {
            box?.is_bundle
              ? setModalState({
                  isOpen: true,
                  title: box.name || '',
                  box
                })
              : history.push(generatePath(ROUTING_PRODUCT_DETAIL, { idProduct: box?.slug || '' }));
          },
          onCopy: (code) => copyTextToClipboard(code)
        }}
      />
      <GeneralModal
        {...{
          isOpen: modalState.isOpen,
          title: 'Chi tiết bộ quà tặng',
          leftTitle: '',
          rightIcon: 'close',
          fullHeight: true,
          classes: { header: styles.header, clientArea: classNames(styles.clientArea, 'withScrollbar') },
          className: classNames(styles.comboDetailModal, isMobileVersion() || styles.comboDetailModalDesktop),
          onRightActionClick: () => onModalClose(),
          onRequestClose: () => onModalClose()
        }}
      >
        <GwpComboDetail
          {...{
            box: modalState.box,
            isOpen: modalState.isOpen
          }}
        />
      </GeneralModal>
    </>
  );
};

export type { ViewProps };
export default GwpDetail;
