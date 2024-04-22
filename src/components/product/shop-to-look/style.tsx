import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  mobileTitle: {
    marginLeft: 10,
    textAlign: 'left' as const
  },

  shopTheLook: {
    container: combineStyle({
      MOBILE: [{}] as any,
      DESKTOP: [{}] as any,
      GENERAL: [
        {
          display: VARIABLE.display.flex,
          flexDirection: 'column'
        }
      ] as any
    }),

    imageSlider: {
      display: VARIABLE.display.flex,
      alignItems: 'center',

      imageWrap: {
        width: '33.33%',
        height: 700,
        cursor: 'pointer'
      },

      image: (url) => ({
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        paddingTop: '100%',
        height: '100%'
      })
    },

    footerWrap: combineStyle({
      MOBILE: [
        {
          flexDirection: 'column'
        }
      ] as any,

      DESKTOP: [{}] as any,

      GENERAL: [
        {
          display: VARIABLE.display.flex,
          alignItems: 'center'
        }
      ] as any
    }),

    footer: {
      container: combineStyle({
        MOBILE: [{}] as any,

        DESKTOP: [
          {
            paddingTop: 20,
            paddingBottom: 20,
            paddingRight: 20,
            paddingLeft: 20
          }
        ] as any,

        GENERAL: [
          {
            display: VARIABLE.display.flex,
            alignItems: 'center',
            flexDirection: 'column',
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
            width: 400,
            marginBottom: 10
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
            fontSize: 17,
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
