import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [{}] as any,

    DESKTOP: [{}] as any,

    GENERAL: [{ width: '100%', position: 'relative', background: VARIABLE.colorWhite }] as any
  }),

  image: {
    display: 'block',
    width: '100%',
    height: 'auto'
  }
} as any;
