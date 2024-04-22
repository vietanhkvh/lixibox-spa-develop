import * as VARIABLE from '../../../style/variable';
import { isMobileVersion, combineStyle } from '../../../utils/responsive';

export default {
  largeTitle: {
    fontSize: 22,
    lineHeight: '30px',
    width: '100%',
    fontWeight: 900,
    color: VARIABLE.colorBlack08,

    display: VARIABLE.display.block,
    marginBottom: 10,
    transition: VARIABLE.transitionNormal,
    textTransform: 'capitalize'
  },

  title: {
    fontSize: 16,
    lineHeight: '20px',
    color: VARIABLE.colorBlack09,

    width: '100%',
    fontWeight: 900,
    display: VARIABLE.display.block,
    marginBottom: 10,
    textTransform: 'capitalize',
    textAlign: 'justify' as const
  },

  description: {
    fontSize: 14,
    lineHeight: '22px',
    maxHeight: 66,
    overflow: 'hidden',
    color: VARIABLE.colorBlack09,
    textAlign: 'justify' as const,
    width: '100%',
    marginBottom: 10
  },

  mainDescription: {
    fontSize: isMobileVersion() ? 14 : 15,
    lineHeight: '22px',
    color: VARIABLE.color2E,
    width: '100%',
    fontWeight: 900,
    display: VARIABLE.display.block,
    marginBottom: 10,
    maxHeight: 66,
    overflow: 'hidden'
  },

  imgText: {
    position: VARIABLE.position.absolute,
    fontSize: 24,
    lineHeight: '32px',
    width: '50%',
    background: VARIABLE.colorWhite,
    padding: '20px 20px',
    textAlign: 'left' as const,
    left: 0,
    bottom: 20,
    color: VARIABLE.colorBlack08,
    textTransform: 'uppercase'
  },

  textAlignStyle: {
    left: {
      textAlign: 'left' as const
    },

    center: {
      textAlign: 'center' as const
    },

    right: {
      textAlign: 'right' as const
    }
  },

  magazineCategory: {
    categoryOneContent: {
      display: 'flex',
      flexDirection: !isMobileVersion() ? 'row' : 'column',
      justifyContent: 'space-between',

      listSubItem: {
        width: !isMobileVersion() ? 'calc(40% - 20px)' : '100%',
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: !isMobileVersion() ? 'column' : 'row',
        flexWrap: 'wrap',

        subItem: {
          width: !isMobileVersion() ? '100%' : '47.5%',
          marginBottom: 10,

          itemImage: (image: string) => ({
            width: '100%',
            paddingTop: '65%',
            backgroundImage: `url(${image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            marginBottom: 10,
            posicontion: VARIABLE.position.relative,
            transition: VARIABLE.transitionNormal
          })
        }
      },

      largeItem: {
        width: !isMobileVersion() ? '60%' : '100%',
        marginBottom: 20,
        cursor: 'pointer',

        itemImage: (image: string) => ({
          width: '100%',
          paddingTop: '65%',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginBottom: 10,
          position: VARIABLE.position.relative,
          transition: VARIABLE.transitionNormal
        }),

        itemInfo: {
          width: '100%',
          textAlign: 'center' as const,
          height: 16,
          marginBottom: 5,
          marginTop: 10
        }
      }
    },

    categoryTwoContent: {
      itemWrap: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,

        itemImage: (image: string) => ({
          width: 'calc(50% - 10px)',
          paddingTop: '26%',
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          posicontion: VARIABLE.position.relative,
          transition: VARIABLE.transitionNormal
        }),

        itemInfo: {
          width: 'calc(50% - 10px)'
        }
      }
    },

    categoryThreeContent: {
      marginBottom: 20,

      largeItem: {
        display: VARIABLE.display.block,
        width: '100%',
        cursor: 'pointer',
        marginBottom: 20,

        itemImage: (imgUrl) => ({
          width: '100%',
          paddingTop: '65%',
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          position: VARIABLE.position.relative,
          transition: VARIABLE.transitionNormal,
          marginBottom: 10
        })
      }
    },

    categoryVideoContent: {
      container: combineStyle({
        MOBILE: [{}] as any,

        DESKTOP: [
          {
            display: 'flex',
            justifyContent: 'space-between'
          }
        ] as any,

        GENERAL: [
          {
            marginBottom: 20
          }
        ] as any
      }),

      mainTitle: {
        fontSize: 30,
        lineHeight: '60px',
        color: VARIABLE.colorBlack
      },

      largeVideoGroup: {
        container: combineStyle({
          MOBILE: [
            {
              width: '100%'
            }
          ] as any,

          DESKTOP: [
            {
              width: 'calc(50% - 30px)'
            }
          ] as any,

          GENERAL: [
            {
              display: VARIABLE.display.inlineBlock,
              overflow: 'hidden',
              position: VARIABLE.position.relative
            }
          ] as any
        })
      },

      video: (imgUrl) => ({
        width: '100%',
        paddingTop: '62.5%',
        position: VARIABLE.position.relative,
        backgroundImage: `url(${imgUrl})`,
        backgroundColor: VARIABLE.colorF7,
        backgroundPosition: 'top center',
        backgroundSize: 'cover'
      }),

      videoIcon: {
        width: 70,
        height: 70,
        position: VARIABLE.position.absolute,
        top: '50%',
        left: '55%',
        transform: 'translate(-50%, -50%)',
        borderTop: `35px solid transparent`,
        boxSizing: 'border-box',
        borderLeft: `51px solid ${VARIABLE.colorWhite}`,
        borderBottom: `35px solid ${VARIABLE.colorTransparent}`,
        opacity: 0.8
      },

      contentWrap: {
        width: '100%',
        paddingTop: 12,
        paddingRight: 0,
        paddingBottom: 12,
        paddingLeft: 0,
        position: VARIABLE.position.relative,
        backgroundColor: VARIABLE.colorWhite,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

        title: {
          color: VARIABLE.colorBlack,
          whiteSpace: 'pre-wrap',

          fontSize: 24,
          lineHeight: '32px',
          maxHeight: 64,
          overflow: 'hidden',
          marginBottom: 5
        },

        description: {
          fontSize: 14,
          lineHeight: '22px',
          maxHeight: '66px',
          color: VARIABLE.colorBlack,

          opacity: 0.7,
          marginRight: 10,
          whiteSpace: 'pre-wrap',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          WebkitLineClamp: 3
        }
      },

      smallVideoGroup: {
        container: combineStyle({
          MOBILE: [
            {
              width: '100%'
            }
          ] as any,

          DESKTOP: [
            {
              width: '50%'
            }
          ] as any,

          GENERAL: [
            {
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between'
            }
          ] as any
        }),

        videoContainer: {
          width: 'calc(50% - 15px)',
          borderRadius: 5,
          overflow: 'hidden',
          boxShadow: VARIABLE.shadowBlur,
          position: VARIABLE.position.relative
        }
      }
    },

    categoryTrendingContent: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 20,
      width: '100%',

      trendingWrap: {
        width: isMobileVersion() ? 'calc(50% - 10px)' : 'calc(25% - 15px)',
        margin: '0 0 20px',

        itemImage: (imgUrl) => ({
          width: '100%',
          paddingTop: '65%',
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          marginBottom: 10,
          position: VARIABLE.position.relative,
          transition: VARIABLE.transitionNormal
        })
      }
    },

    boxContent: {
      display: 'flex',
      flexDirection: !isMobileVersion() ? 'row' : 'column',

      largeItem: {
        flex: !isMobileVersion() ? 10 : 1,
        marginBottom: 20,
        cursor: 'pointer',

        itemImage: (image: string) => ({
          width: '100%',
          paddingTop: '65%',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: VARIABLE.position.relative,
          transition: VARIABLE.transitionNormal
        }),

        itemInfo: {
          width: '100%',
          textAlign: 'center' as const,
          height: 16,
          marginBottom: 5,
          marginTop: 10,

          infoTitle: {
            fontSize: 18,
            lineHeight: '24px',
            color: VARIABLE.color4D,
            width: '100%',
            fontWeight: 900,
            padding: '0 10px',
            textAlign: 'center' as const,
            display: VARIABLE.display.block,
            marginBottom: 10,
            transition: VARIABLE.transitionNormal,
            textTransform: 'capitalize'
          },

          textImg: {
            fontSize: 18,
            lineHeight: '24px',
            color: VARIABLE.color4D,
            width: '100%',
            fontWeight: 900,
            textAlign: 'center' as const,
            display: VARIABLE.display.block,
            marginBottom: 10,
            transition: VARIABLE.transitionNormal,
            textTransform: 'capitalize',

            position: VARIABLE.position.absolute,
            bottom: 10,
            backgroundColor: VARIABLE.colorWhite,
            maxWidth: 200
          },

          infoDescription: {
            fontSize: 14,
            lineHeight: '20px',
            maxHeight: 60,
            overflow: 'hidden',
            color: VARIABLE.color75,
            textAlign: 'center' as const,
            width: '100%',
            marginTop: isMobileVersion() ? 10 : ''
          }
        }
      },

      itemDescription: {
        fontSize: 14,
        lineHeight: '20px',
        maxHeight: 60,
        overflow: 'hidden',
        color: VARIABLE.color75,
        textAlign: !isMobileVersion() ? 'left' : 'center',
        width: '100%',
        padding: !isMobileVersion() ? '0 10px 0 20px' : '0 10px'
      },

      listSubItem: {
        width: !isMobileVersion() ? 312 : '100%',
        marginRight: !isMobileVersion() ? 30 : 0,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: !isMobileVersion() ? 'column' : 'row',
        flexWrap: 'wrap',

        subItem: {
          width: !isMobileVersion() ? '100%' : '47.5%',

          itemImage: (image: string) => ({
            width: '100%',
            paddingTop: '65%',
            backgroundImage: `url(${image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            marginBottom: 10,
            posicontion: VARIABLE.position.relative,
            transition: VARIABLE.transitionNormal
          })
        }
      }
    }
  },

  customStyleLoading: {
    height: 80
  },

  placeholder: {
    width: '100%',
    paddingTop: 20,

    title: {
      background: VARIABLE.colorF0,
      display: VARIABLE.display.block,
      width: 100,
      height: 40,
      margin: '0 auto 30px'
    },

    titleMobile: {
      margin: 0,
      textAlign: 'left' as const
    },

    control: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 20
    },

    controlItem: {
      width: 150,
      height: 30,
      background: VARIABLE.colorF7
    },

    productList: {
      display: 'flex',
      flexWrap: 'wrap',
      paddingTop: 20
    },

    productMobileItem: {
      minWidth: '50%',
      width: '50%'
    },

    productItem: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 20,
      minWidth: '20%',
      width: '20%',

      image: {
        width: '100%',
        height: 'auto',
        paddingTop: '65%',
        marginBottom: 10
      },

      text: {
        width: '100%',
        height: 65,
        marginBottom: 10
      }
    }
  },

  mobile: {
    mainWrap: {
      display: VARIABLE.display.block
    },

    heading: {
      textAlign: 'left' as const,
      paddingLeft: 16,
      paddingRight: 16,
      height: 50,
      lineHeight: '50px',
      fontWeight: VARIABLE.fontBold,
      fontSize: 16,
      color: VARIABLE.color2E
    },

    container: {
      width: '100%',
      whiteSpace: 'nowrap',
      paddingTop: 0,
      marginBottom: 0,
      overflowX: 'auto',
      overflowY: 'hidden',
      scrollSnapType: 'x mandatory',
      paddingLeft: 16,

      itemSlider: {
        width: '85%',
        maxWidth: 300,
        display: VARIABLE.display.inlineBlock,
        borderRadius: 5,
        overflow: 'hidden',
        scrollSnapAlign: 'center',
        position: VARIABLE.position.relative,
        marginRight: 16
      },

      itemSliderPanel: {
        display: 'block',
        width: '100%',
        paddingTop: '62.5%',
        borderRadius: 8,
        position: VARIABLE.position.relative,
        backgroundColor: VARIABLE.colorF7,
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
        marginBottom: 8,
        overflow: 'hidden'
      },

      itemSliderPanelImg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        objectFit: 'cover'
      },

      videoIcon: {
        width: 70,
        height: 70,
        position: VARIABLE.position.absolute,
        top: '50%',
        left: '55%',
        transform: 'translate(-50%, -50%)',
        borderTop: '35px solid transparent',
        boxSizing: 'border-box',
        borderLeft: '51px solid white',
        borderBottom: '35px solid transparent',
        opacity: 0.8
      },

      info: {
        width: '100%',
        position: VARIABLE.position.relative,
        background: VARIABLE.colorWhite,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingBottom: 5,
        minHeight: 78,

        image: (imgUrl) => ({
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: -1,
          position: VARIABLE.position.absolute,
          backgroundColor: VARIABLE.colorF7,
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: 'bottom center',
          backgroundSize: 'cover',
          filter: 'blur(4px)',
          transform: `scaleY(-1) scale(1.1)`,
          WebkitBackfaceVisibility: 'hidden',
          WebkitPerspective: 1000,
          WebkitTransform: ['translate3d(0,0,0)', 'translateZ(0)'] as any,
          backfaceVisibility: 'hidden',
          perspective: 1000
        }),

        title: {
          whiteSpace: 'pre-wrap',
          fontSize: 16,
          lineHeight: '22px',
          maxHeight: '44px',
          overflow: 'hidden',
          marginBottom: 5,
          fontWeight: VARIABLE.fontBold,
          color: VARIABLE.color2E
        },

        description: {
          fontSize: 14,
          color: VARIABLE.colorBlack,

          opacity: 0.7,
          marginRight: 10,
          whiteSpace: 'pre-wrap',
          lineHeight: '22px',
          maxHeight: 44,
          overflow: 'hidden'
        },

        tagList: {
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          height: '36px',
          maxHeight: '36px',
          overflow: 'hidden'
        },

        tagItem: {
          fontSize: 12,
          lineHeight: '18px',
          color: VARIABLE.colorBlack,

          opacity: 0.7,
          marginRight: 10,
          whiteSpace: 'pre-wrap'
        }
      }
    }
  },

  desktop: {
    heading: {
      fontSize: 30,
      lineHeight: '60px',
      color: VARIABLE.colorBlack
    },

    container: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingTop: 10,
      paddingLeft: 0,
      paddingRight: 0,
      marginBottom: 20,

      itemSlider: {
        marginBottom: 20,
        width: 'calc(50% - 10px)',
        display: VARIABLE.display.inlineBlock,
        position: VARIABLE.position.relative
      },

      smallItemSlider: {
        marginBottom: 20,
        width: 'calc(25% - 15px)',
        display: VARIABLE.display.inlineBlock,
        overflow: 'hidden',
        position: VARIABLE.position.relative
      },

      info: {
        width: '100%',
        padding: '12px 0',
        position: VARIABLE.position.relative,
        background: VARIABLE.colorWhite,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

        description: {
          fontSize: 14,
          lineHeight: '22px',
          maxHeight: 44,
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          overflow: 'hidden',
          color: VARIABLE.colorBlack,

          opacity: 0.7,
          marginRight: 10,
          whiteSpace: 'pre-wrap'
        },

        title: {
          color: VARIABLE.colorBlack,
          whiteSpace: 'pre-wrap',

          fontSize: 16,
          lineHeight: '24px',
          maxHeight: '48px',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          overflow: 'hidden',
          marginBottom: 5
        },

        tagItem: {
          fontSize: 14,
          lineHeight: '22px',
          color: VARIABLE.colorBlack,

          marginRight: 12,
          whiteSpace: 'pre-wrap'
        }
      }
    }
  }
} as any;
