import * as VARIABLE from '../../../style/variable';
const HEIGHT_DEFAULT = 40;

export default {
  display: 'block',
  width: '100%',
  position: 'relative',
  zIndex: VARIABLE.zIndex5,

  open: {
    zIndex: VARIABLE.zIndex9
  },

  disable: {
    pointerEvents: 'none'
  },

  icon: {
    minWidth: 40,
    width: 40,
    height: 38,
    fontSize: 12,
    lineHeight: '38px',
    textAlign: 'center' as const,
    color: VARIABLE.color75,
    cursor: 'pointer',

    check: {
      color: VARIABLE.colorRed
    },

    inner: {
      width: 14
    }
  },

  header: {
    height: HEIGHT_DEFAULT,
    backgroundColor: VARIABLE.colorWhite,
    border: `1px solid ${VARIABLE.colorD2}`,
    borderRadius: 3,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 15,
    cursor: 'pointer',

    text: {
      lineHeight: `${HEIGHT_DEFAULT}px`,
      fontSize: 14,
      color: VARIABLE.color75,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    },

    icon: {
      marginLeft: 20
    }
  },

  content: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    backgroundColor: VARIABLE.colorWhite,
    borderRadius: 3,
    boxShadow: VARIABLE.shadow3,

    search: {
      height: HEIGHT_DEFAULT,
      backgroundColor: VARIABLE.colorWhite,
      borderBottom: `1px solid ${VARIABLE.colorD2}`,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 15,

      input: {
        backgroundColor: 'transparent',
        flex: 10,
        height: HEIGHT_DEFAULT - 2,
        lineHeight: `${HEIGHT_DEFAULT - 2}px`,
        border: 'none',
        outline: 'none',
        fontSize: 14,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0
      },

      close: {
        marginLeft: 20
      }
    },

    list: {
      maxHeight: HEIGHT_DEFAULT * 3,
      overflow: 'auto',

      container: {},

      item: {
        cursor: 'pointer',
        height: HEIGHT_DEFAULT,
        lineHeight: `${HEIGHT_DEFAULT}px`,

        hover: {
          backgroundColor: VARIABLE.colorF7
        },

        selected: {
          pointerEvents: 'none'
        },

        icon: {
          opacity: 0,
          color: VARIABLE.colorPink,

          selected: {
            opacity: 1
          }
        },

        text: {
          flex: 10,
          fontSize: 14,
          lineHeight: `${HEIGHT_DEFAULT}px`,
          color: VARIABLE.color75,
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          paddingTop: 0,
          paddingRight: 15,
          paddingBottom: 0,
          paddingLeft: 15,

          selected: {
            color: VARIABLE.colorPink
          }
        }
      }
    }
  },

  selectBoxMobile: {
    width: `100%`,
    padding: `0px 38px 0px 15px`,
    fontSize: 16,
    border: `1px solid ${VARIABLE.colorD2}`,
    height: 40,
    lineHeight: '40px',
    color: VARIABLE.color75,
    whiteSpace: `nowrap`,
    textOverflow: `ellipsis`,
    overflow: `hidden`,
    borderRadius: 3,
    backgroundColor: VARIABLE.colorWhite,
    webkitAppearance: 'none',
    mozAppearance: 'none',
    appearance: 'none'
  },

  iconMobile: {
    position: VARIABLE.position.absolute,
    top: 0,
    right: 0,
    minWidth: 40,
    width: 40,
    height: 38,
    fontSize: 12,
    lineHeight: '38px',
    textAlign: 'center' as const,
    color: VARIABLE.color75,
    cursor: 'pointer',

    inner: {
      color: VARIABLE.color75,
      width: 14
    }
  }
} as any;
