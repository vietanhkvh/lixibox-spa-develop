import * as VARIABLE from '../../../style/variable';

export default {
  wrap: {
    display: VARIABLE.display.flex,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 550,
    paddingTop: 50,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 70,
    margin: '0 auto'
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

  icon: {
    width: 200,
    height: 200,
    color: VARIABLE.color97,

    inner: {
      height: 180
    }
  },

  emptyContent: {
    marginBottom: 40,

    title: {
      fontSize: 24,
      lineHeight: '32px',
      marginBottom: 10,

      fontWeight: VARIABLE.fontBold,
      textAlign: 'center' as const,
      color: VARIABLE.color97
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
    color: VARIABLE.colorA2
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
    color: VARIABLE.colorA2,
    lineHeight: '42px',

    whiteSpace: 'nowrap',
    fontSize: 16,
    textTransform: 'uppercase'
  }
} as any;
