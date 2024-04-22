import * as VARIABLE from '../../../style/variable';

export default {
  // appShopContainer: {
  //   display: VARIABLE.display.block,
  //   overflowY: 'auto',
  //   height: 'auto',
  // },

  desktop: {
    display: VARIABLE.display.block,
    // // overflowY: 'hidden',
    // minHeight: 400
    minHeight: 'calc(100vh - 500px)'
  },

  mobile: {
    width: '100vw',
    maxWidth: 1024,
    margin: '0 auto',
    height: '100%',
    display: 'block',

    container: {
      display: VARIABLE.display.block,
      flex: 10,
      width: '100%',
      overflowX: 'visible',
      overflowY: 'visible',
      transition: VARIABLE.transitionNormal,
      paddingTop: 0
    },

    containerDisableScroll: {
      // height: '100vh',
    },

    scale: {
      transition: VARIABLE.transitionNormal,
      boxShadow: VARIABLE.shadowBlurSort,
      transform: 'scale(0.9)'
    }
  }
} as any;
