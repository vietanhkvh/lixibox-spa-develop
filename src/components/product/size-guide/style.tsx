import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [{}] as any,

    DESKTOP: [{}] as any,

    GENERAL: [{}] as any
  }),

  heading: {
    fontSize: 14,
    lineHeight: '22px',
    color: VARIABLE.colorBlack04,
    marginBottom: 5
  },

  list: {
    overflow: 'hidden',
    padding: '16px 16px 0'
  },

  item: {
    marginBottom: 16,
    borderBottom: `1px solid ${VARIABLE.colorE5}`,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer'
  },

  title: {
    fontSize: 15,
    color: VARIABLE.color4D
  },

  action: {
    fontSize: 12,
    color: VARIABLE.color4D
  },
  img: {
    width: '100%',
    height: 'auto'
  }
} as any;
