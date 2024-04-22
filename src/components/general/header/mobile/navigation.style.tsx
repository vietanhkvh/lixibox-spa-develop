import * as VARIABLE from '../../../../style/variable';

const Styles = {
  display: 'block',
  height: 50,

  fixTop: {
    position: 'fixed',
    width: '100%',
    height: 50,
    backgroundColor: VARIABLE.colorPink,
    boxShadow: VARIABLE.shadowBlur
  },

  /** Menu icon in mobile */
  menuIcon: {
    width: 50,
    height: 50,
    color: VARIABLE.colorWhite,
    cursor: 'pointer',

    inner: {
      width: 18
    },

    hide: {
      display: 'none'
    }
  },

  logo: {
    height: 50,

    line: {
      width: 30,
      height: 50,
      color: VARIABLE.colorWhite,
      marginRight: 10,

      inner: {
        width: 30
      }
    },

    text: {
      width: 120,
      color: VARIABLE.colorWhite,

      inner: {
        width: 120
      }
    }
  },

  inputSearch: {
    outline: 'none',
    border: 'none',
    height: 34,
    borderRadius: 17,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 8,
    flex: 10,
    background: VARIABLE.colorWhite,
    paddingTop: 0,
    paddingRight: 15,
    paddingBottom: 0,
    paddingLeft: 15,
    textTransform: 'captialize',
    fontSize: 13,

    hide: {
      display: 'none'
    }
  },

  /** Left menu in mobile */
  menuMobile: {
    display: 'block',
    transition: VARIABLE.transitionNormal,
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    opacity: 1,
    overflowX: 'hidden',
    overflowY: 'auto',

    left: {
      left: '-100%',
      opacity: 0,
      visibility: VARIABLE.visible.hidden,

      active: {
        left: 0,
        opacity: 1,
        visibility: VARIABLE.visible.visible
      }
    },

    right: {
      right: '-100%',

      active: {
        right: 0
      }
    }
  }
};

export default Styles;
