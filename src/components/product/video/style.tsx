import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  mobileTitle: {
    marginLeft: 10,
    textAlign: 'left' as const
  },

  videoContainer: {
    container: combineStyle({
      MOBILE: [
        {
          marginTop: 20,
          marginBottom: 30
        }
      ] as any,

      DESKTOP: [
        {
          marginBottom: 40
        }
      ] as any,

      GENERAL: [
        {
          backgroundColor: VARIABLE.colorBlack
        }
      ] as any
    }),

    iframeVideo: {
      paddingTop: '55%',
      position: VARIABLE.position.relative
    },

    video: {
      position: VARIABLE.position.absolute,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    }
  }
} as any;
