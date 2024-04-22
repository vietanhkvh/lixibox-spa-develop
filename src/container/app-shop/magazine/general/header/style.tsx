import * as VARIABLE from '../../../../../style/variable';
import { combineStyle } from '../../../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [{}] as any,
    DESKTOP: [{ marginBottom: 160 }] as any,
    GENERAL: [
      {
        display: 'block',
        height: 50,
        maxHeight: 50,
        zIndex: VARIABLE.zIndex9
      }
    ] as any
  }),

  offsetFixHeader: {
    height: 110,
    width: '100%'
  }
} as any;
