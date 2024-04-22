import * as VARIABLE from '../../../../../../style/variable';

export default {
  stepHeading: {
    container: {
      paddingBottom: 15
    },
    number: {
      borderRadius: '50%',
      fontSize: 18,

      background: VARIABLE.colorF0,
      width: 38,
      minWidth: 38,
      maxWidth: 38,
      height: 38,
      textAlign: 'center' as const,
      lineHeight: '38px',

      selected: {
        color: VARIABLE.colorGreen
      }
    },

    info: {
      flex: 1,
      paddingLeft: 10
    },

    title: {
      fontSize: 14,
      fontWeight: VARIABLE.fontSemiBold,
      lineHeight: '24px',
      color: VARIABLE.color20
    },

    description: {
      fontSize: 12,
      color: VARIABLE.color97,
      lineHeight: '20px',
      maxWidth: 340
    },

    redDescription: {
      color: VARIABLE.colorRed
    }
  }
} as any;
