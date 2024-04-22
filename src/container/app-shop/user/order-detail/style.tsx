import * as VARIABLE from '../../../../style/variable';
import { combineStyle } from '../../../../utils/responsive';

export const main = {
  container: combineStyle({
    MOBILE: [{}] as any,
    DESKTOP: [{}] as any,

    GENERAL: [{ position: 'relative' }] as any
  }),

  detail: combineStyle({
    MOBILE: [{}] as any,
    DESKTOP: [
      {
        padding: '0 0 30px'
      }
    ] as any,

    GENERAL: [{ position: 'relative' }] as any
  }),

  heading: {
    height: 76,
    lineHeight: '76px',
    fontWeight: VARIABLE.fontSemiBold,
    fontSize: 18,
    color: VARIABLE.color20,
    padding: '0 20px'
  }
} as any;

export const placeholder = {
  container: {
    padding: '100px 20px',
    margin: '0 auto',
    maxWidth: 760,
    display: 'flex',
    flexDirection: 'column'
  },

  heading: {
    width: '50%',
    height: 40,
    marginBottom: 20
  },

  main: {
    width: '100%',
    height: 200,
    marginBottom: 10
  },

  item: {
    width: '80%',
    height: 30,
    marginBottom: 10
  }
} as any;
