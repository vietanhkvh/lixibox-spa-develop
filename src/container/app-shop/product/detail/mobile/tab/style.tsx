import * as VARIABLE from '../../../../../../style/variable';
import { combineStyle } from '../../../../../../utils/responsive';

export default {
  mobile: {
    relatedProduct: {
      display: VARIABLE.display.flex,
      flexDirection: 'column',
      paddingTop: 20,
      marginBottom: 20,

      title: {
        textAlign: 'left' as const,
        marginLeft: 10
      },

      btnWrap: {
        paddingTop: 10,
        width: '100%',
        display: VARIABLE.display.flex,
        justifyContent: 'center',

        btn: {
          height: 30,
          lineHeight: '30px',
          paddingLeft: 20,
          paddingRight: 20,
          color: VARIABLE.colorBlack08,
          borderRadius: 3,
          fontSize: 14,
          border: `1px solid ${VARIABLE.colorBlack08}`
        }
      }
    }
  },

  shopTheLook: {
    footer: {
      container: combineStyle({
        MOBILE: [
          {
            flexDirection: 'column'
          }
        ] as any,

        DESKTOP: [
          {
            paddingTop: 40,
            paddingBottom: 40,
            paddingRight: 40,
            paddingLeft: 40,
            marginBottom: 20
          }
        ] as any,

        GENERAL: [
          {
            display: VARIABLE.display.flex,
            alignItems: 'center',
            backgroundColor: '#181818'
          }
        ] as any
      }),

      logo: combineStyle({
        MOBILE: [
          {
            width: '100%',
            height: 'auto',
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 10
          }
        ] as any,

        DESKTOP: [
          {
            width: 350,
            marginRight: 40
          }
        ] as any,

        GENERAL: [{}] as any
      }),

      desc: combineStyle({
        MOBILE: [
          {
            fontSize: 16,
            textAlign: 'justify' as const,
            paddingTop: 10,
            paddingRight: 20,
            paddingLeft: 20,
            paddingBottom: 15
          }
        ] as any,

        DESKTOP: [
          {
            fontSize: 18,
            textAlign: 'justify' as const
          }
        ] as any,

        GENERAL: [
          {
            color: VARIABLE.colorWhite
          }
        ] as any
      })
    }
  }
} as any;
