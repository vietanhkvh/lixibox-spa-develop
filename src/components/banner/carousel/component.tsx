import { memo, useEffect, useState } from 'react';

import { useInterval } from '../../../utils/hook';
import renderView from './view';

interface BannerFeatureProps {
  list?: Array<any>;
  isShowIndicator?: boolean;
  isGreyBg?: boolean;
}
const BannerFeature = ({ list, isShowIndicator, isGreyBg }: BannerFeatureProps) => {
  const [xDown, setXDown] = useState<any>(null);
  const [yDown, setYDown] = useState<any>(null);
  const [autoSlideTimer, setAutoSlideTimer] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState<any>(0);

  useInterval(
    () => {
      handleswipeLeft();
    },
    3000,
    (id) => setAutoSlideTimer(id)
  );
  useEffect(() => () => clearInterval(autoSlideTimer), []);

  const handleTouchStart = (e) => {
    setXDown(e.touches[0].clientX);
    setYDown(e.touches[0].clientY);
  };
  const handleTouchMove = (e) => {
    if (!xDown || !yDown) return;

    const xUp = e.touches[0].clientX;
    const yUp = e.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff) && xDiff > 0) {
      handleswipeLeft();
    }

    if (Math.abs(xDiff) > Math.abs(yDiff) && xDiff < 0) {
      handleswipeRight();
    }

    setXDown(null);
    setYDown(null);

    if (Math.abs(xDiff) > 5) {
      e.preventDefault();
      e.returnValue = false;
      return false;
    }
  };
  const handleswipeLeft = () => {
    if (!list || !list.length) return;
    const newIndex = selectedIndex >= list.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
  };
  const handleswipeRight = () => {
    if (!list || !list.length) return;
    const newIndex = 0 === selectedIndex ? list.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
  };
  const handlStopAutoSlide = () => clearInterval(autoSlideTimer);

  return renderView({
    selectedIndex,
    list,
    isShowIndicator,
    isGreyBg,
    handleTouchStart,
    handleTouchMove,
    handlStopAutoSlide
  });
};
BannerFeature.defaultProps = {
  list: [],
  isShowIndicator: false,
  isGreyBg: false
};

export default memo(BannerFeature);
