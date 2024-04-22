// import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [{}] as any,
    DESKTOP: [{}] as any,
    GENERAL: [{}] as any
  }),

  panel: combineStyle({
    MOBILE: [{}] as any,
    DESKTOP: [
      {
        marginTop: 30,
        marginBottom: 30,
        borderRadius: 16,
        overflow: 'hidden'
      }
    ] as any,
    GENERAL: [{}] as any
  }),

  storeMap: combineStyle({
    MOBILE: [{ width: '100%', height: 'calc(var(--wh) - 50px)' }] as any,
    DESKTOP: [
      {
        height: 650
      }
    ] as any,
    GENERAL: [{}] as any
  })
} as any;
