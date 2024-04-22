import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [{}] as any,

    DESKTOP: [
      {
        display: VARIABLE.display.flex,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%'
      }
    ] as any,

    GENERAL: [{}] as any
  }),

  img: (url) =>
    combineStyle({
      MOBILE: [
        {
          display: VARIABLE.display.none
        }
      ] as any,

      DESKTOP: [
        {
          flex: 1,
          backgroundImage: `url(${url})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          paddingTop: '50%',
          height: '100%'
        }
      ] as any,

      GENERAL: [{}] as any
    }),

  productInfo: {
    container: combineStyle({
      MOBILE: [{}] as any,

      DESKTOP: [
        {
          flex: 1,
          display: VARIABLE.display.block,
          flexDirection: 'column',
          marginLeft: 10,
          height: '100%',
          overflowY: 'scroll',
          overflowX: 'hidden'
        }
      ] as any,

      GENERAL: [{}] as any
    }),

    product: {
      container: combineStyle({
        MOBILE: [
          {
            paddingLeft: 10,
            paddingRight: 10
          }
        ] as any,

        DESKTOP: [{}] as any,

        GENERAL: [
          {
            display: VARIABLE.display.flex,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 10,
            paddingBottom: 10,
            borderBottom: `1px solid ${VARIABLE.colorBlack02}`,
            cursor: 'pointer'
          }
        ] as any
      }),

      num: {
        height: 40,
        width: 40,
        borderRadius: 20,
        display: VARIABLE.display.flex,
        alignItems: 'center',
        justifyContent: 'center',
        color: VARIABLE.colorWhite,
        backgroundColor: VARIABLE.colorBlack,
        fontSize: 16,
        fontWeight: VARIABLE.fontBold
      },

      name: {
        flex: 10,
        fontSize: 16,
        color: VARIABLE.colorBlack08,
        marginLeft: 10,
        fontWeight: VARIABLE.fontBold,
        lineHeight: '22px',
        height: 66,
        maxHeight: 66,
        overflow: 'hidden'
      },

      img: (url) => ({
        backgroundImage: `url(${url})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        width: '30%',
        paddingTop: '25%'
      })
    }
  }
} as any;
