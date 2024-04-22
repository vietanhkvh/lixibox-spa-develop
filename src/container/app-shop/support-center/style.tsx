// import * as VARIABLE from '../../../../style/variable';
import { combineStyle } from '../../../utils/responsive';
export default {
  container: combineStyle({
    MOBILE: [{}] as any,

    DESKTOP: [{ paddingTop: 50 }] as any,

    GENERAL: [
      {
        position: 'relative',
        width: '100vw'
      }
    ] as any
  }),

  mainBlock: {},

  frame: combineStyle({
    MOBILE: [
      {
        height: 'calc(100vh - 90px)',
        borderTop: `1px solid #eee`
      }
    ] as any,

    DESKTOP: [
      {
        height: 'calc(100vh - 110px)'
      }
    ] as any,

    GENERAL: [
      {
        width: '100%',
        overflowX: 'hidden',
        overflowY: 'auto'
      }
    ] as any
  })
} as any;
