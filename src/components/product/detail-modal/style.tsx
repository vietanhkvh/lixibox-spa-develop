import * as VARIABLE from '../../../style/variable';

export default {
  width: `100%`,

  name: {
    display: 'block',
    width: '100%',

    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    textTransform: `capitalize`,
    color: VARIABLE.colorBlack,
    fontSize: 22,
    lineHeight: '24px',
    textAlign: 'left' as const
  },

  desc: {
    fontSize: 15,
    lineHeight: `18px`,
    color: VARIABLE.colorBlack08,
    textAlign: `justify`,
    paddingTop: 0,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20
  }
} as any;
