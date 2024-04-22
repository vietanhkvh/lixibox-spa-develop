import * as VARIABLE from '../../../style/variable';

export default {
  closeIcon: {
    outer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      margin: 0,
      color: VARIABLE.color3E
    }
  },

  confirmationButton: {
    borderRadius: 7,
    marginTop: 13,
    marginBottom: 13,

    titleStyle: {
      fontWeight: VARIABLE.fontSemiBold
    },

    styleIcon: {
      color: 'white'
    }
  }
} as any;
