import * as VARIABLE from '../../../../style/variable';

export default {
  display: 'block',
  position: 'relative',

  list: {
    padding: 16,

    item: {
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: 16
    },

    lastItem: {
      marginBottom: 0
    },

    image: {
      display: VARIABLE.display.block,
      width: '100%',
      maxWidth: '100%',
      minHeight: 80,
      height: 'auto'
    },

    title: {
      width: '100%',
      height: 26,
      lineHeight: '26px',
      textAlign: 'center' as const,
      fontSize: 13,
      fontWeight: VARIABLE.fontRegular,
      color: VARIABLE.color20,
      background: VARIABLE.colorF5,
      overflow: VARIABLE.visible.hidden,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  },

  placeholder: {
    padding: 10,

    item: {
      width: '100%',
      paddingTop: '40%',
      marginBottom: 10,
      background: VARIABLE.colorF7,
      borderRadius: 2
    }
  }
} as any;
