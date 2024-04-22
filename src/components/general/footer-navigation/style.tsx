import * as VARIABLE from '../../../style/variable';

export default {
  container: {
    width: '100%',
    background: VARIABLE.colorBlack09
  },

  wrap: {
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'space-between',
    display: 'flex'
  },

  left: {
    display: 'flex'
  },

  right: {},

  text: {
    fontSize: 11,
    lineHeight: '18px',

    color: VARIABLE.colorWhite05,
    textAlign: 'left' as const
  },

  address: {
    width: 240,
    paddingRight: 60,
    textAlign: 'right' as const
  },

  link: {
    marginRight: 10,
    display: 'block'
  },

  logo: {
    display: 'block',
    width: 120,
    height: 'auto'
  },

  mapIcon: {
    display: 'inline-block',
    width: 16,
    height: 22,
    marginRight: 5,
    position: 'relative',
    top: 2,
    color: VARIABLE.colorWhite07,

    inner: {
      width: 8
    }
  }
} as any;
