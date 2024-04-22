import * as VARIABLE from '../../style/variable';
import * as LAYOUT from '../../style/layout';

export default {
  visibility: VARIABLE.visible.hidden,
  position: VARIABLE.position.fixed,
  width: '100vw',
  height: 'calc(100% - var(--sticky-top-banner-height, 0px))',
  top: 'var(--sticky-top-banner-height, 0px)',
  left: 0,
  zIndex: VARIABLE.zIndexMax,

  show: {
    visibility: VARIABLE.visible.visible
  },

  overlay: {
    display: VARIABLE.display.block,
    position: VARIABLE.position.absolute,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: VARIABLE.zIndex1,
    background: VARIABLE.colorBlack05,
    transition: VARIABLE.transitionOpacity,
    opacity: 0,
    visibility: VARIABLE.visible.hidden,

    show: {
      opacity: 1,
      visibility: VARIABLE.visible.visible
    },

    blur: {
      background: VARIABLE.colorBlack04
    }
  },

  mobileOverlay: {
    position: VARIABLE.position.fixed,
    background: VARIABLE.colorWhite
  },

  mobileAlertOverlay: {
    background: VARIABLE.colorTransparent
  },

  subMobileAlertOverlay: {
    position: VARIABLE.position.absolute,
    borderBottom: `52px solid ${VARIABLE.colorWhite}`,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0
  },

  content: {
    position: VARIABLE.position.absolute,
    zIndex: VARIABLE.zIndex5,
    minWidth: 200,
    minHeight: 200,
    borderRadius: 8,
    boxShadow: VARIABLE.shadow4,
    transition: VARIABLE.transitionNormal,
    visibility: VARIABLE.visible.hidden,
    opacity: 0,
    background: VARIABLE.colorWhite,
    transform: `scale3d(0, 0, 0)`,

    desktopContent: {
      maxHeight: '90vh',
      overflow: 'auto'
    },

    show: {
      opacity: 1,
      visibility: VARIABLE.visible.visible,
      transform: `scale3d(1, 1, 1)`
    },

    inner: {
      width: '100%',
      padding: 20
    },

    innerWithShowDesktopTitle: {
      padding: '0 20px 20px'
    }
  },

  mobile: {
    container: Object.assign(
      {},
      LAYOUT.flexContainer.center,
      LAYOUT.flexContainer.verticalFlex,
      LAYOUT.flexContainer.verticalCenter,
      {
        visibility: VARIABLE.visible.hidden,
        position: VARIABLE.position.fixed,
        width: '100vw',
        height: 'calc(100% - var(--sticky-top-banner-height, 0px))',
        // transform: 'translateY(100%)',
        top: 'var(--sticky-top-banner-height, 0px)',
        left: 0,
        opacity: 0,
        zIndex: VARIABLE.zIndexMax,
        background: VARIABLE.colorWhite
        // transition: VARIABLE.transitionOpacity,
      }
    ),

    containerWithShow: {
      visibility: VARIABLE.visible.visible,
      opacity: 1
    },

    closeButton: {
      height: 50,
      width: 50,
      color: VARIABLE.color4D,
      position: VARIABLE.position.absolute,
      background: VARIABLE.colorWhite,
      top: 0,
      right: 0,
      cursor: 'pointer',
      zIndex: 50,

      inner: {
        width: 16
      }
    },

    header: {
      width: '100%',
      height: 50,
      minHeight: 50,
      background: VARIABLE.colorWhite,
      zIndex: VARIABLE.zIndex5,
      position: VARIABLE.position.relative,

      inner: {
        width: '100%',
        position: 'relative',

        textAlign: 'left' as const,

        marginBottom: 0,
        height: 50,
        display: VARIABLE.display.flex,
        alignItems: 'center'
      }
    },

    content: {
      width: '100%',
      maxWidth: '100%',
      height: 'calc(100% - 50px)',
      overflow: 'auto',
      padding: '0 20px 20px',
      boxSizing: 'border-box',
      background: VARIABLE.colorWhite,
      zIndex: VARIABLE.zIndex5,
      position: VARIABLE.position.relative
    },

    scrollView: {
      display: VARIABLE.display.block,
      overflowY: 'auto',
      width: '100%',
      height: '100%'
    }
  },

  mobileAlert: {
    container: {
      display: 'block',
      visibility: VARIABLE.visible.hidden,
      position: VARIABLE.position.fixed,
      width: '100vw',
      height: 'calc(100% + 50px)',
      bottom: 0,
      left: 0,
      opacity: 0,
      zIndex: VARIABLE.zIndexMax,
      paddingBottom: 0
    },

    containerWithShow: {
      visibility: VARIABLE.visible.visible,
      opacity: 1
    },

    content: {
      transition: VARIABLE.transitionNormal,
      overflowY: 'scroll',
      WebkitOverflowScrolling: 'touch',
      width: '100vw',
      maxWidth: '100vw',
      height: '100%',
      maxHeight: '100%',
      boxSizing: 'border-box',
      zIndex: 50,
      position: 'fixed',
      bottom: 0,
      left: 0,
      paddingBottom: 10,
      transform: `translateY(100%) translateZ(0)`,
      visibility: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'visible',
      justifyContent: 'flex-end',

      show: {
        visibility: 'visible',
        transform: `translateY(0) translateZ(0)`
      }
    }
  }
} as any;
