import * as VARIABLE from 'style/variable';
import * as LAYOUT from 'style/layout';

const STYLE = {
  commentGroup: {
    paddingLeft: 46,
    paddingTop: 5,
    paddingBottom: 10,

    contenGroup: {
      display: VARIABLE.display.block,

      topInfo: {
        display: 'flex',
        marginBottom: 6
      },

      date: {
        fontSize: 11,
        color: VARIABLE.color75,
        marginBottom: 5
      },

      comment: {
        fontSize: 14,
        lineHeight: '20px',
        fontWeight: VARIABLE.fontLight,
        color: VARIABLE.color20,
        textAlign: 'left' as const,
        wordBreak: `break-word`,
        display: 'inlinve-block',
        background: VARIABLE.colorF5,
        borderRadius: 8,
        padding: '10px 16px',
        marginBottom: 5
      }
    }
  },

  info: {
    container: Object.assign({}, LAYOUT.flexContainer.left, {
      width: '100%'
    }),

    avatar: {
      width: 36,
      minWidth: 36,
      height: 36,
      marginRight: 10,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundColor: VARIABLE.colorE5,
      borderRadius: '50%',

      small: {
        width: 20,
        minWidth: 20,
        height: 20
      }
    },

    username: {
      paddingRight: 15,
      marginBottom: 5,
      textAlign: 'left' as const,
      display: VARIABLE.display.inlineBlock
    },

    detail: {
      flex: 10,
      flexDirection: 'column',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      justifyContent: 'center',
      display: VARIABLE.display.inlineBlock,
      verticalAlign: 'top',

      username: {
        display: VARIABLE.display.block,
        width: '100%',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        fontSize: 14,
        lineHeight: '20px',
        verticalAlign: 'top',
        marginRight: 5,
        fontWeight: VARIABLE.fontSemiBold,
        color: VARIABLE.color20
      },

      infoGroup: {
        display: VARIABLE.display.flex,
        alignItems: 'center',

        date: {
          fontSize: 12,
          verticalAlign: 'top',
          color: VARIABLE.color8A,
          display: VARIABLE.display.block,
          marginRight: 10,
          fontWeight: VARIABLE.fontLight
        },

        reply: {
          fontSize: 13,
          cursor: 'pointer',
          verticalAlign: 'top',
          color: VARIABLE.color8A,
          display: VARIABLE.display.block,
          fontWeight: VARIABLE.fontSemiBold
        }
      }
    },

    description: {
      container: {
        fontSize: 14,
        overflow: 'hidden',
        lineHeight: '20px',
        textAlign: 'justify' as const,
        display: VARIABLE.display.inlineBlock,
        verticalAlign: 'top',
        fontWeight: VARIABLE.fontLight,
        color: VARIABLE.color20
      },

      viewMore: {
        fontSize: 15,
        cursor: 'pointer'
      }
    }
  }
} as any;

export default STYLE;
