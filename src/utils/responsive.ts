import UAParser from 'ua-parser-js';
import * as VARIABLE from '../style/variable';

export const getDeviceVersion = () => (isMobileVersion() ? 'MOBILE' : 'DESKTOP');

export const isMobileVersion = () => window.innerWidth < VARIABLE.breakPoint960 || isMobileDevice();

export const isMobileDevice = () => {
  if (window.innerWidth >= 1024) return false;

  try {
    return ['mobile', 'tablet'].includes(new UAParser().getDevice().type);
  } catch {
    return false;
  }
};

export const isSafari = () => {
  try {
    return new UAParser().getBrowser().name.toLowerCase().includes('safari');
  } catch {
    return false;
  }
};

export const isIOS = () => {
  try {
    return new UAParser().getOS().name.toLowerCase().includes('ios');
  } catch {
    return false;
  }
};

interface ICombineStyle {
  MOBILE: Array<{ [key: string]: any }>;
  DESKTOP: Array<{ [key: string]: any }>;
  GENERAL: Array<{ [key: string]: any }>;
}

export const mergeStyle = (firstStyle, ...restStyle) => {
  const combinedFirstStyle = Array.isArray(firstStyle) ? Object.assign({}, ...firstStyle) : firstStyle;
  const combinedRestStyle = restStyle.map((rest) => (Array.isArray(rest) ? Object.assign({}, ...rest) : rest));
  return Object.assign({}, combinedFirstStyle, ...combinedRestStyle);
};

export const combineStyle = ({ MOBILE, DESKTOP, GENERAL }: ICombineStyle): { [key: string]: any } => {
  const switchStyle = {
    MOBILE: () => Object.assign({}, ...MOBILE),
    DESKTOP: () => Object.assign({}, ...DESKTOP)
  };

  const target = getDeviceVersion();
  return Object.assign({}, switchStyle[target](), ...GENERAL);
};

/**
() => combineStyle({
  MOBILE: [],

  DESKTOP: [],

  GENERAL: []
})
*/
