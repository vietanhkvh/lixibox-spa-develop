import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  contentWrap: {
    paddingLeft: 10,
    paddingRight: 10,

    title: {
      fontSize: 16,
      lineHeight: '20px',
      color: VARIABLE.colorBlack09,

      width: '100%',
      fontWeight: 900,
      display: VARIABLE.display.block,
      marginBottom: 10,
      textTransform: 'capitalize',
      textAlign: 'justify' as const
    },

    description: {
      fontSize: 14,
      lineHeight: '20px',
      maxHeight: 60,
      overflow: 'hidden',
      color: VARIABLE.colorBlack06,
      textAlign: 'justify' as const,
      width: '100%',
      marginBottom: 10
    }
  },

  imgText: {
    position: VARIABLE.position.absolute,
    fontSize: 24,
    lineHeight: '32px',
    width: '70%',
    padding: '10px 20px',
    textAlign: 'left' as const,
    left: 0,
    bottom: 20,
    color: VARIABLE.colorBlack07
  },

  headerMenuContainer: {
    display: VARIABLE.display.block,
    position: VARIABLE.position.relative,
    height: 50,
    maxHeight: 50,

    headerMenuWrap: {
      width: '100%',
      height: '100%',
      display: VARIABLE.display.flex,
      position: VARIABLE.position.relative,

      backgroundBlur: {
        backgroundColor: VARIABLE.colorWhite,
        position: VARIABLE.position.absolute,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: VARIABLE.zIndexNegative
      }
    }
  },

  headerMenu: {
    display: VARIABLE.display.flex,
    alignItems: 'center',
    justifyContent: 'flex-start',

    borderBottom: `1px solid ${VARIABLE.colorE5}`,
    height: '100%',
    width: '100%',
    position: VARIABLE.position.absolute,
    top: 0,
    left: 0,
    zIndex: VARIABLE.zIndex9,

    isTop: {
      position: VARIABLE.position.fixed,
      top: 0,
      left: 0,
      width: '100%',
      height: 50
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
          display: VARIABLE.display.inlineBlock,
          textTransform: 'capitalize'
        }
      ] as any,

      DESKTOP: [
        {
          fontSize: 40,
          height: 96,
          lineHeight: '96px',
          textTransform: 'capitalize',

          letterSpacing: 2,
          fontWeight: VARIABLE.fontRegular
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
    opacity: 0
  },

  isShowing: {
    transition: VARIABLE.transitionNormal,
    visibility: VARIABLE.visible.visible,
    opacity: 1
  },

  category: {
    display: VARIABLE.display.block,
    fontSize: 14,
    lineHeight: '44px',
    height: 44,
    maxHeight: 44,

    color: VARIABLE.colorBlack
  },

  categoryDetail: {
    largeItem: {
      display: VARIABLE.display.block,
      width: '100%',
      cursor: 'pointer',
      marginBottom: 20,

      itemImage: (image: string) => ({
        width: '100%',
        paddingTop: '65%',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: VARIABLE.position.relative,
        transition: VARIABLE.transitionNormal,
        marginBottom: 10
      })
    },

    listSubItem: {
      width: '100%',
      display: VARIABLE.display.flex,
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      marginBottom: 20,

      subItem: {
        width: 'calc(50% - 10px)',
        display: VARIABLE.display.block,
        marginBottom: 20,

        itemImage: (image: string) => ({
          width: '100%',
          paddingTop: '65%',
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          marginBottom: 10,
          posicontion: VARIABLE.position.relative,
          transition: VARIABLE.transitionNormal
        })
      }
    }
  },

  customStyleLoading: {
    height: 80
  }
} as any;
