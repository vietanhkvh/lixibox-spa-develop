// TODO: Convert to SCSS
import * as VARIABLE from '../../../../style/variable';

export default {
  info: {
    avatar: {
      width: 36,
      minWidth: 36,
      height: 36,
      borderRadius: 25,
      marginRight: 12,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundColor: VARIABLE.colorE5,
      cursor: 'pointer',
      display: VARIABLE.display.block
    },

    detail: {
      username: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontSize: 14,
        lineHeight: '18px',
        marginRight: 5,
        cursor: 'pointer',
        fontWeight: VARIABLE.fontSemiBold,
        color: VARIABLE.color20,
        display: 'inline',
        position: VARIABLE.position.relative
      }
    }
  },

  commentGroup: {
    container: {
      paddingLeft: 16,
      paddingRight: 16,
      marginBottom: 16,
      display: VARIABLE.display.flex
    },

    contentGroup: {
      display: VARIABLE.display.block,

      inner: {
        padding: '8px 16px',
        background: VARIABLE.colorF5,
        borderRadius: 8
      },

      comment: {
        fontSize: 14,
        lineHeight: '20px',
        fontWeight: VARIABLE.fontRegular,
        color: VARIABLE.color20,
        textAlign: 'justify' as const,
        wordBreak: `break-word`
      }
    }
  }
} as any;
