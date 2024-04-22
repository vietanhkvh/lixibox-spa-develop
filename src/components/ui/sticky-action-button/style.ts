import * as VARIABLE from '../../../style/variable';

export default {
  button: {
    borderRadius: 8,
    marginTop: 13,
    marginBottom: 13,
    backgroundColor: VARIABLE.colorPrimary,

    titleStyle: {
      fontWeight: VARIABLE.fontSemiBold
    },

    styleIcon: {
      color: 'white'
    }
  },

  disabledButton: {
    filter: `opacity(0.25)`
  }
} as any;
