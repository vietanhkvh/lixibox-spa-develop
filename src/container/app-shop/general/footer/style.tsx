import * as VARIABLE from '../../../../style/variable';
import { combineStyle } from '../../../../utils/responsive';

export default {
  container: (isArticle = false, isDisplay) =>
    combineStyle({
      MOBILE: [{}, { paddingBottom: isArticle ? 64 : 0 }] as any,
      DESKTOP: [{ paddingBottom: 0 }] as any,

      GENERAL: [
        {
          transition: VARIABLE.transitionNormal,
          display: 'block',
          opacity: isDisplay ? 1 : 0,
          transform: isDisplay ? 'translate3D(0,0,0)' : 'translate3D(0, 30px, 0)',
          visibility: isDisplay ? 'visible' : 'hidden',
          position: 'relative'
        }
      ] as any
    })
} as any;
