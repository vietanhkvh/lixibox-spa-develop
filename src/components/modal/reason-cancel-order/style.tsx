import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: {
    wrap: combineStyle({
      MOBILE: [
        {
          paddingLeft: 10,
          paddingRight: 10
        }
      ] as any,

      DESKTOP: [
        {
          paddingLeft: 20,
          paddingRight: 20
        }
      ] as any,

      GENERAL: [
        {
          paddingTop: 20
        }
      ] as any
    }),

    reason: {
      display: VARIABLE.display.flex,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
      cursor: 'pointer',

      icon: {
        width: 20,
        minWidth: 20,
        height: 20,
        borderRadius: '50%',
        border: `1px solid ${VARIABLE.color97}`,
        marginRight: 10,
        transition: VARIABLE.transitionBackground,
        position: 'relative',
        backgroundColor: VARIABLE.colorWhite,

        selected: {
          backgroundColor: VARIABLE.colorPink,
          border: `1px solid ${VARIABLE.colorPink}`
        },

        firstCheck: {
          position: 'absolute',
          width: 6,
          height: 2,
          backgroundColor: VARIABLE.colorWhite,
          borderRadius: 2,
          transform: 'rotate(45deg)',
          top: 10,
          left: 2
        },

        lastCheck: {
          position: 'absolute',
          width: 10,
          height: 2,
          borderRadius: 2,
          backgroundColor: VARIABLE.colorWhite,
          transform: 'rotate(-45deg)',
          top: 8,
          left: 5
        }
      },

      text: combineStyle({
        MOBILE: [
          {
            fontSize: 16,
            height: 20,
            lineHeight: '20px'
          }
        ] as any,

        DESKTOP: [
          {
            fontSize: 18,
            height: 18,
            lineHeight: '18px'
          }
        ] as any,

        GENERAL: [
          {
            flex: 10,
            marginBotton: 20
          }
        ] as any
      })
    },

    btnWrap: {
      paddingTop: 20,
      textAlign: 'center' as const,

      btn: {
        width: 200
      }
    }
  }
} as any;
