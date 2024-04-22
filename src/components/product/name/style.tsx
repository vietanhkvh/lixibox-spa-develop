import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [
      {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 2,
        paddingBottom: 5,
        fontSize: 16,
        lineHeight: '22px',
        fontWeight: VARIABLE.fontRegular,
        color: VARIABLE.color20
      }
    ] as any,

    DESKTOP: [
      {
        fontSize: 20,
        lineHeight: '28px',
        fontWeight: VARIABLE.fontSemiBold,
        paddingTop: 2,
        paddingRight: 0,
        paddingBottom: 7,
        paddingLeft: 0,
        textAlign: 'left' as const
      }
    ] as any,

    GENERAL: [
      {
        display: 'block',
        width: '100%',

        textTransform: `capitalize`,
        color: VARIABLE.colorBlack,
        textAlign: 'left' as const
      }
    ] as any
  })
} as any;
