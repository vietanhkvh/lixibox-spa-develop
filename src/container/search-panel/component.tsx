import { useEffect, useState } from 'react';
import { isMobileVersion } from 'utils/responsive';
import { usePrevious } from 'utils/hook';
import { scrollElement } from 'utils/scroll';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';
import { PropsFromRedux } from './store';

interface SearchPanelProps extends PropsFromRedux {
  classes?: { container?: string };
}
interface ViewProps {
  isPrivateMode: boolean;
  isPanelVisible: boolean;
  setIsPanelVisible: (isPanelVisible: boolean) => void;
  classes?: { container?: string };
  onClick?: () => void;
}
const SearchPanel = ({ appStore: { isPrivateMode }, classes }: SearchPanelProps) => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const wasPanelVisible = usePrevious(isPanelVisible);
  useEffect(() => {
    if (wasPanelVisible !== isPanelVisible) {
      try {
        const shopAppElement: any = document.getElementById('shop-app');
        if (!!isPanelVisible) {
          const isFixScroll = !!shopAppElement && 'fixed' !== shopAppElement.style.position;
          if (isFixScroll) {
            const scrollYPages = window.scrollY;
            shopAppElement.style.top = `-${scrollYPages}px`;
            shopAppElement.style.width = '100%';
            shopAppElement.style.position = 'fixed';
          }
        } else {
          if (!!shopAppElement) {
            const scrollYPages = Math.abs(parseInt(shopAppElement.style.top));
            shopAppElement.setAttribute('style', '');
            !!scrollYPages && scrollElement({ x: 0, y: scrollYPages });
          }
        }
      } catch (e) {}
    }
  }, [isPanelVisible, wasPanelVisible]);

  const View = isMobileVersion() ? MobileView : DesktopView;

  return (
    <View
      {...{
        isPrivateMode,
        classes,
        isPanelVisible,
        setIsPanelVisible,
        onClick: () => {
          setIsPanelVisible(true);
        }
      }}
    />
  );
};

export type { ViewProps };
export default SearchPanel;
