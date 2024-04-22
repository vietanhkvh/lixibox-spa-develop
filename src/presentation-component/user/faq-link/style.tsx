import { combineStyle } from 'utils/responsive';
import * as VARIABLE from 'style/variable';

export const main = {
  container: {
    marginBottom: 0,
    padding: 17,
    display: 'flex',
    justifyContent: 'center'
  },

  link: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center'
  },

  messageIcon: {
    width: 90,
    height: 70,
    color: VARIABLE.colorBlack
  },

  messageInnerIcon: {
    width: 54
  },

  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  info: {},

  title: combineStyle({
    MOBILE: [{ fontSize: 14, lineHeight: '22px' }] as any,

    DESKTOP: [
      {
        fontSize: 16,
        lineHeight: '24px'
      }
    ] as any,

    GENERAL: [
      {
        fontWeight: VARIABLE.fontSemiBold,
        color: VARIABLE.color20,
        marginBottom: 2
      }
    ] as any
  }),

  description: {
    maxWidth: 180,

    fontSize: 13,
    fontWeight: VARIABLE.fontLight,
    lineHeight: '20px',
    color: VARIABLE.color20
  },

  angleIcon: {
    width: 50,
    height: 50,
    color: VARIABLE.color75
  },

  innerAngleIcon: {
    width: 9
  }
} as any;
