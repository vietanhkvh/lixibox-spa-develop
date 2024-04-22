import * as VARIABLE from '../../../style/variable';
import * as LAYOUT from '../../../style/layout';
import { combineStyle } from '../../../utils/responsive';

export default {
  width: '100%',
  paddingTop: 10,
  paddingRight: 10,
  paddingBottom: 10,
  paddingLeft: 10,

  headerWrap: {
    display: VARIABLE.display.flex,
    marginBottom: 10,

    item: {
      container: combineStyle({
        MOBILE: [
          {
            paddingTop: 14,
            paddingBottom: 0,
            marginBottom: 0,
            borderTop: `1px solid ${VARIABLE.colorF0}`,
            borderBottom: `1px solid ${VARIABLE.colorF0}`
          }
        ] as any,

        DESKTOP: [
          {
            paddingTop: 20,
            marginBottom: 10,
            borderRadius: 8,
            boxShadow: `0 0 0 1px ${VARIABLE.colorF0}`
          }
        ] as any,

        GENERAL: [
          {
            background: VARIABLE.colorWhite
          }
        ] as any
      }),

      lastChild: {
        marginBottom: 0,
        borderBottom: 'none'
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
          paddingLeft: 16,
          paddingRight: 16
        }),

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
            lineHeight: '18px',
            marginRight: 5,
            cursor: 'pointer',
            fontWeight: VARIABLE.fontSemiBold,
            color: VARIABLE.color20,
            display: 'inline',
            position: VARIABLE.position.relative
          },

          feedCreateContentOuter: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 5
          },

          feedCreateContent: {
            maxHeight: 56,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3
          },

          feedCreateContentMessage: {
            display: 'inline',
            fontSize: 14,
            lineHeight: '18px',
            fontWeight: VARIABLE.fontRegular,
            color: VARIABLE.color8A,
            marginRight: 5
          },

          feedCreateContentProduct: {
            display: 'inline',
            fontSize: 14,
            lineHeight: '18px',
            fontWeight: VARIABLE.fontSemiBold,
            color: VARIABLE.color20
          },

          boxInFeed: {
            minWidth: 36,
            width: 36,
            height: 36,
            marginLeft: 12,
            borderRadius: 4,
            display: 'block'
          },

          boxInFeedBordered: {
            border: `1px dashed ${VARIABLE.color8A}`
          },

          boxInFeedImage: {
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block'
          },

          ratingGroup: {
            display: VARIABLE.display.flex,
            alignItems: 'center',
            height: 20,

            rating: {
              marginLeft: -3,
              marginRight: 5,
              marginBottom: 5
            },

            date: {
              display: VARIABLE.display.block,
              lineHeight: '20px',
              height: 20,
              fontWeight: VARIABLE.fontRegular,
              color: VARIABLE.color8A,
              fontSize: 13,
              cursor: 'pointer'
            }
          }
        },

        descGroup: {
          paddingLeft: 16,
          paddingRight: 16,
          marginBottom: 10
        },

        description: {
          container: {
            fontSize: 14,
            fontWeight: VARIABLE.fontRegular,
            color: VARIABLE.color20,
            overflow: 'hidden',
            lineHeight: '20px',
            textAlign: 'justify' as const,
            display: VARIABLE.display.inline,
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
        // maxWidth: '100%',
        // minWidth: '100%',
        // height: 'auto',
        // marginTop: 10,
        // marginRight: 10,
        // marginBottom: 10,
        // marginLeft: 10,

        display: VARIABLE.display.block,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        cursor: 'pointer'
      },

      fullHeight: {
        height: '100%'
      },
      coverPicture: {
        minWith: '100%',
        maxWidth: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'block',
        objectFit: 'cover'
      },
      onePicture: combineStyle({
        MOBILE: [
          {
            maxHeight: 450
          }
        ] as any,

        DESKTOP: [
          {
            maxHeight: 550
          }
        ] as any,

        GENERAL: [
          {
            height: 'auto',
            backgroundColor: VARIABLE.colorWhite,
            width: '100%',
            maxWidth: '100%',
            margin: '0 auto',
            position: 'relative',
            zIndex: VARIABLE.zIndex5
          }
        ] as any
      }),

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
        container: {
          height: 48,
          paddingLeft: 16,
          paddingRight: 16,
          position: 'relative',
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
        paddingBottom: 0,

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
        paddingTop: 16,
        position: 'relative',

        container: {
          paddingLeft: 16,
          paddingRight: 16,
          marginBottom: 16,
          display: VARIABLE.display.flex
        },

        contenGroup: {
          display: VARIABLE.display.block,

          inner: {
            padding: '8px 16px',
            background: VARIABLE.colorF5,
            borderRadius: 8
          },

          date: {
            fontSize: 11,
            color: VARIABLE.color75,
            marginBottom: 5
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
      },

      inputCommentGroup: {
        background: VARIABLE.colorWhite,
        width: '100%',
        height: 70,

        fixed: combineStyle({
          MOBILE: [
            {
              position: 'fixed',
              boxShadow: '0 0 10px rgba(0, 0, 0, .14)'
            }
          ] as any,

          DESKTOP: [{}] as any,

          GENERAL: [
            {
              background: VARIABLE.colorWhite,
              width: '100%',
              height: 70,
              bottom: 0,
              left: 0,
              display: VARIABLE.display.flex,
              alignItems: 'center',
              padding: '15px 16px',
              zIndex: VARIABLE.zIndex9
            }
          ] as any
        }),

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

        inputText: {
          width: '100%',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          paddingLeft: 18,
          paddingRight: 18,
          height: 40,
          lineHeight: '40px',
          fontSize: 14,
          fontWeight: VARIABLE.fontRegular,
          color: VARIABLE.color20,
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
          width: 60,
          minWidth: 60,
          fontSize: 14,
          fontWeight: VARIABLE.fontSemiBold,
          justifyContent: 'center',
          cursor: 'pointer',
          lineHeight: '40px'
        },

        commentInputGroup: {
          width: '100%',
          height: 40,
          background: VARIABLE.colorF5,
          borderRadius: 20,
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
  },

  videoContainer: {
    container: combineStyle({
      MOBILE: [
        {
          width: '100%'
        }
      ] as any,
      DESKTOP: [
        {
          width: '100%'
        }
      ] as any,
      GENERAL: [
        {
          overflow: 'hidden',
          position: VARIABLE.position.relative,
          paddingTop: '56.25%',
          cursor: 'pointer'
        }
      ] as any
    }),

    thumbnail: (backgroundImageUrl: string) => ({
      backgroundImage: `url(${backgroundImageUrl}`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      width: '100%',
      height: '100%',
      backgroundColor: VARIABLE.colorF7,
      position: VARIABLE.position.absolute,
      top: 0,
      marginBottom: 10
    }),

    videoWrap: {
      width: '100%',
      height: '100%',
      marginBottom: 10,
      position: VARIABLE.position.absolute,
      top: 0,

      video: {
        transition: VARIABLE.transitionNormal,
        backgroundColor: VARIABLE.colorF7,
        width: '100%',
        height: '100%'
      }
    }
  },

  icon: {
    position: VARIABLE.position.absolute,
    top: '50%',
    left: '50%',
    color: VARIABLE.colorWhite,
    transform: 'translate(-50%, -50%)',
    zIndex: VARIABLE.zIndex2,

    inner: {
      width: 60,
      height: 60
    }
  },

  imgSlider: {
    display: VARIABLE.display.block,
    whiteSpace: 'nowrap',
    overflow: 'auto hidden',

    img: {
      width: 'auto',
      maxHeight: 300,
      minHeight: 300,
      display: VARIABLE.display.inline,
      marginTop: 10,
      marginBottom: 10,
      marginRight: 20,
      borderRadius: 3,
      boxShadow: VARIABLE.shadowBlurSort
    }
  },

  customStyleLoading: {
    height: 80
  },

  pictureList: {
    paddingTop: '100%',
    position: VARIABLE.position.relative,
    marginBottom: 0,
    background: VARIABLE.colorWhite,
    display: VARIABLE.display.block,
    width: '100%',

    squareStyle: {
      paddingTop: '50%'
    },

    pictureWrap: {
      position: VARIABLE.position.absolute,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    }
  },

  pictureCover: {
    display: 'block',
    overflow: 'hidden',
    position: 'relative',
    background: VARIABLE.colorWhite,
    borderBottom: `1px solid ${VARIABLE.colorE5}`,
    borderRadius: 0,
    width: '100%',
    paddingTop: '70%'
  },

  pictureSingle: combineStyle({
    MOBILE: [{}] as any,

    DESKTOP: [
      {
        borderBottom: `1px solid ${VARIABLE.colorE5}`,
        width: '100%',
        overflow: 'hidden'
      }
    ] as any,

    GENERAL: [
      {
        display: 'block',
        overflow: 'hidden',
        position: 'relative',
        background: VARIABLE.colorWhite
      }
    ] as any
  }),

  pictureSingleOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: `blur(20px) hue-rotate(20deg)`,
    transform: 'scale(1.2)',
    opacity: 0.9,
    zIndex: VARIABLE.zIndex5
  },

  pictures: {
    onePicture: {
      minWith: '100%',
      maxWidth: '100%',
      height: '100%'
    },

    twoPicture: {
      container: (isHorizontal) => ({
        display: VARIABLE.display.flex,
        flexDirection: isHorizontal ? 'column' : 'row',
        marginLeft: isHorizontal ? 0 : -1,
        marginRight: isHorizontal ? 0 : -1,
        marginTop: isHorizontal ? -1 : 0,
        marginBottom: isHorizontal ? -1 : 0,
        height: '100%'
      }),

      horizontal: {
        width: '100%',
        height: '50%',
        paddingTop: 1,
        paddingBottom: 1
      },

      vertical: {
        width: '50%',
        paddingLeft: 1,
        paddingRight: 1
      }
    },

    threePicture: {
      container: (isHorizontal) => ({
        display: VARIABLE.display.flex,
        flexDirection: isHorizontal ? 'column' : 'row',
        justifyContent: isHorizontal ? 'center' : 'space-between',
        width: '100%',
        height: '100%'
      }),

      horizontal: {
        flex: 1,
        marginBottom: 1,
        height: '50%'
      },

      vertical: {
        flex: 1,
        marginRight: 1
      },

      pictureGroup: {
        container: (isHorizontal) => ({
          display: VARIABLE.display.flex,
          flexDirection: isHorizontal ? 'row' : 'column',
          flex: 1,
          justifyContent: isHorizontal ? 'space-between' : 'center',
          height: isHorizontal ? '' : '100%',
          marginLeft: isHorizontal ? -1 : 1,
          marginRight: isHorizontal ? -1 : 0,
          marginTop: isHorizontal ? 1 : -1,
          marginBottom: isHorizontal ? 0 : -1
        }),

        horizontal: {
          flex: 1,
          marginLeft: 1,
          marginRight: 1
        },

        vertical: {
          width: '100%',
          height: '50%',
          flex: 1,
          paddingBottom: 1,
          paddingTop: 1
        }
      }
    },

    fourPicture: {
      container: (isHorizontal) => ({
        display: VARIABLE.display.flex,
        flexDirection: isHorizontal ? 'column' : 'row',
        justifyContent: isHorizontal ? 'center' : 'space-between',
        width: '100%',
        height: '100%'
      }),

      horizontal: {
        flex: 2,
        marginBottom: 2
      },

      vertical: {
        flex: 2,
        border: `1px solid ${VARIABLE.colorWhite}`
      },

      pictureGroup: {
        container: (isHorizontal) => ({
          display: VARIABLE.display.flex,
          flexDirection: isHorizontal ? 'row' : 'column',
          flex: 1,
          justifyContent: isHorizontal ? 'space-between' : 'center',
          height: isHorizontal ? '' : '100%',
          marginLeft: isHorizontal ? -1 : 0,
          marginRight: isHorizontal ? -1 : 0
        }),

        horizontal: {
          flex: 1,
          marginLeft: 1,
          marginRight: 1
        },

        vertical: {
          width: '100%',
          height: '33.33%',
          flex: 1,
          border: `1px solid ${VARIABLE.colorWhite}`
        }
      }
    },

    viewMore: {
      container: (isHorizontal) => ({
        position: VARIABLE.position.relative,
        flex: isHorizontal ? 1 : '',
        width: '100%',
        marginLeft: isHorizontal ? 1 : 0,
        marginRight: isHorizontal ? 1 : 0,
        height: isHorizontal ? 'auto' : '33.33%',
        paddingTop: isHorizontal ? '' : 1,
        paddingBottom: isHorizontal ? '' : 1,
        cursor: 'pointer'
      }),

      imgViewMore: (isHorizontal) => {
        return !isHorizontal
          ? {
              paddingTop: 0,
              paddingRight: 0,
              paddingBottom: 0,
              paddingLeft: 0,
              height: '100%'
            }
          : {
              width: '100%',
              height: '100%',
              margin: 0,
              padding: 0
            };
      },

      num: {
        position: VARIABLE.position.absolute,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: 36,

        color: VARIABLE.colorWhite,
        zIndex: VARIABLE.zIndex9
      },

      bg: {
        position: VARIABLE.position.absolute,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: VARIABLE.zIndex8,
        backgroundColor: VARIABLE.colorBlack04
      }
    }
  },

  tooltip: {
    position: VARIABLE.position.absolute,
    top: -3,
    right: -10,
    transform: 'translateX(100%)',

    group: {
      height: '100%',
      position: VARIABLE.position.relative,

      text: {
        padding: '3px 8px',
        color: VARIABLE.colorWhite,
        background: VARIABLE.colorBlack,
        borderRadius: 3,
        boxShadow: VARIABLE.shadowBlurSort,
        whiteSpace: 'nowrap',
        lineHeight: '20px',
        fontSize: 12
      },

      icon: {
        position: VARIABLE.position.absolute,
        top: 7,
        left: -5,
        height: 5,
        width: 5,
        borderWidth: 6,
        borderStyle: 'solid',
        borderColor: `${VARIABLE.colorTransparent} ${VARIABLE.colorBlack} ${VARIABLE.colorTransparent}  ${VARIABLE.colorTransparent}`,
        transform: 'translateX(-50%)'
      }
    }
  },

  feedSharingInfo: {
    link: {
      background: VARIABLE.colorF7,
      padding: `10px 20px 10px`,
      cursor: 'pointer',
      marginBottom: 10,
      display: 'block',
      borderTop: `1px solid ${VARIABLE.colorE5}`,
      borderBottom: `1px solid ${VARIABLE.colorE5}`,
      width: '100%',
      position: 'relative',
      zIndex: VARIABLE.zIndex5
    },

    category: {
      fontSize: 11,
      color: VARIABLE.color4D,
      lineHeight: '20px',
      textTransform: 'uppercase'
    },

    title: {
      fontSize: 16,
      lineHeight: '24px',
      maxHeight: 48,
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',

      color: VARIABLE.colorBlack,
      marginBottom: 2,
      fontWeight: VARIABLE.fontBold
    },

    titleWithImage: {
      paddingRight: 80,
      maxHeight: 24,
      WebkitLineClamp: 1
    },

    description: {
      fontSize: 13,
      lineHeight: '20px',
      maxHeight: 40,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
      color: VARIABLE.color4D,
      marginBottom: 2
    },

    image: {
      width: 'auto',
      height: 'calc(100% - 32px)',
      position: 'absolute',
      right: 16,
      top: 16,
      borderRadius: 5,
      border: `1px solid ${VARIABLE.colorE5}`
    },

    triangleLeft: {
      position: 'absolute',
      bottom: -6,
      left: 0,
      width: 10,
      height: 6,
      boxSizing: 'border-box',
      borderTop: `3px solid ${VARIABLE.colorA2}`,
      borderRight: `5px solid ${VARIABLE.colorA2}`,
      borderBottom: `3px solid ${VARIABLE.colorTransparent}`,
      borderLeft: `5px solid ${VARIABLE.colorTransparent}`
    },

    triangleRight: {
      position: 'absolute',
      bottom: -6,
      right: 0,
      width: 10,
      height: 6,
      boxSizing: 'border-box',
      borderTop: `3px solid ${VARIABLE.colorA2}`,
      borderLeft: `5px solid ${VARIABLE.colorA2}`,
      borderBottom: `3px solid ${VARIABLE.colorTransparent}`,
      borderRight: `5px solid ${VARIABLE.colorTransparent}`
    }
  }
} as any;
