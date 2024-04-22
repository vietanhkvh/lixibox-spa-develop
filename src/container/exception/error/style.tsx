import * as VARIABLE from '../../../style/variable';

export default {
  wrap: {
    display: VARIABLE.display.flex,
    background: VARIABLE.colorWhite,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 550,
    paddingTop: 50,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 30,
    zIndex: VARIABLE.zIndexMax,
    position: 'relative',
    margin: '50px auto'
  },

  overlay: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    background: VARIABLE.colorBlack08,
    zIndex: VARIABLE.zIndexMax,
    top: 0,
    left: 0
  },

  image: {
    display: VARIABLE.display.block,
    width: 300,
    height: 'auto',
    minWidth: 100,
    minHeight: 100,
    marginBottom: 10,
    pointerEvents: 'none'
  },

  emptyContent: {
    marginBottom: 40,

    title: {
      fontSize: 24,
      lineHeight: '32px',
      marginBottom: 10,

      fontWeight: VARIABLE.fontBold,
      textAlign: 'center' as const,
      color: VARIABLE.color75
    },

    description: {
      fontSize: 16,
      color: VARIABLE.color97,
      textAlign: 'center' as const,
      width: '100%',
      margin: '0 auto'
    }
  },

  linkNav: {
    width: '100%',
    display: VARIABLE.display.flex,
    flexWrap: 'wrap',
    justifyContent: 'center'
  },

  iconShop: {
    width: 40,
    height: 40,
    color: VARIABLE.colorA2
  },

  iconMagazine: {
    width: 40,
    height: 40,
    color: VARIABLE.colorWhite
  },

  iconInner: {
    height: 18
  },

  textShop: {
    display: VARIABLE.display.block,
    color: VARIABLE.colorA2,
    lineHeight: '42px',

    whiteSpace: 'nowrap',
    fontSize: 16,
    textTransform: 'uppercase'
  },

  textMagazine: {
    display: VARIABLE.display.block,
    color: VARIABLE.colorWhite,
    lineHeight: '42px',

    whiteSpace: 'nowrap',
    fontSize: 16,
    textTransform: 'uppercase'
  }
} as any;
