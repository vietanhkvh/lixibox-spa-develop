import { combineStyle } from '../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [{ height: '100%' }] as any,

    DESKTOP: [
      {
        height: 600
      }
    ] as any,

    GENERAL: [
      {
        width: '100%',
        frameBorder: 0,
        scrolling: 'no',
        allowFullScreen: true
      }
    ] as any
  })
} as any;
