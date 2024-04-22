import * as LAYOUT from '../../../../style/layout';
import * as VARIABLE from '../../../../style/variable';

export default {
  display: 'block',
  height: 50,

  fixTop: {
    position: VARIABLE.position.fixed,
    width: '100%',
    height: 50,
    boxShadow: VARIABLE.shadowBlur
  },

  /** Menu icon in mobile */
  menuIcon: {
    width: 50,
    height: 50,
    color: VARIABLE.color4D,
    cursor: 'pointer',

    inner: {
      width: 20
    },

    hide: {
      display: 'none'
    }
  },

  logo: Object.assign({}, LAYOUT.flexContainer.center, LAYOUT.flexContainer.verticalCenter, {
    flex: 10,
    height: 50
  }),

  logoImg: {
    display: 'block',
    width: 212,
    height: 'auto'
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
  }
} as any;
