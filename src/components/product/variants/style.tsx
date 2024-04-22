import { combineStyle } from '../../../utils/responsive';
import * as VARIABLE from '../../../style/variable';

export default {
  container: combineStyle({
    MOBILE: [],

    DESKTOP: [{}] as any,

    GENERAL: [{}] as any
  }),

  variantsHeading: combineStyle({
    MOBILE: [{ fontWeight: VARIABLE.fontSemiBold }] as any,

    DESKTOP: [{ fontWeight: VARIABLE.fontRegular }] as any,

    GENERAL: [
      {
        fontSize: 14,
        color: VARIABLE.color20,
        marginBottom: 10
      }
    ] as any
  }),

  variantsHeadingValue: {
    fontWeight: VARIABLE.fontLight,
    fontSize: 14,
    color: VARIABLE.color8A,
    padding: '0 4px'
  }
} as any;
