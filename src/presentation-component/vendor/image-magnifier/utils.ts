import { useEffect, useRef, useState } from 'react';
import { Coordinate, Region } from './model';

interface GetBaseImageZoomIndicatorSizeParams {
  baseImageBox: DOMRect | undefined;
  zoomedImageViewportRegion: Region;
  magnificationFactor: number;
}
const getBaseImageZoomIndicatorSize = ({
  baseImageBox,
  zoomedImageViewportRegion,
  magnificationFactor
}: GetBaseImageZoomIndicatorSizeParams): Partial<Region> => {
  if (!baseImageBox) return {};
  const magnifiedViewAspectRatio = zoomedImageViewportRegion.width / zoomedImageViewportRegion.height;

  return {
    x: baseImageBox.left,
    y: baseImageBox.top,
    width:
      baseImageBox.width <= baseImageBox.height
        ? baseImageBox.width / magnificationFactor
        : (baseImageBox.height / magnificationFactor) * magnifiedViewAspectRatio,
    height:
      baseImageBox.height <= baseImageBox.width
        ? baseImageBox.height / magnificationFactor
        : (baseImageBox.width / magnificationFactor) * magnifiedViewAspectRatio
  };
};

interface GetBaseImageZoomIndicatorPosition {
  baseImageBox: DOMRect | undefined;
  baseImageZoomIndicatorRegion: Region;
  baseImageCursorCoordinate: Coordinate;
  scrollY: number;
}
const getBaseImageZoomIndicatorPosition = ({
  baseImageBox,
  baseImageZoomIndicatorRegion,
  baseImageCursorCoordinate,
  scrollY
}: GetBaseImageZoomIndicatorPosition): Partial<Region> => {
  if (!baseImageBox) return {};

  const magnifierPointerLimiterMargin = {
    x: Math.round(baseImageZoomIndicatorRegion.width / 2),
    y: Math.round(baseImageZoomIndicatorRegion.height / 2)
  };
  const magnifierPointerLimiterBox = {
    top: baseImageBox.top + magnifierPointerLimiterMargin.y,
    left: baseImageBox.left + magnifierPointerLimiterMargin.x,
    bottom: baseImageBox.bottom - magnifierPointerLimiterMargin.y,
    right: baseImageBox.right - magnifierPointerLimiterMargin.x
  };

  let adjustedX = 0;
  let adjustedY = 0;

  if (baseImageCursorCoordinate.x < magnifierPointerLimiterBox.left) {
    adjustedX = baseImageBox.left;
  } else if (baseImageCursorCoordinate.x > magnifierPointerLimiterBox.right) {
    adjustedX = baseImageBox.right - baseImageZoomIndicatorRegion.width;
  } else {
    adjustedX = baseImageCursorCoordinate.x - magnifierPointerLimiterMargin.x;
  }

  if (baseImageCursorCoordinate.y < magnifierPointerLimiterBox.top) {
    adjustedY = baseImageBox.top;
  } else if (baseImageCursorCoordinate.y > magnifierPointerLimiterBox.bottom) {
    adjustedY = baseImageBox.bottom - baseImageZoomIndicatorRegion.height;
  } else {
    adjustedY = baseImageCursorCoordinate.y - magnifierPointerLimiterMargin.y;
  }

  return {
    x: adjustedX,
    y: adjustedY + scrollY
  };
};

interface GetZoomedImageSizeParams {
  baseImageBox: DOMRect | undefined;
  baseImageZoomIndicatorRegion: Region;
  zoomedImageViewportRegion: Region;
}
const getZoomedImageSize = ({
  baseImageBox,
  baseImageZoomIndicatorRegion,
  zoomedImageViewportRegion
}: GetZoomedImageSizeParams): Partial<Region> => {
  if (!baseImageBox) return {};

  const zoomedImageViewportWidthMagnificationFactor =
    zoomedImageViewportRegion.width / baseImageZoomIndicatorRegion.width;
  const zoomedImageViewportHeightMagnificationFactor =
    zoomedImageViewportRegion.height / baseImageZoomIndicatorRegion.height;
  const zoomedImageWidth = baseImageBox?.width * zoomedImageViewportWidthMagnificationFactor;
  const zoomedImageHeight = baseImageBox?.height * zoomedImageViewportHeightMagnificationFactor;

  return {
    width: zoomedImageWidth,
    height: zoomedImageHeight
  };
};

interface GetZoomedImageVisibleRegionOffsetParams {
  baseImageBox: DOMRect | undefined;
  baseImageZoomIndicatorRegion: Region;
  zoomedImageViewportRegion: Region;
  zoomedImageVisibleRegion: Region;
  scrollY: number;
}
const getZoomedImageVisibleRegionOffset = ({
  baseImageBox,
  baseImageZoomIndicatorRegion,
  zoomedImageViewportRegion,
  zoomedImageVisibleRegion,
  scrollY
}: GetZoomedImageVisibleRegionOffsetParams): Partial<Region> => {
  if (!baseImageBox) return {};

  const baseImageTraversedPixelsX = baseImageZoomIndicatorRegion.x - baseImageBox.x;
  const baseImageTraversedPixelsY = baseImageZoomIndicatorRegion.y - (baseImageBox.y + scrollY);
  const baseImageTraversablePixelsX = baseImageBox.width - baseImageZoomIndicatorRegion.width;
  const baseImageTraversablePixelsY = baseImageBox.height - baseImageZoomIndicatorRegion.height;
  const baseImageTraversedPercentageX = baseImageTraversedPixelsX / baseImageTraversablePixelsX;
  const baseImageTraversedPercentageY = baseImageTraversedPixelsY / baseImageTraversablePixelsY;

  const zoomedImageTraversablePixelsX = zoomedImageVisibleRegion.width - zoomedImageViewportRegion.width;
  const zoomedImageTraversablePixelsY = zoomedImageVisibleRegion.height - zoomedImageViewportRegion.height;
  const zoomedImageTraversedPixelsX = baseImageTraversedPercentageX * zoomedImageTraversablePixelsX;
  const zoomedImageTraversedPixelsY = baseImageTraversedPercentageY * zoomedImageTraversablePixelsY;

  return {
    x: zoomedImageTraversedPixelsX,
    y: zoomedImageTraversedPixelsY
  };
};

