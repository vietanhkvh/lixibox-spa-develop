import * as VARIABLE from '../../../style/variable';

export default {
  display: 'block',

  small: {
    border: `1px solid ${VARIABLE.colorBlack}`,

    icon: {
      display: 'inline-block',
      color: VARIABLE.color4D,
      width: '15px',
      height: 'auto'
    },

    iconOuter: {
      width: 40,
      height: 30,
      cursor: 'pointer',
      position: 'relative',
      zIndex: VARIABLE.zIndex5
    },

    value: {
      container: (disable = false) => ({
        width: 40,
        height: disable ? 100 : 30,
        textAlign: 'center' as const,
        lineHeight: disable ? '100px' : '30px',
        position: 'relative'
      }),

      text: {
        fontSize: 16,

        color: VARIABLE.colorBlack
      },

      textAnimation: {
        fontSize: 16,

        color: VARIABLE.colorBlack,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        transition: VARIABLE.transitionNormal,
        transform: 'translateY(20px)',
        opacity: 0,
        background: VARIABLE.colorWhite,

        animating: {
          transform: 'translateY(0)',
          opacity: 1
        },

        reset: {
          transform: 'translateY(0)',
          opacity: 0,
          transition: 'none'
        }
      }
    }
  },

  normal: {
    icon: {
      color: VARIABLE.colorBlack,
      width: 40,
      height: 38,
      borRadius: 3,
      background: VARIABLE.colorWhite,
      cursor: 'pointer',
      position: 'relative'
    },

    iconInnerPlus: (isMobile = false) => ({
      width: isMobile ? 14 : 19
    }),

    iconInnerMinus: {
      width: 14
    },

    value: {
      width: 80,
      height: 38,
      textAlign: 'center' as const,
      lineHeight: '38px',
      position: 'relative',
      background: VARIABLE.colorWhite,

      text: {
        fontSize: 20,

        color: VARIABLE.colorBlack
      },

      textAnimation: {
        fontSize: 20,

        color: VARIABLE.colorBlack,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        transition: VARIABLE.transitionNormal,
        transform: 'translateY(20px)',
        opacity: 0,

        animating: {
          transform: 'translateY(0)',
          opacity: 1
        },

        reset: {
          transform: 'translateY(0)',
          opacity: 0,
          transition: 'none'
        }
      }
    }
  }
} as any;
