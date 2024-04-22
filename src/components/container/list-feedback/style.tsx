import * as VARIABLE from '../../../style/variable';
import * as LAYOUT from '../../../style/layout';
import { combineStyle } from '../../../utils/responsive';

export default {
  width: '100%',
  display: 'block',
  paddingTop: 25,
  paddingRight: 15,
  paddingBottom: 15,
  paddingLeft: 15,

  parent: {
    minHeight: 295
  },

  sticky: {
    position: VARIABLE.position.sticky, // [VARIABLE.position.sticky, '-webkit-sticky'],
    top: 'calc(180px + var(--sticky-top-banner-height, 0px))',
    display: VARIABLE.display.flex,
    justifyContent: 'flex-end',
    zIndex: VARIABLE.zIndex1
  },

  leftCol: {
    width: '70%',
    paddingRight: 30,
    marginTop: 'calc(-300px - 16px)',
    zIndex: VARIABLE.zIndex2,
    position: 'relative'
  },

  rightCol: {
    width: '30%',

    ratingHeader: {
      display: VARIABLE.display.flex,
      alignItems: 'center',
      marginBottom: 20,

      title: {
        fontSize: 40,
        fontWeight: VARIABLE.fontBold
      },

      ratingGroup: {
        display: VARIABLE.display.flex,
        flexDirection: 'column',
        marginLeft: 20,

        content: {
          fontSize: 15
        }
      }
    },

    ratingProgessive: {
      marginBottom: 30
    },

    ratingFooter: {
      // borderTop: `1px solid ${VARIABLE.colorBlack01}`,
      // paddingTop: 30,
      display: VARIABLE.display.flex,
      justifyContent: 'space-between',
      flexDirection: 'column',
      paddingBottom: 10,

      starIcon: {
        width: 90,
        color: VARIABLE.colorBlack08
      },

      starIconInner: {
        width: 90
      },

      title: {
        fontSize: 16,
        fontWeight: VARIABLE.fontSemiBold,
        marginBottom: 10
      },

      desc: {
        fontSize: 14,
        color: VARIABLE.color4D,
        marginBottom: 10
      },

      btnWrap: {
        width: '100%',
        textAlign: 'center' as const,

        btn: {
          display: VARIABLE.display.block,
          color: VARIABLE.colorBlack,
          width: 180,
          height: 40,
          lineHeight: '40px',
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 3,
          border: `1px solid ${VARIABLE.color2E}`,
          fontSize: 14,
          cursor: 'pointer'
        }
      }
    }
  },

  heading: {
    marginBottom: 40,

    text: {
      textAlign: 'center' as const,
      paddingTop: 0,
      paddingRight: 50,
      paddingBottom: 0,
      paddingLeft: 50,
      marginBottom: 20,
      width: '100%'
    },

    button: {
      borderRadius: 17
    }
  },

  title: combineStyle({
    MOBILE: [{ paddingLeft: 0, paddingRight: 0 }] as any,
    DESKTOP: [{}] as any,
    GENERAL: [{}] as any
  }),

  empty: {
    width: '100%',
    textAlign: 'center' as const,

    image: {
      width: 200,
      height: 'auto',
      marginTop: 20,
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
  },

  container: {
    paddingTop: 16,

    info: {
      avatar: {
        width: 36,
        minWidth: 36,
        height: 36,
        borderRadius: 25,
        marginRight: 10,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: VARIABLE.colorE5
      },

      groupUsername: {
        flex: 10,
        display: VARIABLE.display.inlineBlock,
        flexDirection: `column`,
        overflow: `hidden`,
        textOverflow: `ellipsis`,
        justifyContent: `center`,
        paddingBottom: 20,

        withBorder: {}
      },

      username: combineStyle({
        MOBILE: [{ maxWidth: 160 }] as any,
        DESKTOP: [{ maxWidth: 200 }] as any,
        GENERAL: [
          {
            display: VARIABLE.display.inlineBlock,

            verticalAlign: 'top',
            textOverflow: `ellipsis`,
            whiteSpace: `nowrap`,
            overflow: `hidden`,
            fontSize: 14,
            fontWeight: VARIABLE.fontSemiBold,
            lineHeight: `20px`,
            marginRight: 5
          }
        ] as any
      }),

      title: combineStyle({
        MOBILE: [{ maxWidth: 160 }] as any,
        DESKTOP: [{ maxWidth: 200 }] as any,
        GENERAL: [
          {
            display: VARIABLE.display.inlineBlock,

            verticalAlign: 'top',
            textOverflow: `ellipsis`,
            whiteSpace: `nowrap`,
            overflow: `hidden`,
            fontSize: 16,
            lineHeight: `26px`,
            marginRight: 5
          }
        ] as any
      }),

      ratingInfoGroup: combineStyle({
        MOBILE: [{}] as any,
        DESKTOP: [{ display: 'flex' }] as any,
        GENERAL: [{ marginBottom: 8, display: 'block' }] as any
      }),

      ratingInfo: {
        marginBottom: 0,
        display: VARIABLE.display.flex,
        flexWrap: 'wrap'
      },

      verificationText: {
        display: VARIABLE.display.flex,
        verticalAlign: 'top',
        color: VARIABLE.colorGreen,

        position: VARIABLE.position.relative,
        marginRight: 0
      },

      verificationTooltip: combineStyle({
        MOBILE: [{}] as any,
        DESKTOP: [
          {
            color: VARIABLE.colorGreen,
            height: 20,

            display: VARIABLE.display.inlineBlock,
            whiteSpace: 'nowrap',
            transition: VARIABLE.transitionOpacity
          }
        ] as any,
        GENERAL: [
          {
            padding: '0 5px',
            fontSize: 13,
            lineHeight: '20px'
          }
        ] as any
      }),

      verification: {
        width: 20,
        height: 20,
        color: VARIABLE.colorGreen
      },

      innerVerification: {
        width: 15
      },

      rating: combineStyle({
        MOBILE: [{ top: -1 }] as any,
        DESKTOP: [{ top: -1 }] as any,
        GENERAL: [
          {
            position: 'relative',
            marginLeft: -2,
            height: 20,
            marginRight: 5
          }
        ] as any
      }),

      time: {
        fontSize: 13,
        fontWeight: VARIABLE.fontLight,
        lineHeight: '20px',
        color: VARIABLE.color8A,
        paddingLeft: 3,
        paddingRight: 10
      },

      content: {
        fontSize: 14,
        fontWeight: VARIABLE.fontLight,
        color: VARIABLE.color20,
        lineHeight: `20px`,
        textAlign: `justify`,
        padding: 0,
        display: VARIABLE.display.inlineBlock,
        verticalAlign: 'top',
        wordBreak: 'break-word'
      },

      pictureList: {
        paddingTop: 5,
        display: 'flex',
        flexWrap: 'wrap'
      },

      pictureItem: {
        display: 'block',
        width: 60,
        minWidth: 60,
        maxWidth: 60,
        objectFit: 'cover',
        height: 60,
        margin: '5px 5px 0 0',
        borderRadius: 4
      },

      detail: {
        flex: 10
      }
    }
  },

  loading: {
    height: 300,
    minHeight: 300
  },

  ratingProgessive: {
    display: VARIABLE.display.flex,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 25,
    marginBottom: 5,

    star: {
      display: VARIABLE.display.flex,
      marginRight: 10,
      alignItems: 'center',
      width: 30,

      num: {
        textTransform: 'uppercase',

        marginRight: 5,
        fontSize: 12,
        color: VARIABLE.color97
      },

      starIcon: {
        width: 15,
        color: VARIABLE.colorPink
      },

      starIconInner: {
        width: 15
      }
    },

    progressive: {
      flex: 10,
      border: `1px solid ${VARIABLE.colorPink}`,
      borderRadius: 5,
      marginRight: 10,
      height: 10,

      percentProgressive: (percent) => ({
        height: '100%',
        width: `${percent}%`,
        backgroundColor: VARIABLE.colorRed
      })
    },

    percent: {
      textAlign: 'right' as const,
      fontSize: 12,
      color: VARIABLE.color97
    }
  },

  bottomAction: {
    padding: '0 0 20px 0',

    onModal: {
      position: 'relative',
      height: 70
    },

    fixed: {
      padding: '13px 16px',
      position: 'fixed',
      width: '100vw',
      zIndex: VARIABLE.zIndex5,
      backgroundColor: VARIABLE.colorWhite,
      bottom: 0,
      left: 0,
      height: 70,
      boxShadow: `0 -2px 10px rgba(0, 0, 0, .08)`
    }
  },

  emptyMessage: {
    fontSize: 13,
    color: VARIABLE.color97,
    paddingBottom: 20
  },

  commentItem: {
    container: combineStyle({
      MOBILE: [
        {
          // paddingTop: 10,
          borderBottom: `1px solid ${VARIABLE.colorF0}`
        }
      ] as any,

      DESKTOP: [{}] as any,

      GENERAL: [{}] as any
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
          color: VARIABLE.color20
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
  }
} as any;
