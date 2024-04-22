import * as VARIABLE from '../../../style/variable';

export default {
  position: VARIABLE.position.relative,
  top: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: 50,
  zIndex: VARIABLE.zIndex9,
  transition: VARIABLE.transitionNormal,
  backgroundColor: VARIABLE.colorWhite,
  borderBottom: `1px solid ${VARIABLE.colorBlack005}`,

  noShadow: {
    boxShadow: 'none'
  },

  shoppingCart: {
    marginLeft: '0',
    position: 'relative',

    value: {
      position: VARIABLE.position.absolute,
      display: 'inline-block',
      backgroundColor: VARIABLE.colorRed,
      color: VARIABLE.colorWhite,
      height: 16,
      lineHeight: '18px',
      fontSize: 11,
      fontStyle: 'normal',
      borderRadius: 3,
      paddingTop: 0,
      paddingRight: 3,
      paddingBottom: 0,
      paddingLeft: 3,
      right: 10,
      top: 10
    }
  },

  menuIcon: {
    minWidth: 50,
    width: 50,
    height: 50,
    color: VARIABLE.colorBlack08,
    cursor: 'pointer',

    inner: {
      width: 16,
      height: 16
    },

    innerInfo: {
      width: 16,
      height: 12
    },

    innermenu: {
      height: 18
    }
  },

  inputSearch: {
    outline: 'none',
    border: 'none',
    height: 34,
    borderRadius: 17,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 8,
    marginRight: 8,
    flex: 10,
    background: VARIABLE.colorWhite,
    color: VARIABLE.colorPink,
    paddingTop: 0,
    paddingRight: 15,
    paddingBottom: 0,
    paddingLeft: 15,
    textTransform: 'captialize',
    fontSize: 13,
    transition: VARIABLE.transitionNormal
  },

  searchTarget: {
    flex: 10,
    borderRadius: 17,
    background: VARIABLE.colorBlack005,
    marginLeft: 8,
    marginRight: 8,

    icon: {
      height: 34,
      width: 14,
      color: VARIABLE.colorBlack08,
      marginRight: 5,

      inner: {
        width: 11
      }
    },

    text: {
      height: 34,
      lineHeight: '34px',
      fontSize: 13,

      color: VARIABLE.colorBlack08
    }
  },

  textTitle: {
    height: 50,
    lineHeight: '50px',
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
    textAlign: 'center' as const,
    color: VARIABLE.colorBlack08,
    fontSize: 16,

    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
} as any;
