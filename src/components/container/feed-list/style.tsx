import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [
      {
        width: '100%',
        paddingTop: 20
      }
    ] as any,

    DESKTOP: [
      {
        width: '100%'
      }
    ] as any,

    GENERAL: [
      {
        paddingTop: 0
      }
    ] as any
  }),

  item: {
    boxShadow: VARIABLE.shadowBlurSort,
    marginBottom: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,

    small: {
      boxShadow: 'none',
      border: `1px solid ${VARIABLE.colorB0}`,
      marginBottom: 20,

      last: {
        marginBottom: 0
      }
    },

    info: {
      marginBottom: 10,

      avatar: {
        width: 50,
        minWidth: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: VARIABLE.colorE5,

        small: {
          width: 40,
          minWidth: 40,
          height: 40,
          borderRadius: 0
        }
      },

      username: {
        paddingRight: 15,
        marginBottom: 5
      },

      detail: {
        flex: 10,

        groupUsername: {
          display: VARIABLE.display.flex,
          flexDirection: 'column',
          marginBottom: 5,
          overflow: 'hidden',
          textOverflow: 'ellipsis',

          date: {
            fontSize: 11,
            color: VARIABLE.color75,
            marginBottom: 5
          }
        }
      },

      description: {
        fontSize: 13,
        maxHeight: 60,
        overflow: 'hidden',

        viewMore: {
          fontSize: 15,
          cursor: 'pointer'
        }
      }
    },

    image: {
      width: '100%',
      maxWidth: '100%',
      height: 'auto'
    },

    text: {
      color: VARIABLE.colorBlack06
    },

    inner: {
      width: 15
    },

    likeCount: {
      display: VARIABLE.display.flex,
      alignItems: 'center',
      borderBottom: `1px solid ${VARIABLE.colorBlack005}`,
      marginBottom: 10
    },

    likeCommentIconGroup: {
      display: VARIABLE.display.flex,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: 10,
      borderBottom: `1px solid ${VARIABLE.colorBlack005}`,

      like: {
        display: VARIABLE.display.flex,
        alignItems: 'center',
        justifyContent: 'center',
        width: 'calc(50% - 10px)',
        cursor: 'pointer'
      },

      comment: {
        display: VARIABLE.display.flex,
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        cursor: 'pointer'
      }
    },

    commentGroup: {
      display: VARIABLE.display.flex,
      paddingTop: 10,

      avatar: {},

      contenGroup: {
        display: VARIABLE.display.flex,
        flexDirection: 'column',
        width: '100%',
        borderBottom: `1px solid ${VARIABLE.colorBlack005}`,
        paddingBottom: 10,

        name: {},

        date: {
          fontSize: 11,
          color: VARIABLE.color75,
          marginBottom: 5
        },

        comment: {
          fontSize: 14,
          lineHeight: '20px',
          color: VARIABLE.color2E,
          textAlign: 'justify' as const
        }
      }
    },

    inputCommentGroup: {
      display: VARIABLE.display.flex,
      alignItems: 'center',
      paddingTop: 10,

      avatar: {
        width: 30,
        minWidth: 30,
        height: 30,
        borderRadius: 25,
        marginRight: 20,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: VARIABLE.colorE5,
        marginLeft: 10
      },

      input: {
        height: 30,
        width: '100%',
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        lineHeight: '30px',
        textAlign: 'center' as const,
        color: VARIABLE.color75
      },

      inputText: {
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0
      },

      sendComment: {
        display: VARIABLE.display.flex,
        alignItems: 'center'
      }
    }
  },

  outerFeedItem: {},

  feedItem: combineStyle({
    MOBILE: [
      {
        // marginBottom: 10
      }
    ] as any,

    DESKTOP: [
      {
        marginBottom: 20
      }
    ] as any,

    GENERAL: [{}] as any
  })
} as any;