interface UseMagnifiedViewProcessorParams {
  magnificationFactor?: number;
  isHidden?: boolean;
}
export const useMagnifiedViewProcessor = (params?: UseMagnifiedViewProcessorParams) => {
  const defaultParams = { magnificationFactor: 2.0, isHidden: false };
  const { magnificationFactor, isHidden } = Object.assign({}, defaultParams, params);

  const baseImageRef = useRef<HTMLImageElement>(null);
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [baseImageZoomIndicatorRegion, setBaseImageZoomIndicatorRegion] = useState<Region>({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  const [baseImageCursorCoordinate, setBaseImageCursorCoordinate] = useState<Coordinate>({ x: 0, y: 0 });
  const [zoomedImageViewportRegion, setZoomedImageViewportRegion] = useState<Region>({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  // x, y indicates offset from the top-left corner, where width and height are the size of the zoomed image
  const [zoomedImageVisibleRegion, setZoomedImageVisibleRegion] = useState<Region>({ x: 0, y: 0, width: 0, height: 0 });

  // Convenience updaters
  const updateBaseImageZoomIndicatorRegion = (region: Partial<Region>) =>
    setBaseImageZoomIndicatorRegion((prev) => ({ ...prev, ...region }));
  const updateBaseImageCursorCoordinate = ({ x, y }: Coordinate) => {
    const normalizedX = Math.max(x, 0);
    const normalizedY = Math.max(y, 0);
    setBaseImageCursorCoordinate({ x: normalizedX, y: normalizedY });
  };
  const updateZoomedImageViewportRegion = (region: Partial<Region>) => {
    setZoomedImageViewportRegion((prev) => ({ ...prev, ...region }));
  };
  const updateZoomedImageVisibleRegion = (region: Partial<Region>) =>
    setZoomedImageVisibleRegion((prev) => ({ ...prev, ...region }));

  // Processors
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const baseImageBox = baseImageRef.current?.getBoundingClientRect();
    updateBaseImageZoomIndicatorRegion(
      getBaseImageZoomIndicatorSize({ baseImageBox, zoomedImageViewportRegion, magnificationFactor })
    );
  }, [
    baseImageRef.current,
    zoomedImageViewportRegion.width,
    zoomedImageViewportRegion.height,
    magnificationFactor,
    isHidden
  ]);

  useEffect(() => {
    const baseImageBox = baseImageRef.current?.getBoundingClientRect();
    updateBaseImageZoomIndicatorRegion(
      getBaseImageZoomIndicatorPosition({
        baseImageBox,
        baseImageZoomIndicatorRegion,
        baseImageCursorCoordinate,
        scrollY
      })
    );
  }, [
    baseImageRef.current,
    baseImageZoomIndicatorRegion.width,
    baseImageZoomIndicatorRegion.height,
    baseImageCursorCoordinate.x,
    baseImageCursorCoordinate.y,
    isHidden
  ]);

  useEffect(() => {
    const baseImageBox = baseImageRef.current?.getBoundingClientRect();
    updateZoomedImageVisibleRegion(
      getZoomedImageSize({ baseImageBox, baseImageZoomIndicatorRegion, zoomedImageViewportRegion })
    );
  }, [
    baseImageRef.current,
    baseImageZoomIndicatorRegion.width,
    baseImageZoomIndicatorRegion.height,
    zoomedImageViewportRegion.width,
    zoomedImageViewportRegion.height,
    isHidden
  ]);

  useEffect(() => {
    const baseImageBox = baseImageRef.current?.getBoundingClientRect();
    updateZoomedImageVisibleRegion(
      getZoomedImageVisibleRegionOffset({
        baseImageBox,
        baseImageZoomIndicatorRegion,
        zoomedImageViewportRegion,
        zoomedImageVisibleRegion,
        scrollY
      })
    );
  }, [
    baseImageRef.current,
    baseImageZoomIndicatorRegion.width,
    baseImageZoomIndicatorRegion.height,
    baseImageZoomIndicatorRegion.x,
    baseImageZoomIndicatorRegion.y,
    zoomedImageViewportRegion.width,
    zoomedImageViewportRegion.height,
    zoomedImageVisibleRegion.width,
    zoomedImageVisibleRegion.height,
    scrollY,
    isHidden
  ]);

  return [
    {
      baseImageZoomIndicatorRegion,
      zoomedImageViewportRegion,
      zoomedImageVisibleRegion,
      scrollY
    },
    {
      baseImageRef,
      updateBaseImageCursorCoordinate,
      updateZoomedImageViewportRegion
    }
  ] as const;
};
