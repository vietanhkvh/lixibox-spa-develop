import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';
import { CDN_ASSETS_PREFIX } from '../../../utils/uri';
const coverBackground = CDN_ASSETS_PREFIX('/login/desktop-signin.png');

export default {
  container: {
    wrap: combineStyle({
      MOBILE: [
        {
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: '15px 15px 0 0',
          zIndex: VARIABLE.zIndex9
        }
      ] as any,
      DESKTOP: [{}] as any,
      GENERAL: [
        {
          display: VARIABLE.display.flex,
          background: VARIABLE.colorWhite,
          position: 'relative'
        }
      ] as any
    }),

    headerContent: combineStyle({
      MOBILE: [
        {
          padding: '10px 15px 15px',
          minHeight: 100,
          width: '100%',
          borderBottom: `1px solid ${VARIABLE.colorE5}`
        }
      ] as any,
      DESKTOP: [
        {
          padding: '30px 30px 30px',
          borderRight: `1px solid ${VARIABLE.colorE5}`,
          width: '40%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }
      ] as any,
      GENERAL: [
        {
          position: 'relative'
        }
      ] as any
    }),

    cover: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'top center',
      zIndex: VARIABLE.zIndex1,
      opacity: 0.3,
      backgroundImage: `url(${coverBackground})`
    },

    contentGroup: {
      container: combineStyle({
        MOBILE: [
          {
            paddingTop: 15,
            paddingRight: 15,
            paddingBottom: 15,
            paddingLeft: 15
          }
        ] as any,
        DESKTOP: [
          {
            paddingTop: 30,
            paddingRight: 30,
            paddingBottom: 10,
            paddingLeft: 30
          }
        ] as any,
        GENERAL: [
          {
            flex: 10
          }
        ] as any
      }),

      header: {
        container: combineStyle({
          MOBILE: [{}] as any,
          DESKTOP: [
            {
              marginBottom: 20
            }
          ] as any,
          GENERAL: [
            {
              position: 'relative',
              zIndex: VARIABLE.zIndex5
            }
          ] as any
        }),

        title: combineStyle({
          MOBILE: [{ fontSize: 20 }] as any,
          DESKTOP: [{ fontSize: 22 }] as any,
          GENERAL: [
            {
              textTransform: 'uppercase',
              lineHeight: '40px',

              fontWeight: VARIABLE.fontRegular,
              color: VARIABLE.colorBlack,
              display: VARIABLE.display.block,
              marginBottom: 10
            }
          ] as any
        }),

        orderNameTitle: combineStyle({
          MOBILE: [{ fontSize: 14, lineHeight: '20px' }] as any,
          DESKTOP: [
            {
              fontSize: 14,
              lineHeight: '20px'
            }
          ] as any,
          GENERAL: [
            {
              display: VARIABLE.display.inlineBlock,
              marginBottom: 0,
              color: VARIABLE.colorBlack
            }
          ] as any
        }),

        orderStatusTitle: combineStyle({
          MOBILE: [
            {
              fontSize: 13
            }
          ] as any,
          DESKTOP: [
            {
              fontSize: 16
            }
          ] as any,
          GENERAL: [
            {
              color: VARIABLE.colorRed,

              textTransform: 'uppercase'
            }
          ] as any
        })
      }
    },

    process: {
      marginBottom: 20
    },

    btn: {
      display: VARIABLE.display.block,
      width: '100%',
      margin: '0 auto',

      cursor: 'pointer',
      textTransform: 'uppercase'
    }
  },

  processWrap: {
    container: {
      flexDirection: 'column',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom: 10,
      display: VARIABLE.display.flex,
      justifyContent: 'space-between',
      position: VARIABLE.position.relative
    },

    processGroup: {
      container: combineStyle({
        MOBILE: [{ height: 50 }] as any,
        DESKTOP: [
          {
            height: 50
          }
        ] as any,
        GENERAL: [
          {
            flexDirection: 'row',
            width: '100%',
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            display: VARIABLE.display.flex,
            alignItems: 'center',
            position: VARIABLE.position.relative
          }
        ] as any
      }),

      iconGroup: {
        container: {
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
          borderWidth: 1,
          height: 40,
          width: 40,
          marginRight: 10,
          borderStyle: 'solid',
          borderColor: VARIABLE.colorBlack06,
          borderRadius: '50%',
          backgroundColor: VARIABLE.colorWhite,
          display: VARIABLE.display.flex,
          alignItems: 'center',
          justifyContent: 'center',
          position: VARIABLE.position.relative,
          zIndex: VARIABLE.zIndex1
        },

        success: {
          borderColor: VARIABLE.colorGreen
        },

        icon: (isSuccess = false) => ({
          width: 30,
          height: 30,
          color: isSuccess ? VARIABLE.colorGreen : VARIABLE.colorBlack06
        }),

        innerIcon: {
          width: 20,

          cart: {
            width: 16
          },

          gift: {
            width: 16
          },

          deliver: {
            width: 22
          },

          check: {
            width: 14
          }
        }
      },

      title: {
        container: (isSuccess = false) =>
          combineStyle({
            MOBILE: [{ fontSize: 15 }] as any,
            DESKTOP: [{ fontSize: 14 }] as any,
            GENERAL: [
              {
                paddingTop: 0,
                color: isSuccess ? VARIABLE.colorGreen : VARIABLE.colorBlack08,
                textAlign: 'center' as const,
                fontWeight: VARIABLE.fontBold
              }
            ] as any
          }),

        link: { cursor: 'pointer' }
      },

      line: (isSuccess = false) => ({
        width: 80,
        left: -20,
        height: 1,
        top: '100%',
        transform: 'rotate(90deg)',
        position: VARIABLE.position.absolute,
        backgroundColor: isSuccess ? VARIABLE.colorGreen : VARIABLE.colorBlack06,
        zIndex: VARIABLE.zIndexMin
      })
    }
  },

  close: {
    icon: combineStyle({
      MOBILE: [{}] as any,
      DESKTOP: [{}] as any,
      GENERAL: [
        {
          cursor: 'pointer',
          width: 40,
          height: 40,
          color: VARIABLE.colorBlack,
          position: 'absolute',
          top: 10,
          right: 8,
          zIndex: VARIABLE.zIndex9
        }
      ] as any
    }),
    innerIcon: {
      width: 18
    }
  },

  desktopHeadingHighlight: {
    width: 3,
    height: 30,
    background: VARIABLE.colorBlack,
    position: 'absolute',
    top: 35,
    left: 0
  }
} as any;
