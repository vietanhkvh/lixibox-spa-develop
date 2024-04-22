import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [{ padding: '15px 12px 10px', borderRadius: '15px 15px 0 0' }] as any,

    DESKTOP: [{ padding: '15px 12px 10px' }] as any,

    GENERAL: [
      {
        position: 'relative',
        background: VARIABLE.colorWhite
      }
    ] as any
  }),

  heading: {
    display: VARIABLE.display.flex,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: '0 3px',

    title: {
      fontSize: 20,
      lineHeight: '32px',
      height: 30,
      letterSpacing: 1,

      textTransform: 'uppercase'
    },

    icon: {
      width: 20,
      height: 20,
      color: VARIABLE.colorBlack
    },

    innerIcon: {
      width: 20
    }
  },

  content: {
    code: {
      fontSize: 18,
      lineHeight: '30px',
      textAlign: 'center' as const,

      marginBottom: 5
    },

    description: {
      fontSize: 14,
      lineHeight: '20px',
      textAlign: 'center' as const,
      padding: '0 20px'
    },

    button: {
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
      width: 'calc(100% - 20px)'
    }
  }
} as any;
