import * as VARIABLE from 'style/variable';
import { combineStyle } from 'utils/responsive';

export default {
  desktop: {
    buttonGroup: {
      paddingTop: 10,

      button: {
        width: 'auto',
        flex: 1,

        left: {
          marginRight: 7
        },

        right: {
          marginLeft: 7
        },

        iconCart: {
          width: 18,
          height: 18,
          color: VARIABLE.colorWhite,
          position: VARIABLE.position.relative,
          top: -3
        },

        iconTime: {
          width: 18,
          height: 18,
          color: VARIABLE.colorWhite,
          position: VARIABLE.position.relative,
          marginTop: -2
        },

        iconLove: {
          width: 16,
          height: 16,
          color: VARIABLE.color4D,
          position: VARIABLE.position.relative,
          top: -1,

          liked: {
            color: VARIABLE.colorBlack
          }
        }
      },

      btnWaiting: combineStyle({
        MOBILE: [
          {
            marginBottom: 0,
            marginTop: 0,
            width: 300,
            padding: `0 20px`
          }
        ] as any,

        DESKTOP: [
          {
            flex: 1,
            marginRight: 7
          }
        ] as any,

        GENERAL: [
          {
            color: VARIABLE.color4D,
            border: `1px solid ${VARIABLE.color4D}`,
            pointerEvents: 'none'
          }
        ] as any
      })
    }
  }
} as any;
