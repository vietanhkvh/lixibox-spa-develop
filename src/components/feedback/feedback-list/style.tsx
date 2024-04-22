import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: {},

  row: combineStyle({
    MOBILE: [{ padding: `10px 10px 0px 10px`, marginBottom: 0 }] as any,
    DESKTOP: [
      {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 20
      }
    ] as any,

    GENERAL: [
      {
        display: VARIABLE.display.flex,
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }
    ] as any
  }),

  contentGroup: {
    container: combineStyle({
      MOBILE: [{ marginBottom: 10, width: '100%' }] as any,
      DESKTOP: [{ marginBottom: 20, width: 'calc(50% - 10px)' }] as any,

      GENERAL: [
        {
          borderRadius: 3,
          boxShadow: VARIABLE.shadowBlurSort,
          padding: '10px'
        }
      ] as any
    }),

    inner: {
      display: VARIABLE.display.flex,
      justifyContent: 'space-between'
    },

    imgGroup: {
      display: VARIABLE.display.flex,
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: 'calc(40% - 10px)',

      img: {
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        paddingTop: '100%'
      },

      btn: {
        marginBottom: 0,
        maxWidth: 200
      }
    },

    rateGroup: {
      display: VARIABLE.display.flex,
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: 'calc(60%)',

      header: {
        title: {
          color: VARIABLE.colorBlack07,
          fontSize: 16,
          marginBottom: 5,

          nameProduct: {
            fontSize: 16,
            color: VARIABLE.colorBlack
          }
        },

        date: {
          fontSize: 12,
          color: VARIABLE.colorBlack05,
          marginBottom: 5
        },

        rate: {
          marginBottom: 10
        },

        review: {
          maxHeight: 200,
          overflow: 'hidden',
          fontSize: 14
        }
      },

      btn: {
        marginBottom: 0
      }
    }
  }
} as any;
