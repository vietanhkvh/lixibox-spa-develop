import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [
      {
        flexDirection: 'column',
        padding: '20px 16px 20px',
        borderTop: `1px solid ${VARIABLE.colorF0}`,
        borderBottom: `1px solid ${VARIABLE.colorF0}`,
        flex: 1
      }
    ] as any,
    DESKTOP: [{ padding: '20px 0 30px', background: VARIABLE.colorWhite, flexDirection: 'column' }] as any,
    GENERAL: [
      {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    ] as any
  }),

  header: combineStyle({
    MOBILE: [{ width: '100%', justifyContent: 'space-between', alignItems: 'flex-start' }] as any,
    DESKTOP: [{ flexDirection: 'column', alignItems: 'center' }] as any,
    GENERAL: [
      {
        display: 'flex',
        marginBottom: 16
      }
    ] as any
  }),

  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: '18px',
    textAlign: 'left' as const,
    color: VARIABLE.color2E,
    paddingRight: 20,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,

    large: {
      fontSize: 26,
      lineHeight: '30px'
    }
  },

  viewmore: combineStyle({
    MOBILE: [{ lineHeight: '22px', fontSize: 12, fontWeight: 500, color: VARIABLE.colorBA }] as any,
    DESKTOP: [{ marginTop: 10, lineHeight: '30px', fontSize: 14 }] as any,
    GENERAL: [{ whiteSpace: 'nowrap' }] as any
  })
} as any;
