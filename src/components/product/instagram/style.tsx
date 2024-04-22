import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  mobileTitle: {
    marginLeft: 10,
    textAlign: 'left' as const
  },

  instagram: {
    container: combineStyle({
      MOBILE: [
        {
          paddingBottom: 20,
          paddingTop: 20
        }
      ] as any,

      DESKTOP: [
        {
          paddingTop: 20,
          paddingBottom: 20
        }
      ] as any,

      GENERAL: [{}] as any
    }),

    heading: {
      marginBottom: 30,

      title: combineStyle({
        MOBILE: [
          {
            fontSize: 25
          }
        ] as any,
        DESKTOP: [
          {
            fontSize: 32
          }
        ] as any,
        GENERAL: [
          {
            textAlign: 'center' as const,
            textTransform: 'uppercase',

            opacity: 0.8,
            marginBottom: 10,
            paddingLeft: 10,
            paddingRight: 10
          }
        ] as any
      }),

      boldTitle: combineStyle({
        MOBILE: [
          {
            fontSize: 25
          }
        ] as any,
        DESKTOP: [
          {
            fontSize: 32
          }
        ] as any,
        GENERAL: [
          {
            paddingLeft: 5
          }
        ] as any
      }),

      icon: {
        display: VARIABLE.display.block,
        margin: '0 auto'
      }
    },

    list: {
      container: combineStyle({
        MOBILE: [
          {
            flexWrap: 'wrap',
            paddingLeft: 5,
            paddingRight: 5
          }
        ] as any,

        DESKTOP: [{}] as any,

        GENERAL: [{ display: VARIABLE.display.flex }] as any
      }),

      link: combineStyle({
        MOBILE: [{ width: '50%', padding: 5 }] as any,

        DESKTOP: [{ flex: 1, padding: 10 }] as any,

        GENERAL: [
          {
            cursor: 'pointer',
            display: VARIABLE.display.block
          }
        ] as any
      }),

      img: {
        borderRadius: 10,
        border: `1px solid ${VARIABLE.colorF0}`,
        paddingTop: '100%',
        width: '100%',
        display: VARIABLE.display.block,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    }
  }
} as any;
