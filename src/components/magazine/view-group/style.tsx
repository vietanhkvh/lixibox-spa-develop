import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  icon: {
    width: 16,
    height: 16,
    color: VARIABLE.color75,
    cursor: 'pointer',

    inner: {
      width: 12,
      height: 12
    }
  },

  infoStatistical: {
    display: VARIABLE.display.flex,
    fontSize: 12,
    lineHeight: '16px',
    verticalAlign: 'top',

    spanWrap: {
      display: VARIABLE.display.flex,
      color: VARIABLE.colorBlack06,
      paddingLeft: 10,

      span: combineStyle({
        MOBILE: [{ fontSize: 13 }] as any,
        DESKTOP: [{ fontSize: 14 }] as any,
        GENERAL: [{ display: VARIABLE.display.inlineBlock, marginLeft: 5 }] as any
      })
    }
  }
} as any;
