import * as VARIABLE from '../../../style/variable';
import * as LAYOUT from '../../../style/layout';
import { combineStyle } from '../../../utils/responsive';

export default {
  display: VARIABLE.display.block,
  position: VARIABLE.position.relative,

  wrapLayout: {
    width: 600,
    margin: '0 auto'
  },

  headerWrap: {
    display: VARIABLE.display.flex,
    marginBottom: 15,

    item: {
      container: combineStyle({
        MOBILE: [
          {
            paddingTop: 10,
            marginBottom: 10
          }
        ] as any,

        DESKTOP: [
          {
            paddingTop: 20,
            marginBottom: 20
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
          width: '100%',
          paddingLeft: 10,
          paddingRight: 10
        }),

        avatar: {
          width: 40,
          minWidth: 40,
          height: 40,
          borderRadius: 25,
          marginRight: 10,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundColor: VARIABLE.colorE5,
          cursor: 'pointer',
          display: VARIABLE.display.block,

          small: {
            width: 30,
            minWidth: 30,
            height: 30,
            borderRadius: '50%'
          }
        },

        username: {
          paddingRight: 15,
          marginBottom: 5,
          textAlign: 'left' as const
        },

        detail: {
          flex: 10,
          display: VARIABLE.display.flex,
          flexDirection: 'column',
          textOverflow: 'ellipsis',
          justifyContent: 'center',

          username: {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: 14,
            lineHeight: '22px',
            marginRight: 5,
            cursor: 'pointer',
            color: VARIABLE.colorBlack,
            position: VARIABLE.position.relative
          },

          ratingGroup: {
            display: VARIABLE.display.flex,
            alignItems: 'center',

            rating: {
              marginLeft: -3,
              marginRight: 5
            },

            date: {
              display: VARIABLE.display.block,
              lineHeight: '23px',
              height: 18,
              color: VARIABLE.color97,
              cursor: 'pointer'
            }
          }
        },

        description: {
          container: {
            fontSize: 14,
            overflow: 'hidden',
            lineHeight: '22px',
            textAlign: 'justify' as const,
            paddingLeft: 10,
            paddingRight: 10
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
        height: 'auto',
        // marginTop: 10,
        // marginRight: 10,
        // marginBottom: 10,
        // marginLeft: 10,
        display: VARIABLE.display.block,
        objectFit: 'cover',
        cursor: 'pointer'
      },

      fullHeight: {
        height: '100%'
      },

      onePicture: {
        height: 'auto'
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
          width: 16,
          top: 3,
          right: -4,
          position: VARIABLE.position.relative
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
        paddingTop: 10,

        container: {
          paddingLeft: 20,
          paddingRight: 20,
          display: VARIABLE.display.flex,
          paddingTop: 10
        },

        contenGroup: {
          display: VARIABLE.display.block,
          padding: '4px 10px',
          background: VARIABLE.colorF0,
          borderRadius: 15,

          date: {
            fontSize: 11,
            color: VARIABLE.color75,
            marginBottom: 5
          },

          comment: {
            fontSize: 14,
            lineHeight: '22px',
            color: VARIABLE.color2E,
            textAlign: 'justify' as const,
            wordBreak: `break-word`
          }
        }
      },

      inputCommentGroup: {
        display: VARIABLE.display.flex,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 20,
        marginRight: 20,

        avatar: {
          width: 30,
          minWidth: 30,
          height: 30,
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
          fontSize: 12
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
        width: '100%',
        height: 'auto'
      }
    },

    viewDetail: {
      container: combineStyle({
        MOBILE: [{}] as any,
        DESKTOP: [{}] as any,
        GENERAL: [
          {
            height: 30,
            border: `1px solid ${VARIABLE.colorBlack03}`,
            borderRadius: 5,
            display: VARIABLE.display.flex,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 10,
            paddingRight: 10,
            color: VARIABLE.colorBlack08
          }
        ] as any
      })
    }
  }
} as any;
