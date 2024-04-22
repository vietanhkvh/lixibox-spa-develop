import * as VARIABLE from '../../../../style/variable';
import { combineStyle } from '../../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [
      {
        paddingLeft: 10,
        paddingRight: 10
      }
    ] as any,
    DESKTOP: [{}] as any,
    GENERAL: [{}] as any
  }),

  headerMenuContainer: {
    display: VARIABLE.display.block,
    position: VARIABLE.position.relative,
    height: 50,
    maxHeight: 50,
    marginBottom: 5,

    headerMenuWrap: {
      width: '100%',
      height: '100%',
      display: VARIABLE.display.flex,
      position: VARIABLE.position.relative,
      zIndex: VARIABLE.zIndex9
    },

    headerMenuWrapBlur: {
      background: VARIABLE.colorWhite,
      position: VARIABLE.position.absolute,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: VARIABLE.zIndexNegative
    },

    headerMenu: {
      display: VARIABLE.display.flex,
      alignItems: 'center',
      justifyContent: 'flex-start',

      borderBottom: `1px solid ${VARIABLE.colorF0}`,
      height: '100%',
      width: '100%',
      position: VARIABLE.position.absolute,
      top: 0,
      left: 0,

      isTop: {
        position: VARIABLE.position.fixed,
        top: 0,
        left: 0,
        width: '100%',
        height: 50,
        backgroundColor: VARIABLE.colorWhite,
        zIndex: VARIABLE.zIndex9
      },

      textBreadCrumb: combineStyle({
        MOBILE: [
          {
            fontSize: 15,
            lineHeight: '50px',
            height: '100%',
            width: '100%',

            paddingLeft: 10,
            color: VARIABLE.colorBlack,
            display: VARIABLE.display.inlineBlock
          }
        ] as any,

        DESKTOP: [
          {
            fontSize: 18,
            height: 60,
            lineHeight: '60px',
            textTransform: 'capitalize'
          }
        ] as any,

        GENERAL: [
          {
            color: VARIABLE.colorBlack,
            cursor: 'pointer'
          }
        ] as any
      }),

      icon: (isOpening) => ({
        width: 50,
        height: 50,
        color: VARIABLE.colorBlack08,
        transition: VARIABLE.transitionNormal,
        transform: isOpening ? 'rotate(-180deg)' : 'rotate(0deg)'
      }),

      inner: {
        width: 10
      }
    },

    overlay: {
      position: VARIABLE.position.fixed,
      width: '100vw',
      height: '100vh',
      top: 100,
      left: 0,
      zIndex: VARIABLE.zIndex8,
      background: VARIABLE.colorBlack06,
      transition: VARIABLE.transitionNormal
    }
  },

  categoryList: {
    position: VARIABLE.position.absolute,
    paddingTop: 15,
    paddingBottom: 15,
    top: 50,
    left: 0,
    width: '100%',
    zIndex: VARIABLE.zIndex9,
    backgroundColor: VARIABLE.colorWhite,
    paddingLeft: 10,
    display: VARIABLE.display.block,
    borderBottom: `1px solid ${VARIABLE.colorE5}`,
    visibility: VARIABLE.visible.hidden,
    opacity: 0,

    category: {
      display: VARIABLE.display.block,
      fontSize: 14,
      lineHeight: '44px',
      height: 44,
      maxHeight: 44,

      color: VARIABLE.colorBlack
    }
  },

  isShowing: {
    transition: VARIABLE.transitionNormal,
    visibility: VARIABLE.visible.visible,
    opacity: 1
  },

  mainImg: {
    width: '100%',
    height: 'auto',
    display: VARIABLE.display.block,
    marginTop: 5,
    marginBottom: 5
  },

  smallImg: combineStyle({
    MOBILE: [
      {
        width: '100%'
      }
    ] as any,

    DESKTOP: [
      {
        width: 'calc(50% - 5px)'
      }
    ] as any,

    GENERAL: [
      {
        display: VARIABLE.display.block,
        marginBottom: 10,
        height: 'auto'
      }
    ] as any
  }),

  img: {
    width: '100%',
    height: 'auto'
  },

  specialSmallList: {
    display: VARIABLE.display.flex,
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
} as any;
