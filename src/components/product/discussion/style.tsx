import * as VARIABLE from 'style/variable';
import { combineStyle, isMobileVersion } from 'utils/responsive';

export default {
  width: '100%',
  display: 'block',
  marginBottom: 5,

  sticky: {
    position: VARIABLE.position.sticky,
    top: 'calc(180px + var(--sticky-top-banner-height, 0px))',
    display: VARIABLE.display.flex,
    justifyContent: 'flex-end',
    zIndex: VARIABLE.zIndex1
  },

  title: combineStyle({
    MOBILE: [{ paddingLeft: 0, paddingRight: 0 }] as any,
    DESKTOP: [
      {
        fontSize: 20,

        marginBottom: 10
      }
    ] as any,
    GENERAL: [{}] as any
  }),

  description: {
    fontSize: 14,
    lineHeight: '20px',
    color: VARIABLE.color4D,
    marginBottom: 30,
    width: 280
  },

  inputDiscussionGroup: {
    container: (isReplyTo) =>
      combineStyle({
        MOBILE: [
          {
            width: '100%',
            height: 70 + (isReplyTo ? 36 : 0)
          }
        ] as any,

        DESKTOP: [
          {
            width: '30%',
            flexDirection: 'column',
            display: VARIABLE.display.flex
          }
        ] as any,

        GENERAL: [{}] as any
      }),

    fixed: (isReplyTo) =>
      combineStyle({
        MOBILE: [
          {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: 70 + (isReplyTo ? 36 : 0),
            boxShadow: '0 -2px 10px rgba(0, 0, 0, .08)',
            position: 'fixed',
            zIndex: VARIABLE.zIndex5,
            left: 0,
            bottom: 0,
            background: VARIABLE.colorWhite,
            padding: isReplyTo ? '52px 0 16px 16px' : '16px 0 16px 16px'
          }
        ] as any,

        DESKTOP: [{}] as any,

        GENERAL: [{}] as any
      }),

    outerContainer: {},

    avatar: {
      width: 32,
      minWidth: 32,
      height: 32,
      borderRadius: 25,
      marginRight: 14,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundColor: VARIABLE.colorE5,
      marginLeft: 0
    },

    input: {
      height: 40,
      width: '100%',
      lineHeight: '40px',
      textAlign: 'left' as const,
      color: VARIABLE.color4D,
      fontSize: 12
    },

    inputText: (isLoggedIn) =>
      Object.assign(
        {},
        {
          width: '100%',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          paddingLeft: 20,
          paddingRight: 20,
          height: 40,
          lineHeight: '40px',
          fontSize: 14,
          fontWeight: VARIABLE.fontLight,
          color: VARIABLE.color20,
          whiteSpace: 'nowrap',
          maxWidth: '100%',
          overflow: 'hidden',
          margin: 0,
          borderRadius: 20,
          background: VARIABLE.colorF5
        },
        !isLoggedIn && { pointerEvents: 'none', userSelect: 'none' }
      ),

    sendComment: {
      display: VARIABLE.display.flex,
      alignItems: 'center',
      width: 40,
      minWidth: 70,
      fontSize: 14,
      fontWeight: VARIABLE.fontSemiBold,
      justifyContent: 'center',
      cursor: 'pointer',
      lineHeight: '28px',
      color: VARIABLE.color20
    },

    commentInputGroup: (isLoggedIn) =>
      Object.assign(
        {
          width: '100%',
          height: 40,
          display: VARIABLE.display.flex
        },
        !isLoggedIn && isMobileVersion() && { paddingRight: 16 }
      )
  },

  commentGroup: {
    display: VARIABLE.display.flex
  },

  leftCol: {
    width: '70%',
    paddingRight: 30,
    marginTop: -162,
    position: VARIABLE.position.relative,
    zIndex: VARIABLE.zIndex2,
    minHeight: 180
  },

  loading: {
    height: 300,
    minHeight: 300
  },

  emptyMessage: {
    fontSize: 13,
    color: VARIABLE.color97,
    paddingBottom: 10
  },

  empty: {
    display: VARIABLE.display.flex,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,

    image: {
      width: 175,
      height: 'auto',
      marginTop: 0,
      marginBottom: 10
    },

    content: {
      textAlign: 'center' as const,

      title: {
        fontSize: 24,
        lineHeight: '32px',
        marginBottom: 10,

        fontWeight: VARIABLE.fontBold,
        color: VARIABLE.color97
      },

      description: {
        fontSize: 16,
        color: VARIABLE.color97,
        maxWidth: 300,
        width: '100%',
        margin: '0 auto'
      }
    }
  }
} as any;
