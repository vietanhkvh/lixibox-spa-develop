import * as VARIABLE from '../../../style/variable';

const STYLE = {
  navigation: {
    height: 70,
    width: '100%',
    borderTop: '1px solid #9b9b9b',
    borderBottom: '1px solid #9b9b9b',
    marginBottom: 20,
    position: VARIABLE.position.relative,

    nav: {
      width: '100%',
      textAlign: 'center' as const,

      link: {
        active: {
          color: VARIABLE.colorPink
        }
      }
    }
  },

  /** Logo desktop */
  logo: {
    height: 33,
    margin: '35px auto 25px',
    cursor: 'pointer'
  },

  logoImg: {
    height: '100%'
  },

  /** Search group: dropdown - input - button */
  search: {
    flex: 10,
    height: 40,
    border: `1px solid ${VARIABLE.colorE5}`,

    /** Dropdown to select category */
    dropdown: {
      borderRight: `1px solid ${VARIABLE.colorE5}`,
      cursor: 'pointer',
      position: 'relative',

      text: {
        width: 125,
        lineHeight: '38px',
        height: 38,
        color: VARIABLE.color75,

        paddingTop: 0,
        paddingRight: 48,
        paddingBottom: 0,
        paddingLeft: 20,
        position: 'relative',
        display: 'block',
        whiteSpace: 'nowrap',

        icon: {
          position: 'absolute',
          right: 0,
          top: 0,
          width: 48,
          height: 38,
          color: VARIABLE.color75,

          inner: {
            width: 11
          }
        }
      },

      list: {
        width: 125,
        backgroundColor: VARIABLE.colorWhite,
        boxShadow: VARIABLE.shadowBlur,
        position: 'absolute',
        left: 0,
        top: 39,
        paddingTop: 10,
        paddingRight: 0,
        paddingBottom: 10,
        paddingLeft: 0,
        overflow: 'hidden',
        transition: VARIABLE.transitionNormal,

        visible: {
          height: 156,
          paddingTop: 10,
          paddingRight: 0,
          paddingBottom: 10,
          paddingLeft: 0,
          visibility: 'visible',
          opacity: 1
        },

        hidden: {
          height: 0,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          visibility: 'hidden',
          opacity: 0
        }
      }
    },

    groupSeachImput: {
      display: 'flex',
      justifyContent: 'space-between',
      flex: 10,
      position: VARIABLE.position.relative,
      zIndex: VARIABLE.zIndex1,

      overlay: {
        position: VARIABLE.position.fixed,
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        background: VARIABLE.colorTransparent,
        zIndex: VARIABLE.zIndexNegative
      }
    },

    sugestion: {
      position: VARIABLE.position.absolute,
      backgroundColor: VARIABLE.colorWhite,
      boxShadow: VARIABLE.shadowBlur,
      width: '100%',
      left: 0,
      top: 39,

      group: {},

      heading: {
        height: 30,
        lineHeight: '30px',
        background: VARIABLE.colorF0,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 13
      },

      row: {
        text: {
          fontSize: 13,
          color: VARIABLE.color4D,

          highLight: {
            color: VARIABLE.colorPink
          }
        }
      }
    },

    /** Input search */
    input: {
      flex: 10,
      border: 'none',
      outline: 'none',
      fontSize: '14px',
      color: VARIABLE.color4D,
      paddingTop: 0,
      paddingRight: 15,
      paddingBottom: 0,
      paddingLeft: 15
    },

    /** Button search */
    button: {
      inner: {
        width: 18
      }
    }
  },

  icon: {
    minWidth: 50,
    width: 50,
    height: 50,
    color: VARIABLE.colorBlack07,
    cursor: 'pointer',

    inner: {
      width: 20,
      height: 20
    },

    innermenu: {
      height: 12
    }
  }
} as any;

export default STYLE;
