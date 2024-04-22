import { combineStyle } from '../../../utils/responsive';
import * as VARIABLE from '../../../style/variable';

export default {
  container: {
    panel: combineStyle({
      MOBILE: [{}] as any,

      DESKTOP: [
        {
          width: '100%',
          maxWidth: 1366
        }
      ] as any,

      GENERAL: [
        {
          display: VARIABLE.display.flex
        }
      ] as any
    }),

    storeList: {
      container: combineStyle({
        MOBILE: [
          {
            width: '100%',
            paddingTop: 16,
            paddingLeft: 16,
            paddingRight: 16
          }
        ] as any,

        DESKTOP: [
          {
            width: '40%',
            maxHeight: 600,
            paddingLeft: 20,
            paddingRight: 20
          }
        ] as any,

        GENERAL: [
          {
            height: '100%',
            overflowX: 'hidden',
            overflowY: 'auto'
          }
        ] as any
      }),

      store: {
        container: combineStyle({
          MOBILE: [
            {
              marginBottom: 16,
              position: VARIABLE.position.relative
            }
          ] as any,

          DESKTOP: [
            {
              marginBottom: 20
            }
          ] as any,

          GENERAL: [
            {
              border: `1px solid ${VARIABLE.colorE4}`,
              borderRadius: 8,
              paddingTop: 16,
              paddingRight: 16,
              paddingBottom: 16,
              paddingLeft: 16,
              cursor: 'pointer'
            }
          ] as any
        }),

        active: {
          border: `1px solid ${VARIABLE.colorGreen}`
        },

        overlayMobile: {
          position: VARIABLE.position.absolute,
          zIndex: VARIABLE.zIndex1,
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        },

        infoGroup: {
          display: VARIABLE.display.flex,
          alignItems: 'center',
          marginBottom: 10,

          icon: {
            width: 15,
            height: 15,
            color: VARIABLE.color20,
            marginRight: 14
          },

          innerIcon: {
            width: 15
          }
        },

        name: {
          fontSize: 14,
          marginBottom: 12,
          fontWeight: VARIABLE.fontSemiBold,
          color: VARIABLE.color20
        },

        address: {
          fontSize: 14,
          fontWeight: VARIABLE.fontLight,
          color: VARIABLE.color20
        },

        phone: {
          fontSize: 14,
          fontWeight: VARIABLE.fontLight,
          color: VARIABLE.color20,
          position: VARIABLE.position.relative,
          zIndex: VARIABLE.zIndex2
        },

        time: {
          fontSize: 14,
          fontWeight: VARIABLE.fontLight,
          color: VARIABLE.color20
        },

        stock: {
          fontSize: 14,
          fontWeight: VARIABLE.fontLight,
          color: VARIABLE.colorPink
        },

        boldText: {
          fontSize: 14,
          fontWeight: VARIABLE.fontSemiBold
        },

        lighthight: {
          fontSize: 14,
          color: VARIABLE.colorBlue,
          display: 'block',
          fontWeight: VARIABLE.fontSemiBold
        },

        openStore: {
          fontSize: 13,
          color: VARIABLE.colorGreen
        },

        closeStore: {
          fontSize: 13,
          color: VARIABLE.colorRed
        }
      }
    },

    iframe: combineStyle({
      MOBILE: [{ height: '100%' }] as any,

      DESKTOP: [
        {
          height: 600,
          width: '65%'
        }
      ] as any,

      GENERAL: [
        {
          width: '100%',
          frameBorder: 0,
          allowFullScreen: true
        }
      ] as any
    })
  }
} as any;
