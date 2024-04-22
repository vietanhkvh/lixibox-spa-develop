/**
 * NOTE: Third party module
 * Copied over instead of installing as a dependency in order to avoid unexpected unavailability
 * Source: https://github.com/atshakil/image-magnifier
 */

import React, { Fragment, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { useMagnifiedViewProcessor } from './utils';
import { Region, Size } from './model';
import styles from './style.module.scss';

interface SetMagnifiedViewRegionParams {
  /**
   * Auto updating window size
   */
  windowSize: Size;
  /**
   * Reference to the base image DOM element's bounding client rect
   */
  baseImageBox: DOMRect;
  scrollY: number;
}
interface ImageMagnifierProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  imageElement?: 'img' | any;
  magnifiedViewRegion: (params: SetMagnifiedViewRegionParams) => Region;
  isHidden?: boolean;
  classes?: {
    baseImage?: string;
    magnifiedViewContainer?: string;
    magnifiedViewInnerContainer?: string;
    magnifiedView?: string;
    magnifier?: string;
  };
}
/**
 * # ImageMagnifier
 *
 * A superset of the native HTML `img` component that provides a magnified view of the image when hovered.
 *
 * ## Features
 * - Provides a magnified view of the image when hovered
 * - Since it is a superset of the `img` component, all the props of the `img` component are supported and
 *   therefore this component can be plugged in as a drop-in replacement for the `img` component.
 *
 * ## Current Limitations
 * - All the props are forwared to the base image except for the `ref`
 */
const ImageMagnifier = ({
  // Self props
  imageElement: ImageElement,
  magnifiedViewRegion,
  isHidden,
  classes,

  // img props
  src,
  className,
  onMouseMove,
  onMouseLeave,
  ...otherProps
}: ImageMagnifierProps) => {
  const [
    { baseImageZoomIndicatorRegion, zoomedImageVisibleRegion, zoomedImageViewportRegion, scrollY },
    { baseImageRef, updateBaseImageCursorCoordinate, updateZoomedImageViewportRegion }
  ] = useMagnifiedViewProcessor({ isHidden });

  const magnifiedImageRef: any = useRef<HTMLImageElement>(null);
  const [isMagnifierVisible, setIsMagnifierVisible] = useState(false);

  // Window resize handler
  const [windowSize, setWindowSize] = useState<Size>({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const onResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!baseImageRef.current || isHidden) return;
    const baseImageBox: DOMRect = baseImageRef.current?.getBoundingClientRect();
    updateZoomedImageViewportRegion(magnifiedViewRegion({ windowSize, baseImageBox, scrollY }));
  }, [src, baseImageRef.current, windowSize, scrollY, isHidden]);

  return (
    <Fragment>
      <ImageElement
        src={src}
        className={classNames(styles.baseImage, classes?.baseImage, className)}
        onMouseMove={(event: React.MouseEvent<HTMLImageElement>) => {
          updateBaseImageCursorCoordinate({ x: event.clientX, y: event.clientY });
          setIsMagnifierVisible(true);
          onMouseMove?.(event);
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLImageElement>) => {
          setIsMagnifierVisible(false);
          onMouseLeave?.(e);
        }}
        ref={baseImageRef as any}
        {...otherProps}
      />
      {!isHidden &&
        createPortal(
          <>
            <div
              className={classNames(
                styles.magnifiedViewContainer,
                classes?.magnifiedViewContainer,
                !isMagnifierVisible && styles.invisible
              )}
              style={{
                left: zoomedImageViewportRegion.x,
                top: zoomedImageViewportRegion.y,
                width: zoomedImageViewportRegion.width,
                height: zoomedImageViewportRegion.height
              }}
            >
              <div className={classNames(styles.magnifiedViewInnerContainer, classes?.magnifiedViewInnerContainer)}>
                <ImageElement
                  src={src}
                  className={classNames(styles.magnifiedView, classes?.magnifiedView)}
                  style={Object.assign(
                    {},
                    {
                      width: zoomedImageVisibleRegion.width,
                      height: zoomedImageVisibleRegion.height,
                      marginLeft: -zoomedImageVisibleRegion.x,
                      marginTop: -zoomedImageVisibleRegion.y
                    }
                  )}
                  ref={magnifiedImageRef}
                />
              </div>
            </div>
            {isMagnifierVisible && !!baseImageZoomIndicatorRegion.width && !!baseImageZoomIndicatorRegion.height && (
              <div
                className={classNames(styles.magnifier, classes?.magnifier)}
                style={{
                  left: baseImageZoomIndicatorRegion.x,
                  top: baseImageZoomIndicatorRegion.y,
                  width: baseImageZoomIndicatorRegion.width,
                  height: baseImageZoomIndicatorRegion.height
                }}
              />
            )}
          </>,
          document.body
        )}
    </Fragment>
  );
};
ImageMagnifier.defaultProps = {
  imageElement: 'img'
};

export default ImageMagnifier;
