import { Picture } from 'types/generic';
import { getExtensionFromPath } from './path';

export const preLoadImage = (source: Array<string> | string) => {
  const imageList = 'string' === typeof source ? [source] : source;

  return imageList.map((image) => {
    let img = new Image();
    img.src = image;
    return img;
  });
};

export const isPathConvertibleToWebP = (path: string): boolean => {
  const extension = getExtensionFromPath(path).toLocaleLowerCase();
  return ['jpg', 'jpeg', 'png'].includes(extension);
};

// checkWebPFeature:
//   'feature' can be one of 'lossy', 'lossless', 'alpha' or 'animation'.
//   'callback(feature, result)' will be passed back the detection result (in an asynchronous way!)
// Src.: https://developers.google.com/speed/webp/faq#in_your_own_javascript
type WebPFeature = 'lossy' | 'lossless' | 'alpha' | 'animation';
export function checkWebPFeature(feature: WebPFeature, callback: (feature: WebPFeature, result: boolean) => void) {
  var kTestImages = {
    lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
    lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
    alpha:
      'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
    animation:
      'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA'
  };
  var img = new Image();
  img.onload = function () {
    var result = img.width > 0 && img.height > 0;
    callback(feature, result);
  };
  img.onerror = function () {
    callback(feature, false);
  };
  img.src = 'data:image/webp;base64,' + kTestImages[feature];
}

export function checkWebPSupport() {
  checkWebPFeature('lossy', (_, isSupported) => {
    isSupported && localStorage.setItem('isWebPSupported', String(isSupported));
  });

  checkWebPFeature('lossless', (_, isSupported) => {
    isSupported && localStorage.setItem('isWebPSupported', String(isSupported));
  });

  checkWebPFeature('alpha', (_, isSupported) => {
    isSupported && localStorage.setItem('isWebPSupported', String(isSupported));
  });

  checkWebPFeature('animation', (_, isSupported) => {
    isSupported && localStorage.setItem('isWebPSupported', String(isSupported));
  });
}

export const getThumbImage = (image: Picture): string => {
  return image?.thumb_url && !image.thumb_url.includes('/missing')
    ? image?.thumb_url
    : image?.square_url && !image.square_url.includes('/missing')
    ? image.square_url
    : '';
};
