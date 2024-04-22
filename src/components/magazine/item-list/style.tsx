import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [{ padding: 16 }] as any,

    DESKTOP: [{ paddingTop: 50, paddingLeft: 0, paddingRight: 0 }] as any,

    GENERAL: [
      {
        width: '100%',
        display: VARIABLE.display.flex,
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }
    ] as any
  }),

  searchList: {
    marginBottom: 50
  }
} as any;
