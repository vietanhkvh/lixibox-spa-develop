import { combineStyle } from '../../../utils/responsive';
import * as VARIABLE from '../../../style/variable';

export default {
  container: combineStyle({
    MOBILE: [
      {
        padding: 10
      }
    ] as any,

    DESKTOP: [
      {
        paddingTop: 50,
        paddingBottom: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    ] as any,

    GENERAL: [{}] as any
  }),

  text: combineStyle({
    MOBILE: [
      {
        fontSize: 18,
        lineHeight: '40px'
      }
    ] as any,

    DESKTOP: [
      {
        fontSize: 22
      }
    ] as any,

    GENERAL: [
      {
        fontWeight: VARIABLE.fontSemiBold,
        maxWidth: '60%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    ] as any
  })
} as any;
