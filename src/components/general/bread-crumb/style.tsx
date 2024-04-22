import * as VARIABLE from '../../../style/variable';

export default {
  position: 'relative',
  background: VARIABLE.colorFA,
  zIndex: VARIABLE.zIndex5,
  height: 40,
  borderBottom: `1px solid ${VARIABLE.colorF5}`,

  wrap: {
    display: 'flex'
  },

  item: {
    position: 'relative'
  },

  title: {
    icon: {
      width: 32,
      height: 32,
      transform: 'rotate(45deg)',
      borderTop: `1px solid ${VARIABLE.colorE9}`,
      borderRight: `1px solid ${VARIABLE.colorE9}`,
      marginRight: 22
    },

    titleSubLink: {
      width: '100%',
      display: VARIABLE.display.block
    }
  },

  sub: {
    position: 'absolute',
    visibility: 'hidden',
    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
    top: 40,
    left: -20,
    paddingTop: 12,
    paddingRight: 0,
    paddingBottom: 12,
    paddingLeft: 0,
    background: VARIABLE.colorFA,
    transition: VARIABLE.transitionNormal,
    opacity: 0,
    transform: 'scaleY(0)',
    transformOrigin: 'top',

    show: {
      transform: 'scaleY(1)',
      opacity: 1,
      visibility: 'visible'
    }
  }
} as any;
