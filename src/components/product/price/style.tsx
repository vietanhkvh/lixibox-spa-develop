import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [
      {
        display: VARIABLE.display.flex,
        flexDirection: `column`,
        justifyContent: `center`
      }
    ] as any,

    DESKTOP: [
      {
        display: VARIABLE.display.flex,
        alignItems: 'center'
      }
    ] as any,

    GENERAL: [
      {
        display: VARIABLE.display.flex,
        width: '100%'
      }
    ] as any
  }),

  current: {
    fontSize: 32,
    fontWeight: VARIABLE.fontSemiBold,
    lineHeight: '32px',
    color: VARIABLE.color20,

    display: 'inline-block',
    marginRight: 20,

    mobile: {
      display: 'block',
      marginRight: 5,
      fontSize: 28,

      lineHeight: '30px',
      fontWeight: VARIABLE.fontBold
    }
  },

  old: {
    fontSize: 14,
    color: VARIABLE.color4D,
    textDecoration: 'line-through',
    display: 'inline-block',
    lineHeight: '32px',

    mobile: {
      fontSize: 12,
      lineHeight: '20px',
      display: 'block'
    }
  }
} as any;
