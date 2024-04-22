import { combineStyle } from '../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [{ height: 'calc(var(--wh) - 60px - 52px)' }] as any,

    DESKTOP: [{ height: 'calc(100vh - 50px)' }] as any,

    GENERAL: [
      {
        width: '100%',
        frameBorder: 0,
        allowFullScreen: true,
        display: 'block'
      }
    ] as any
  })
} as any;
