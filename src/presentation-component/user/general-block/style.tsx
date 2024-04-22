import { combineStyle } from 'utils/responsive';
import * as VARIABLE from 'style/variable';

export default {
  container: combineStyle({
    MOBILE: [{}] as any,

    DESKTOP: [
      {
        marginBottom: 20,
        boxShadow: VARIABLE.shadowBlur,
        borderRadius: 5
      }
    ] as any,

    GENERAL: [
      {
        overflow: 'hidden',
        background: VARIABLE.colorWhite
      }
    ] as any
  }),

  heading: combineStyle({
    MOBILE: [{ padding: '0 16px' }] as any,

    DESKTOP: [
      {
        padding: '0 20px'
      }
    ] as any,

    GENERAL: [
      {
        height: 50,
        display: 'flex',
        justifyContent: 'space-between'
      }
    ] as any
  }),

  title: combineStyle({
    MOBILE: [{ fontSize: 16 }] as any,

    DESKTOP: [
      {
        fontSize: 16
      }
    ] as any,

    GENERAL: [
      {
        fontWeightL: 500,
        color: VARIABLE.color20,
        lineHeight: '50px',
        paddingRight: 10,

        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    ] as any
  }),

  extraTitle: {
    lineHeight: '50px',

    fontSize: 13
  },

  content: {
    width: '100%'
  }
} as any;
