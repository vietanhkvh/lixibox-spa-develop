import * as LAYOUT from 'style/layout';
import * as VARIABLE from 'style/variable';

export default {
  container: {
    transition: VARIABLE.transitionNormal,
    display: VARIABLE.display.flex,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    position: VARIABLE.position.fixed,
    width: '100%',
    maxWidth: '100%',
    height: 'auto',
    zIndex: VARIABLE.zIndexMax,
    transform: 'translateY(-50%)',
    visibility: VARIABLE.visible.hidden,
    opacity: 0,
    top: 'var(--sticky-top-banner-height, 0px)'
  },

  show: {
    transition: VARIABLE.transitionNormal,
    transform: 'translateY(0%)',
    visibility: VARIABLE.visible.visible,
    opacity: 1
  },

  item: Object.assign({}, LAYOUT.flexContainer.justify, LAYOUT.flexContainer.verticalCenter, {
    transition: VARIABLE.transitionNormal,
    background: VARIABLE.colorWhite,
    boxShadow: VARIABLE.shadowBlur,
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderLeft: `5px solid ${VARIABLE.colorPink}`,
    position: VARIABLE.position.relative
  }),

  icon: {
    flex: 1,
    width: 50,
    minWidth: 50,
    height: 50,
    color: VARIABLE.colorPink,
    marginRight: 10,
    marginLeft: 10
  },

  link: {
    position: VARIABLE.position.absolute,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: VARIABLE.zIndex1
  },

  iconInner: {
    width: 30,
    height: 30
  },

  info: {
    flex: 10,

    title: {
      lineHeight: '18px',
      fontSize: 16,
      color: VARIABLE.colorBlack,
      marginBottom: 5
    },

    content: {
      fontSize: 14,
      lineHeight: '18px',
      color: VARIABLE.color75
    },

    textBold: {
      color: VARIABLE.colorPink
    }
  },

  iconClose: {
    cursor: 'pointer',
    flex: 1,
    width: 50,
    minWidth: 50,
    height: 50,
    color: VARIABLE.colorBlack,
    zIndex: VARIABLE.zIndex2,

    inner: {
      width: 14,
      height: 14
    }
  }
} as any;
