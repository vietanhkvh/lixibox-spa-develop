import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

import { CDN_ASSETS_PREFIX } from '../../../utils/uri';
const giftBackground = CDN_ASSETS_PREFIX('/cart/gift.jpg');

export default {
  wrap: {
    width: '100%',
    overflowX: 'auto',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    zIndex: VARIABLE.zIndexMax,
    background: VARIABLE.colorWhite,
    overflow: 'hidden',
    borderRadius: '15px 15px 0 0',

    header: {
      display: VARIABLE.display.flex,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,

      title: {
        fontSize: 22
      },

      close: {
        icon: {
          width: 20,
          height: 20,
          color: VARIABLE.colorBlack
        },

        innerIcon: {
          width: 20
        }
      }
    },

    list: {
      width: 'calc(100% + 10px)',
      overflowX: 'auto',

      panel: {
        flexWrap: 'nowrap',
        display: 'flex',
        marginBottom: 10
      }
    }
  },

  container: {
    display: VARIABLE.display.flex,
    flexDirection: 'column',
    paddingTop: 0,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,

    title: {
      fontSize: 22,
      marginBottom: 20,
      textAlign: 'center' as const,
      textTransform: 'uppercase',

      color: VARIABLE.colorBlack07
    },

    discountCodeList: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',

      discountCode: {
        wrap: {
          paddingRight: 10,
          width: 265,
          minWidth: 265
        },

        container: combineStyle({
          MOBILE: [{ width: '100%', height: '100%' }] as any,
          DESKTOP: [{ width: 'calc(50% - 5px)' }] as any,

          GENERAL: [
            {
              display: VARIABLE.display.flex,
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
              padding: 7,
              border: `1px solid ${VARIABLE.colorE5}`
            }
          ] as any
        }),

        active: {
          border: `1px solid ${VARIABLE.colorRed}`
        },

        inner: {
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 15,
          height: '100%',
          width: '100%',
          background: VARIABLE.colorWhite,
          boxShadow:
            '0 1px 1px rgba(0,0,0,.075), 0 -1px 1px rgba(0,0,0,.075), 1px 0px 1px rgba(0,0,0,.075), -1px 0px 1px rgba(0,0,0,.075)'
        },

        icon: {
          width: 90,
          height: 90,
          position: 'absolute',
          bottom: 33,
          right: 12,
          backgroundImage: `url(${giftBackground})`,
          backgroundSize: '90px 90px',

          disabled: {
            filter: `grayscale(1)`,
            opacity: 0.3
          }
        },

        progressBar: {
          disabled: {
            filter: `grayscale(1)`,
            opacity: 0.3
          }
        },

        innerIcon: {
          width: 25
        },

        content: {
          fontSize: 14,
          flex: 10,
          paddingRight: 70,
          zIndex: VARIABLE.zIndex5,
          marginBottom: 10,
          minHeight: 80,

          code: {
            fontSize: 14,

            cursor: 'pointer',
            color: VARIABLE.colorBlack
          },

          link: {
            fontSize: 12,
            backgroundColor: VARIABLE.colorRed,
            color: VARIABLE.colorWhite,

            cursor: 'pointer',
            display: 'block',
            width: 100,
            textAlign: 'center' as const,
            lineHeight: '24px',
            padding: '0 10px',
            borderRadius: 12,
            marginTop: 6
          },

          price: {
            fontSize: 14,

            color: VARIABLE.colorRed
          }
        }
      }
    }
  }
} as any;
