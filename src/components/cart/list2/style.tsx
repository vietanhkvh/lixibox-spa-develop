import * as VARIABLE from '../../../style/variable';

export default {
  container: (isEmpty: boolean, style) =>
    Object.assign(
      {},
      {
        display: isEmpty ? VARIABLE.display.flex : VARIABLE.display.block,
        height: 'auto'
        // minHeight: `calc(100% - 140px)`
      },
      style
    ),

  readOnlyMode: {
    paddingBottom: 10,
    overflowY: 'scroll',
    maxHeight: 170
  },

  loadingMode: {
    position: 'relative'
  },

  loadingPanel: {
    zIndex: VARIABLE.zIndex9,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: VARIABLE.colorWhite09,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
} as any;
