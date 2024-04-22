import * as VARIABLE from '../../../../style/variable';
import { combineStyle } from '../../../../utils/responsive';
import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';
const videoBg = CDN_ASSETS_PREFIX('/halio-landing-page/cover-1.jpg');

export default {
  video: {
    container: combineStyle({
      MOBILE: [
        {
          paddingBottom: 10
        }
      ] as any,

      DESKTOP: [
        {
          paddingTop: 60,
          paddingBottom: 70
        }
      ] as any,

      GENERAL: [
        {
          position: VARIABLE.position.relative
        }
      ] as any
    }),

    bg: {
      backgroundImage: `url('${videoBg}')`,
      backgroundSize: 'cover',
      position: VARIABLE.position.absolute,
      top: 0,
      left: 0,
      zIndex: 0,
      width: '100%',
      height: '100%',
      filter: 'blur(50px)',
      opacity: 0.1
    },

    main: combineStyle({
      MOBILE: [{}] as any,

      DESKTOP: [
        {
          display: VARIABLE.display.block,
          margin: '0 auto',
          borderRadius: 30,
          maxWidth: 840,
          maxHeight: 500
        }
      ] as any,

      GENERAL: [
        {
          width: '100%',
          display: VARIABLE.display.block,
          transition: VARIABLE.transitionNormal
        }
      ] as any
    }),

    mainTitle: combineStyle({
      MOBILE: [
        {
          fontSize: 22
        }
      ] as any,

      DESKTOP: [
        {
          fontSize: 26
        }
      ] as any,

      GENERAL: [
        {
          lineHeight: '40px',
          maxWidth: 840,
          textAlign: 'center' as const,
          textTransform: 'uppercase',
          margin: '0 auto 30px',
          letterSpacing: 1.5,
          paddingLeft: 10,
          paddingRight: 10,
          color: VARIABLE.colorBlack08,
          fontWeight: VARIABLE.fontSemiBold
        }
      ] as any
    }),

    smallTitle: {
      fontSize: 12,

      color: VARIABLE.colorBlack06,
      lineHeight: '20px',
      textAlign: 'center' as const,
      textTransform: 'uppercase',
      maxWidth: 185
    },

    videoWrap: combineStyle({
      MOBILE: [
        {
          width: '50%',
          paddingTop: 5,
          paddingLeft: 5,
          paddingRight: 5,
          paddingBottom: 5
        }
      ] as any,

      DESKTOP: [
        {
          paddingLeft: 10,
          paddingRight: 10
        }
      ] as any,

      GENERAL: [{}] as any
    }),

    list: {
      container: combineStyle({
        MOBILE: [
          {
            flexWrap: 'wrap',
            paddingLeft: 5,
            paddingRight: 5
          }
        ] as any,

        DESKTOP: [{ height: 120 }] as any,

        GENERAL: [
          {
            display: VARIABLE.display.flex,
            width: '100%',
            justifyContent: 'center'
          }
        ] as any
      }),

      item: combineStyle({
        MOBILE: [
          {
            width: '100%',
            height: 100,
            marginBottom: 10,
            borderRadius: 10
          }
        ] as any,

        DESKTOP: [
          {
            width: 185,
            height: 120,
            borderRadius: 10,
            boxShadow: `0 0px 30px ${VARIABLE.colorBlack01}`,
            marginBottom: 10
          }
        ] as any,

        GENERAL: [
          {
            backgroundSize: 'cover',
            position: VARIABLE.position.relative,
            cursor: 'pointer'
          }
        ] as any
      })
    },

    overlay: {
      position: VARIABLE.position.absolute,
      display: VARIABLE.display.flex,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: VARIABLE.colorBlack01,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5
    },

    iconPlay: {
      width: 30,
      height: 40,
      borderTop: `20px solid transparent`,
      borderBottom: `20px solid transparent`,
      borderLeft: `30px solid ${VARIABLE.colorWhite}`,
      boxSizing: 'border-box'
    },

    wrap: combineStyle({
      MOBILE: [{ height: 'auto' }] as any,

      DESKTOP: [{ height: 'auto', borderRadius: 30 }] as any,

      GENERAL: [
        {
          display: VARIABLE.display.block,
          margin: '0px auto 40px',
          maxWidth: 840,
          width: '100%',
          overflow: 'hidden',
          minHeight: 180,
          boxShadow: `0 0px 50px ${VARIABLE.colorBlack04}`
        }
      ] as any
    })
  }
} as any;
