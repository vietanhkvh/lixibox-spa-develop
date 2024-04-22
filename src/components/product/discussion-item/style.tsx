import * as VARIABLE from '../../../style/variable';
import * as LAYOUT from '../../../style/layout';
import { combineStyle } from '../../../utils/responsive';

export default {
  headerWrap: {
    display: VARIABLE.display.flex,
    marginBottom: 5,

    item: {
      container: combineStyle({
        MOBILE: [
          {
            paddingBottom: 10,
            marginBottom: 10
          }
        ] as any,

        DESKTOP: [
          {
            paddingTop: 15,
            paddingBottom: 20
          }
        ] as any,

        GENERAL: [
          {
            background: VARIABLE.colorWhite
          }
        ] as any
      }),

      lastChild: {
        marginBottom: 0
      },

      small: {
        boxShadow: 'none',
        border: `1px solid ${VARIABLE.colorB0}`,
        marginBottom: 20,

        last: {
          marginBottom: 0
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
            color: VARIABLE.color20,
            wordBreak: 'break-word'
          },

          viewMore: {
            fontSize: 15,
            cursor: 'pointer'
          }
        }
      },

      image: (imgUrl = '') => {
        return {
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%'
        };
      },

      imageContent: {
        maxWidth: '100%',
        minWidth: '100%',
        display: VARIABLE.display.block,
        margin: '15px auto'
      },

      text: {
        color: VARIABLE.colorBlack06
      },

      inner: {
        width: 15
      },

      likeCommentCount: {
        marginBottom: 10,
        display: VARIABLE.display.flex,
        borderBottom: `1px solid ${VARIABLE.colorBlack005}`,
        width: '100%',
        alignItems: 'center'
      },

      likeCount: {
        display: VARIABLE.display.flex,
        flex: 1,
        alignItems: 'center'
      },

      likeCountEmpty: {
        flex: 1
      },

      commentCount: {
        fontSize: 13,
        lineHeight: '30px',
        color: VARIABLE.colorBlack06,
        flex: 1,
        textAlign: 'right' as const,
        paddingLeft: 3,
        paddingRight: 3
      },

      likeCommentIconGroup: {
        left: {
          display: VARIABLE.display.flex
        },

        right: {},

        container: {
          paddingLeft: 13,
          paddingRight: 13,
          display: VARIABLE.display.flex,
          alignItems: 'center',
          justifyContent: 'space-between'
        },

        detailContainer: {
          display: VARIABLE.display.block
        },

        icon: {
          display: VARIABLE.display.flex,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          cursor: 'pointer'
        },

        innerIconLike: {
          width: 22
        },

        innerIconComment: {
          width: 21,
          position: VARIABLE.position.relative,
          top: 3
        },

        innerIconFly: {
          width: 24,
          top: 2,
          position: VARIABLE.position.relative
        },

        innerIconHeart: {
          width: 22
        }
      },

      countingGroup: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,

        userList: {
          height: 18,
          display: VARIABLE.display.inlineFlex,
          alignItems: 'center',
          justifyContent: 'center',
          verticalAlign: 'top',
          marginRight: 10
        },

        userItem: (index) => ({
          width: 15,
          height: 15,
          backgroundColor: VARIABLE.randomColorList(-1),
          backgroundSize: 'cover',
          borderRadius: '50%',
          display: VARIABLE.display.inlineBlock,
          marginRight: -7,
          border: `1px solid ${VARIABLE.colorWhite}`,
          cursor: 'pointer'
        }),

        text: {
          fontSize: 12,
          lineHeight: '18px',
          color: VARIABLE.color97,
          cursor: 'pointer'
        }
      },

      commentGroup: {
        paddingLeft: 46,

        container: {
          paddingTop: 5
        },

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

      inputCommentGroup: {
        display: VARIABLE.display.flex,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,

        avatar: {
          width: 20,
          minWidth: 20,
          height: 20,
          borderRadius: 25,
          marginRight: 10,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundColor: VARIABLE.colorE5,
          marginLeft: 0
        },

        input: {
          height: 30,
          width: '100%',
          lineHeight: '30px',
          textAlign: 'left' as const,
          color: VARIABLE.color4D,
          fontSize: 12,

          cursor: `pointer`
        },

        inputText: {
          width: '100%',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          paddingLeft: 10,
          paddingRight: 10,
          height: 28,
          lineHeight: '28px',
          fontSize: 12,
          color: VARIABLE.colorBlack,
          background: 'transparent',
          whiteSpace: 'nowrap',
          maxWidth: '100%',
          overflow: 'hidden',
          margin: 0,
          borderRadius: 0
        },

        sendComment: {
          display: VARIABLE.display.flex,
          alignItems: 'center',
          width: 50,
          minWidth: 50,
          fontSize: 12,
          justifyContent: 'center',
          cursor: 'pointer',

          lineHeight: '28px',
          color: VARIABLE.colorPink,
          textTransform: 'uppercase'
        },

        commentInputGroup: {
          width: '100%',
          height: 30,
          border: `1px solid ${VARIABLE.colorD2}`,
          borderRadius: 15,
          display: VARIABLE.display.flex
        }
      }
    },

    imgProduct: {
      container: {
        height: 40,
        display: VARIABLE.display.flex,
        alignItems: 'center',
        justifyContent: 'center'
      },

      img: {
        height: '100%',
        width: 'auto'
      }
    }
  },

  customStyleLoading: {
    height: 80
  }
} as any;
