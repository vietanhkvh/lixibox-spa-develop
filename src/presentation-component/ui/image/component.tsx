import { forwardRef, useEffect, useState } from 'react';
import { getExtensionFromPath, replacePathExtension } from 'utils/path';
import { isPathConvertibleToWebP } from 'utils/image';
import { generateTestId } from 'utils/test-utils';

/**
 * Image component adds support for WebP format with fallback support
 * Image component is intended to be fully compatible with the API of `img` element.
 * No API change should be made.
 *
 * TODO: Update component so that it displays a warning when `alt` is not provided.
 */

interface ImageProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  dataTestId?: string;
}
const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const isWebPSupported = localStorage.getItem('isWebPSupported') === 'true';
  const { alt, src: _src, onError, dataTestId, ...otherProps } = props;
  const [src, setSrc] = useState(
    isWebPSupported && _src && _src.length > 0 && isPathConvertibleToWebP(_src || '')
      ? replacePathExtension(_src || '', 'webp')
      : _src
  );
  useEffect(() => {
    setSrc(
      isWebPSupported && _src && _src.length > 0 && isPathConvertibleToWebP(_src || '')
        ? replacePathExtension(_src || '', 'webp')
        : _src
    );
  }, [_src]);

  return (
    <img
      {...generateTestId({ name: dataTestId })}
      alt={alt}
      src={typeof src === 'string' ? src : undefined}
      onError={(e) => {
        if (getExtensionFromPath(src || '') === 'webp') {
          setSrc(_src);
        }

        onError?.(e);
      }}
      ref={ref}
      {...otherProps}
    />
  );
});

export type { ImageProps };
export default Image;
