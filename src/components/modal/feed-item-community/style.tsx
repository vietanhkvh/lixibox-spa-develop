import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [{}] as any,

    DESKTOP: [
      {
        width: '100%',
        height: '100%'
      }
    ] as any,

    GENERAL: [{}] as any
  }),

  wrap: {
    container: combineStyle({
      MOBILE: [
        {
          flexDirection: 'column'
        }
      ] as any,

      DESKTOP: [{}] as any,

      GENERAL: [
        {
          display: VARIABLE.display.flex,
          justifyContent: 'space-between',
          height: '100%'
        }
      ] as any
    }),

    leftCol: combineStyle({
      MOBILE: [
        {
          width: '100%',
          height: '100%',
          marginBottom: 10
        }
      ] as any,

      DESKTOP: [
        {
          flex: 10,
          height: '100%'
        }
      ] as any,

      GENERAL: [{}] as any
    }),

    rightCol: combineStyle({
      MOBILE: [{}] as any,
      DESKTOP: [
        {
          width: 400,
          height: '100%',
          maxHeight: '400px',
          overflowX: 'hidden',
          overflowY: 'auto'
        }
      ] as any,
      GENERAL: [{}] as any
    })
  }
} as any;
