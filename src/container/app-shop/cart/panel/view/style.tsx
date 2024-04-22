import * as VARIABLE from '../../../../../style/variable';
import * as LAYOUT from '../../../../../style/layout';
import { combineStyle } from '../../../../../utils/responsive';

export default {
  backgroundColor: VARIABLE.colorF5,
  display: VARIABLE.display.flex,
  flexDirection: 'column',
  minHeight: '100vh',

  mobile: {
    backgroundColor: VARIABLE.colorF5,
    display: VARIABLE.display.flex,
    flexDirection: 'column',
    height: '100%'
  },

  mobileSuccessPhase: {
    marginBottom: 10
  },

  container: {
    height: '100%',
    overflow: 'visible',
    position: VARIABLE.position.relative,
    WebkitOverflowScrolling: 'touch',
    overflowScrolling: 'touch',
    marginTop: 50
  },

  actionButton: {
    backgroundColor: VARIABLE.colorWhite,
    display: VARIABLE.display.flex,
    justifyContent: 'space-between',
    height: 60,
    minHeight: 60,
    position: VARIABLE.position.fixed,
    zIndex: VARIABLE.zIndex9,
    width: '100%',
    top: 0,
    left: 0,
    alignItems: 'center',
    paddingRight: 10,
    boxShadow: VARIABLE.shadowBlurSort,

    stepGroup: {
      display: VARIABLE.display.flex,
      height: '100%',
      alignItems: 'center'
    },

    mainButton: (withMargin: boolean) => ({
      width: 115,
      margin: withMargin ? '0 12px 0 12px' : 0
    }),

    iconButton: {
      opacity: 1,
      width: 50,
      height: 20,
      color: VARIABLE.colorBlack,

      inner: {
        opacity: 1,
        width: 10,
        height: 16
      }
    }
  },

  iconPhase: {
    opacity: 1,
    width: 27,
    height: 27,
    color: VARIABLE.colorWhite,
    backgroundColor: VARIABLE.color3E,
    borderRadius: 15,

    inner: {
      opacity: 1,
      width: 13.83,
      height: 13.83
    },

    disabled: {
      backgroundColor: VARIABLE.colorE4
    }
  },

  iconDivider: {
    opacity: 1,
    width: 34,
    height: 27,
    color: VARIABLE.color3E,

    inner: {
      opacity: 1,
      width: 20,
      height: 2
    },

    disabled: {
      color: VARIABLE.colorE4
    }
  },

  summaryCheckOutPopup: (isShow: boolean) =>
    Object.assign(
      {},
      {
        backgroundColor: VARIABLE.colorWhite,
        position: VARIABLE.position.fixed,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        transition: VARIABLE.transitionNormal,
        zIndex: VARIABLE.zIndex9
      },
      true === isShow
        ? {
            transform: 'translateY(0%)',
            opacity: 1,
            visibility: VARIABLE.visible.visible
          }
        : {
            transform: 'translateY(100%)',
            opacity: 0.5,
            visibility: VARIABLE.visible.hidden
          }
    ),

  wrapLayoutDesktop: {
    paddingTop: 30,
    paddingBottom: 0
  },

  splitLayout: {
    height: '100%'
  },

  blockItem: {
    backgroundColor: VARIABLE.colorWhite,
    borderRadius: 0,
    boxShadow: VARIABLE.shadowBlurSort
  },

  buttonNavigation: {
    container: combineStyle({
      MOBILE: [{ marginBottom: 0 }] as any,
      DESKTOP: [{ marginBottom: 0 }] as any,
      GENERAL: [{ display: VARIABLE.display.flex }] as any
    }),

    modal: combineStyle({
      MOBILE: [
        {
          width: '100%',
          display: VARIABLE.display.flex,
          padding: '10px 10px',
          minHeight: 64,
          maxHeight: 64,
          boxShadow: `${VARIABLE.colorBlack01} 0px -5px 7px`,
          bottom: 0,
          left: 0,
          zIndex: VARIABLE.zIndex9,
          backgroundColor: VARIABLE.colorF0,
          alignItems: 'center',
          position: VARIABLE.position.fixed
        }
      ] as any,

      DESKTOP: [{ width: '50%' }] as any,
      GENERAL: [{ margin: '0 auto' }] as any
    }),

    margin: ({ isLeft }) =>
      combineStyle({
        MOBILE: [{ marginTop: 0, marginBottom: 0 }, true === isLeft ? { marginLeft: 5 } : { marginRight: 5 }] as any,
        DESKTOP: [{ marginBottom: 0 }, true === isLeft ? { marginLeft: 10 } : { marginRight: 10 }] as any,
        GENERAL: [{ marginTop: 0 }] as any
      }),

    disabled: {
      backgroundColor: VARIABLE.color97,
      opacity: 0.7
    }
  },

  wrapIntroduce: {
    display: VARIABLE.display.flex,
    alignItems: 'center',
    cursor: 'pointer'
  },

  blockIntroduce: {
    backgroundColor: VARIABLE.colorWhite,
    borderRadius: 8,
    boxShadow: VARIABLE.shadowBlurSort,
    marginTop: 15,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,

    text: {
      padding: `10px 0`,
      fontSize: 13,
      color: VARIABLE.colorRed,

      flex: 10,
      marginLeft: 10
    },

    icon: {
      width: 15,
      height: 15,
      color: VARIABLE.colorRed
    },

    innerIcon: {
      width: 15
    }
  },

  nav: {
    container: combineStyle({
      MOBILE: [{ marginLeft: 10 }] as any,

      DESKTOP: [{}] as any,

      GENERAL: [
        LAYOUT.flexContainer,
        LAYOUT.flexContainer.justify,
        {
          height: '100%'
        }
      ] as any
    }),

    item: {
      container: (isActive: boolean) =>
        Object.assign(
          {},
          LAYOUT.flexContainer,
          LAYOUT.flexContainer.justify,
          {
            position: VARIABLE.position.relative,
            alignItems: 'center',
            height: '100%',
            paddingLeft: 8,
            paddingRight: 8
          },

          isActive && {
            background: VARIABLE.colorF0,
            marginLeft: 5,
            marginRight: 5,
            paddingLeft: 8,
            paddingRight: 8
          }
        ),

      number: (isActive: boolean) =>
        Object.assign(
          {},
          {
            color: VARIABLE.color4D,
            fontSize: 10
          },

          isActive && {}
        ),

      title: (isActive: boolean) =>
        Object.assign(
          {},
          {
            display: VARIABLE.display.none,
            color: VARIABLE.color4D,
            marginLeft: 5,

            textTransform: 'uppercase',
            fontSize: 10
          },

          isActive && {
            display: VARIABLE.display.block,
            color: VARIABLE.color4D
          }
        ),

      edgeLeft: {
        position: VARIABLE.position.absolute,
        width: 12,
        height: '100%',
        background: VARIABLE.colorF0,
        transform: 'skewX(-12deg)',
        top: 0,

        left: -5
      },

      edgeRight: {
        position: VARIABLE.position.absolute,
        width: 12,
        height: '100%',
        background: VARIABLE.colorF0,
        transform: 'skewX(-12deg)',
        top: 0,

        right: -5
      }
    }
  }
} as any;
