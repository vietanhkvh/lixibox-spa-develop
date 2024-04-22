import { useEffect } from 'react';
import { GetGwpSchemeDetailActionParams } from 'flows/gwp/action';
import { GwpLoadedScheme, GwpState } from 'flows/gwp/types';
import { ShopState } from 'flows/shop/types';
import { GiftBox as GiftBoxType } from 'types/api/gwp';
import { isMobileVersion } from 'utils/responsive';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';

interface ViewProps {
  scheme: GwpLoadedScheme;
  box: GiftBoxType;
  bundledItems: any;
}
interface GwpComboDetailProps {
  box: GiftBoxType;
  isOpen: boolean;
  gwpStore: GwpState;
  shopStore: ShopState;
  fetchBundledItemsAction: (data: any) => void;
  getGwpSchemeDetailAction: (data: GetGwpSchemeDetailActionParams) => void;
  updateUrlParamsAction: ({ mobileappWebviewStatus }: { mobileappWebviewStatus: boolean }) => void;
}
const GwpComboDetail = ({
  box,
  isOpen,
  gwpStore: { loadedScheme: scheme },
  shopStore: { bundledItems },
  fetchBundledItemsAction
}: GwpComboDetailProps) => {
  useEffect(() => {
    if (isOpen) {
      fetchBundledItemsAction({ boxId: box?.slug || '' });
    }
  }, [isOpen]);

  const View = isMobileVersion() ? MobileView : DesktopView;
  return (
    <View
      {...{
        scheme,
        box,
        bundledItems
      }}
    />
  );
};

export type { ViewProps };
export default GwpComboDetail;
