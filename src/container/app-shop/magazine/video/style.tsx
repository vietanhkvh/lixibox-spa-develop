import * as VARIABLE from '../../../../style/variable';
import { combineStyle } from '../../../../utils/responsive';

export default {
  container: {
    backgroundSize: 'cover',
    display: VARIABLE.display.block,
    background: VARIABLE.colorWhite,

    heading: {
      width: '100%',
      marginLeft: 0,
      height: 60,
      background: VARIABLE.colorWhite05,
      display: VARIABLE.display.flex,
      justifyContent: 'space-between',
      position: VARIABLE.position.fixed,
      zIndex: VARIABLE.zIndex9,
      borderBottom: `1px solid ${VARIABLE.colorWhite}`,
      top: 0,
      left: 0,

      logo: {
        display: VARIABLE.display.flex,

        back: {
          width: 60,
          height: 60,
          background: VARIABLE.colorBlack04,
          color: VARIABLE.colorWhite
        },

        innerBack: { width: 20 },

        iconLogo: {
          width: 'auto',
          height: 60,
          color: VARIABLE.colorBlack,
          paddingLeft: 15
        },

        innerIconLogo: { height: 15 }
      },
      nav: {
        display: VARIABLE.display.flex,
        justifyContent: 'flex-end',
        paddingLeft: 15,
        paddingRight: 75,

        link: {
          color: VARIABLE.colorBlack08,
          lineHeight: '60px',
          paddingLeft: 15,
          paddingRight: 15,
          fontSize: 16,

          textTransform: 'uppercase'
        }
      }
    },

    wrap: {
      margin: '0 auto',
      width: '100%',
      background: VARIABLE.colorWhite,
      paddingBottom: 10
    },

    blogTitle: {
      display: VARIABLE.display.block,
      width: '100%',
      textAlign: 'center' as const,
      fontSize: 40,
      lineHeight: '42px',
      padding: '30px 160px',

      fontWeight: VARIABLE.fontBold
    },

    magazineTitle: {
      fontSize: 30,
      width: '100%',
      textAlign: 'center' as const,
      display: VARIABLE.display.block
    },

    videoRelatedGroup: combineStyle({
      MOBILE: [
        {
          paddingLeft: 10,
          paddingRight: 10
        }
      ] as any,
      DESKTOP: [{}] as any,
      GENERAL: [{}] as any
    }),

    btnViewMore: {
      container: combineStyle({
        MOBILE: [
          {
            marginBottom: 10
          }
        ] as any,

        DESKTOP: [
          {
            marginBottom: 20
          }
        ] as any,

        GENERAL: [
          {
            display: VARIABLE.display.flex,
            justifyContent: 'center',
            paddingTop: 10
          }
        ] as any
      }),

      btn: {
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        width: 150,
        borderRadius: 3,
        fontSize: 18,
        color: VARIABLE.colorBlack09,
        textAlign: 'center' as const,
        border: `1px solid ${VARIABLE.colorBlack06}`,
        cursor: 'pointer'
      }
    },

    videoWrap: {
      container: combineStyle({
        MOBILE: [
          {
            marginLeft: -5,
            marginRight: -5
          }
        ] as any,

        DESKTOP: [
          {
            marginLeft: -10,
            marginRight: -10
          }
        ] as any,

        GENERAL: [
          {
            flexWrap: 'wrap',
            display: VARIABLE.display.flex
          }
        ] as any
      }),

      video: combineStyle({
        MOBILE: [
          {
            width: '50%',
            paddingLeft: 5,
            paddingRight: 5
          }
        ] as any,
        DESKTOP: [
          {
            width: '25%',
            paddingLeft: 10,
            paddingRight: 10
          }
        ] as any,
        GENERAL: [{}] as any
      })
    },

    mobileHeader: {
      top: -1,
      height: 60,
      fontSize: 20,
      marginBottom: 20,
      letterSpacing: -0.5,
      maxWidth: `100%`,
      overflow: `hidden`,
      lineHeight: `60px`,
      textAlign: 'center' as const,
      whiteSpace: `nowrap`,
      textOverflow: `ellipsis`,
      color: VARIABLE.colorBlack,

      background: VARIABLE.colorWhite,
      position: VARIABLE.position.relative
    },

    title: {
      container: combineStyle({
        MOBILE: [
          {
            marginBottom: 10
          }
        ] as any,

        DESKTOP: [
          {
            marginBottom: 20
          }
        ] as any,

        GENERAL: [
          {
            top: -1,
            height: 60,
            fontSize: 20,
            letterSpacing: -0.5,
            maxWidth: `100%`,
            overflow: `hidden`,
            lineHeight: `60px`,
            whiteSpace: `nowrap`,
            textOverflow: `ellipsis`,
            color: VARIABLE.colorBlack,

            background: VARIABLE.colorWhite,
            position: VARIABLE.position.relative
          }
        ] as any
      }),

      borderLine: {
        display: VARIABLE.display.block,
        position: VARIABLE.position.absolute,
        height: 4,
        width: 25,
        background: VARIABLE.colorBlack,
        bottom: 1
      },

      line: {
        display: VARIABLE.display.block,
        position: VARIABLE.position.absolute,
        height: 1,
        width: '100%',
        background: VARIABLE.colorBlack05,
        bottom: 1
      }
    }
  }
} as any;
