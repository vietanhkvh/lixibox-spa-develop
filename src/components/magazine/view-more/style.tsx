import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  boxViewMore: {
    container: combineStyle({
      MOBILE: [{ textAlign: 'center' as const, marginBottom: 20 }] as any,
      DESKTOP: [{ textAlign: 'right' as const, marginBottom: 50 }] as any,
      GENERAL: [{ width: '100%' }] as any
    }),

    btnViewMore: combineStyle({
      MOBILE: [
        {
          width: 120,
          margin: 'auto',
          fontSize: 14,
          color: VARIABLE.color97,
          padding: '0 13px',
          borderRadius: 15,
          border: '1px solid #979797',
          justifyContent: 'center'
        }
      ] as any,

      DESKTOP: [
        {
          width: 'auto',
          margin: 0,
          fontSize: 16,
          color: VARIABLE.colorBlack,
          padding: '0 20px',
          borderRadius: 0,
          border: 'none',
          justifyContent: 'flex-end'
        }
      ] as any,

      GENERAL: [
        {
          display: VARIABLE.display.flex,
          alignItems: 'center',
          lineHeight: '30px',
          height: 30,
          fontWeight: 900,
          cursor: 'pointer'
        }
      ] as any
    }),

    iconAngleRight: {
      container: combineStyle({
        MOBILE: [{ width: 4 }] as any,
        DESKTOP: [{ width: 8 }] as any,
        GENERAL: [{ marginLeft: 5, color: VARIABLE.colorBlack09 }] as any
      }),

      inner: {
        width: 8,
        height: 10
      }
    }
  }
} as any;
