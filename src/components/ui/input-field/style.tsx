import * as VARIABLE from '../../../style/variable';

export default {
  container: {
    display: 'block',
    width: '100%',
    marginBottom: 5,
    paddingTop: 20,
    paddingBottom: 16,
    position: 'relative',
    zIndex: VARIABLE.zIndex1
  },

  title: {
    width: '100%',
    fontSize: 12,
    height: 20,
    lineHeight: '20px',
    color: VARIABLE.colorBlack,

    position: 'absolute',
    top: 0,
    transition: VARIABLE.transitionNormal,
    whiteSpace: 'nowrap',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: 40,

    onInput: {
      top: 20,
      fontSize: 14,
      height: 34,
      lineHeight: '34px',
      opacity: 0.65
    },

    error: {
      color: VARIABLE.colorRed
    }
  },

  main: {
    position: 'relative',
    zIndex: VARIABLE.zIndex9,

    input: {
      width: '100%',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderBottom: `1px solid ${VARIABLE.colorE5}`,
      outline: 'none',
      boxShadow: 'none',
      height: 34,
      lineHeight: '34px',
      fontSize: 14,
      color: VARIABLE.colorBlack,
      background: 'transparent',
      whiteSpace: 'nowrap',
      maxWidth: '100%',
      overflow: 'hidden',
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      borderRadius: 0
    },

    inputRounded: {
      height: 30,
      lineHeight: '30px',
      border: `1px solid ${VARIABLE.colorE5}`,
      paddingLeft: 10,
      paddingRight: 10,
      background: VARIABLE.colorF0,
      borderRadius: 3
    },

    inputBigRounded: {
      height: 40,
      lineHeight: '40px',
      paddingLeft: 20,
      paddingRight: 20,
      fontSize: 14,
      fontWeight: VARIABLE.fontLight,
      color: VARIABLE.color20,
      background: VARIABLE.colorWhite,
      borderRadius: 8
    },

    inputWithIcon: {
      paddingRight: 34
    },

    icon: {
      width: 34,
      height: 34,
      color: VARIABLE.color75,
      position: 'absolute',
      right: 0,
      top: 0,

      inner: { width: 12 },

      'map-marker': {
        width: 11
      },

      email: {
        width: 16
      },

      user: {
        width: 14
      },

      call: {
        width: 15
      }
    },

    line: {
      width: 0,
      height: 1,
      position: 'absolute',
      left: 0,
      bottom: 0,
      transition: VARIABLE.transitionNormal,
      opacity: 0,
      background: VARIABLE.colorBlack,

      valid: {
        background: VARIABLE.colorBlack
      },

      invalid: {
        background: VARIABLE.colorRed
      },

      focused: {
        opacity: 1,
        width: '100%'
      }
    }
  },

  error: {
    fontSize: 8,
    width: '100%',
    height: 16,
    lineHeight: '16px',
    color: VARIABLE.colorRed,
    textTransform: 'uppercase',

    whiteSpace: 'nowrap',
    maxWidth: '100%',
    overflow: 'hidden',
    position: 'absolute',
    left: 0,
    bottom: 8,
    opacity: 0,
    transition: VARIABLE.transitionNormal,

    show: {
      opacity: 1,
      bottom: -18
    }
  }
} as any;
