import { combineStyle } from '../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [],

    DESKTOP: [{}] as any,

    GENERAL: [
      {
        display: 'block',
        width: '100%'
      }
    ] as any
  }),

  cover: combineStyle({
    MOBILE: [
      {
        height: 100
      }
    ] as any,

    DESKTOP: [{ height: 300 }] as any,

    GENERAL: [
      {
        display: 'block',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        maxWidth: 1600,
        margin: '0 auto'
      }
    ] as any
  })
} as any;
