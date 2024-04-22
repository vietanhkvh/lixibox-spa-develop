import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [
      {
        minWidth: 320
      }
    ] as any,

    DESKTOP: [
      {
        minWidth: 500
      }
    ] as any,

    GENERAL: [
      {
        display: VARIABLE.display.block,
        paddingTop: 0,
        paddingBottom: 0,
        top: 0,
        left: 0,

        maxWidth: '100vw',
        width: '100%',
        height: '100%',
        zIndex: VARIABLE.zIndexMax,
        backgroundColor: VARIABLE.colorWhite,
        transition: VARIABLE.transitionNormal
      }
    ] as any
  }),

  header: {
    width: '100%',
    height: 50,
    minHeight: 50,
    display: VARIABLE.display.flex,
    alignItems: 'center',
    justifyContent: 'center',

    title: {
      display: VARIABLE.display.inlineBlock,
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: VARIABLE.colorBlack,
      fontSize: 20,
      lineHeight: '40px',
      height: 40,
      letterSpacing: -0.5,
      flex: 10,
      marginLeft: 10
    },

    icon: {
      width: 35,
      height: 50,
      color: VARIABLE.color4D
    },

    innerIcon: {
      width: 16
    }
  },

  // content: { paddingTop: 52 },

  addressGroup: {
    height: '100%',
    overflow: 'hidden'
  },

  addressList: (number) => ({
    display: VARIABLE.display.flex,
    transform: `translate3d(${number}%, 0, 0)`,
    width: '300%',
    height: 'calc(100% - 124px)',
    transition: VARIABLE.transitionNormal
  }),

  address: {
    transition: VARIABLE.transitionNormal,
    flex: 1,
    backgroundColor: VARIABLE.colorWhite
  },

  searchContainer: {
    marginTop: 52,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    position: 'relative',

    search: {
      width: '100%',
      height: 40,
      minHeight: 40,
      borderRadius: 8,
      paddingRight: 15,
      paddingLeft: 40,
      color: VARIABLE.color8E,
      background: VARIABLE.colorF5,
      border: `none`,
      boxShadow: 'none',
      outline: 'none',
      top: 0
    }
  }
} as any;
