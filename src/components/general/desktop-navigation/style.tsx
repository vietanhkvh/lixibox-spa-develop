import * as VARIABLE from '../../../style/variable';

const IMAGE_RATIO = '160.784%';
const SMALL_IMAGE_RATIO = '80.392%';

export default {
  zIndex: VARIABLE.zIndex8,
  position: 'relative',
  display: 'block',
  width: '100%',

  logo: {
    cursor: 'pointer',
    marginRight: 0,
    width: 0,
    opacity: 0,
    overflow: VARIABLE.visible.hidden,
    visibility: VARIABLE.visible.hidden,
    transition: VARIABLE.transitionNormal,

    show: {
      visibility: VARIABLE.visible.visible,
      opacity: 1,
      marginRight: 20,
      width: 30
    },

    icon: {
      height: 30,
      width: 30,
      color: VARIABLE.colorBlack
    }
  },

  wrapContent: {
    background: VARIABLE.colorWhite,
    position: 'relative'
  },

  fixHeader: {
    position: 'fixed',
    width: '100%',
    top: -66,
    left: 0
  },

  /** List navigation */
  listNav: {
    position: 'relative',
    height: 60,
    zIndex: VARIABLE.zIndex5,

    nav: {
      position: 'relative',
      background: VARIABLE.colorWhite,

      navItem: {
        cursor: 'pointer',
        height: 60,
        lineHeight: '60px',
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        fontSize: 16,
        fontWeight: VARIABLE.fontBold,
        color: VARIABLE.colorBlack,
        textTransform: 'uppercase',

        active: {
          color: VARIABLE.colorRed
        }
      }
    },

    navText: {
      main: {
        fontSize: 15,
        lineHeight: '20px',

        color: VARIABLE.color2E,
        opacity: 0.9,
        whiteSpace: 'nowrap'
      },

      icon: { width: 34, height: 44, color: VARIABLE.colorRed },
      innerIcon: {
        width: 22
      },

      active: {
        color: VARIABLE.colorRed
      },

      inner: {
        background: VARIABLE.colorRed,
        color: VARIABLE.colorWhite,
        height: 18,
        lineHeight: '18px',
        marginTop: 0,
        marginRight: 2,
        marginBottom: 0,
        marginLeft: 5,
        paddingTop: 0,
        paddingRight: 5,
        paddingBottom: 0,
        paddingLeft: 5,
        borderRadius: 3,
        fontSize: 10
      },

      sub: {
        fontSize: 14,
        lineHeight: '20px',

        color: VARIABLE.color4D,
        opacity: 0.5,
        whiteSpace: 'nowrap'
      },

      bold: {
        fontSize: 15,
        lineHeight: '20px',

        color: VARIABLE.colorBlack,
        opacity: 0.9,
        whiteSpace: 'nowrap'
      }
    },

    offsetSpaceNavBar: {
      flex: 1,
      height: '100%'
    },

    rightNav: {
      block: {
        cursor: 'pointer',
        marginLeft: 20,

        info: {
          textAlign: 'left' as const
        }
      },

      shoppingCart: {
        marginLeft: '0',
        position: 'relative',

        largeSpace: {
          marginLeft: 20
        },

        icon: {
          width: 44,
          height: 44,
          lineHeight: '44px',
          color: VARIABLE.colorBlack,
          position: 'relative',

          inner: {
            width: 24
          },

          value: {
            display: 'inline-block',
            backgroundColor: VARIABLE.colorRed,
            color: VARIABLE.colorWhite,
            height: 22,
            lineHeight: '24px',
            fontSize: 11,
            fontStyle: 'normal',
            borderRadius: 11,
            paddingTop: 0,
            paddingRight: 6,
            paddingBottom: 0,
            paddingLeft: 6
          }
        }
      },

      wishList: {
        marginLeft: 20,
        cursor: 'pointer',

        // [MEDIA_QUERIES.desktop1280]: {
        //   marginLeft: 20,
        // },

        icon: {
          width: 60,
          height: 44,
          lineHeight: '44px',
          fontSize: 22,
          color: VARIABLE.colorBlack,
          position: 'relative',

          inner: {
            width: 23
          }
        }
      }
    }
  },

  subNavPanel: {
    position: 'absolute',
    width: 'calc(100% + 80px)',
    left: -40,
    top: 60,
    zIndex: VARIABLE.zIndexMax,

    opacity: 0,
    visibility: VARIABLE.visible.hidden,
    transition: VARIABLE.transitionNormal,
    // transform: 'translateY(0)',

    show: {
      // transform: 'translateY(44px)',
      opacity: 1,
      visibility: VARIABLE.visible.visible,
      transition: VARIABLE.transitionNormal
    },

    content: {
      overflow: 'hidden',
      borderRadius: '0 0 8px 8px',
      background: VARIABLE.colorWhite,
      zIndex: VARIABLE.zIndex9,
      position: 'relative',
      width: '100%',
      boxShadow: `0 -1px 1px #eee`
    }
  },

  subNavContainer: {
    width: '100%',
    height: 350,
    backgroundColor: VARIABLE.colorWhite,
    boxShadow: VARIABLE.shadow3,
    position: 'relative',
    zIndex: VARIABLE.zIndex9
  },

  subBox: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10
  },

  brandContainer: {
    background: VARIABLE.colorWhite,
    boxShadow: VARIABLE.shadow3,
    width: '100%',
    height: 400,
    padding: 20,
    position: 'relative',
    zIndex: VARIABLE.zIndex9,

    list: {
      position: VARIABLE.position.absolute,
      marginLeft: 30,
      width: '80%',
      height: '100%',
      maxHeight: '100%',
      overflowX: 'hidden',
      overflowY: 'auto',

      group: {
        marginBottom: 20
      },

      heading: {
        borderBottom: `1px solid ${VARIABLE.color75}`,
        fontSize: 22,
        fontWeight: VARIABLE.fontSemiBold,
        lineHeight: '30px',
        marginBottom: 10
      },

      item: {
        fontSize: 14,
        lineHeight: '20px',
        cursor: 'pointer',
        textDecoration: 'none',
        fontWeight: VARIABLE.fontLight
      }
    },

    alphabet: {
      position: VARIABLE.position.absolute,
      top: 0,
      left: 0,
      width: '23%',
      height: '100%',
      maxHeight: '100%',

      text: {
        display: VARIABLE.display.block,
        color: VARIABLE.colorBlack07,
        fontSize: 14,
        fontWeight: VARIABLE.fontSemiBold,
        lineHeight: '18px',

        cursor: 'pointer'
      },

      pink: {
        color: VARIABLE.colorRed
      }
    }
  },

  specialContainer: {
    background: VARIABLE.colorWhite,
    boxShadow: VARIABLE.shadow3,
    width: '100%',
    paddingTop: 25,
    paddingRight: 25,
    paddingBottom: 5,
    paddingLeft: 25,
    position: 'relative',
    zIndex: VARIABLE.zIndex9,
    display: 'flex',
    flexWrap: 'wrap',

    themeItem: {
      cursor: 'pointer',
      flex: 1,
      minWidth: `calc(33.33% - 13.33px)`,
      maxWidth: `calc(33.33% - 13.33px)`,
      marginBottom: 20,
      background: VARIABLE.colorF7,
      // border: `1px solid ${VARIABLE.colorF0}`,

      image: {
        width: '100%',
        display: 'block'
      },

      name: {
        textAlign: 'center' as const,
        height: 30,
        color: VARIABLE.color4D,
        fontSize: 16,
        lineHeight: '36px'
      }
    }
  },

  subCategory: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    zIndex: VARIABLE.zIndex1,
    height: 'auto',
    minHeight: 4,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right bottom',

    column: {
      paddingTop: 20,
      paddingRight: 20,
      paddingBottom: 20,
      paddingLeft: 0,
      flex: 1,
      maxWidth: 310,

      group: {},

      groupSub: {}
    },

    description: {
      display: 'block',
      width: '100%',
      fontSize: 12,
      lineheight: '18px',
      color: VARIABLE.color75,
      marginBottom: 15,

      withBorder: {
        borderBottom: `1px solid ${VARIABLE.colorE5}`,
        paddingBottom: 7,
        marginBottom: 15
      }
    }
  },

  subNavigation: {
    shopping: {
      width: '100%',
      padding: '30px 40px',
      position: VARIABLE.position.relative,
      zIndex: VARIABLE.zIndex9,

      listCategory: {
        paddingRight: 20
      },

      subCategory: {
        transition: VARIABLE.transitionNormal,
        display: VARIABLE.display.flex,
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: '100%',
        top: 25,
        right: 25,

        col: {
          container: (width = '100%') => ({
            width,
            position: VARIABLE.position.relative
          }),

          bg: (backgroundImage: string, size = 'normal') => ({
            width: '100%',
            borderRadius: 8,
            background: VARIABLE.colorF7,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingTop: 'normal' === size ? IMAGE_RATIO : SMALL_IMAGE_RATIO
          }),

          content: {
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            position: VARIABLE.position.absolute,
            zIndex: VARIABLE.zIndex5,
            display: 'flex',
            flexDirection: 'column'
          },

          link: {
            display: VARIABLE.display.block,
            cursor: 'pointer',
            width: '100%',
            height: '100%',
            flex: 1
          },

          title: {
            fontSize: 15,

            paddingTop: 10,
            color: VARIABLE.colorBlack07,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3
          }
        },

        colCat: {
          width: 'calc(25% - 15px)'
        }
      }
    },

    bannerNavigation: {},

    brandAlphabet: {
      display: VARIABLE.display.flex,
      justifyContent: 'space-between'
    },

    colGrid: {
      paddingRight: 20,
      width: 'calc(21%)',
      position: VARIABLE.position.relative
    },

    detailCatCol: {
      width: '79%'
    },

    upperLink: {
      display: VARIABLE.display.block,

      paddingBottom: 7,
      marginBottom: 10,
      position: 'static',
      textTransform: 'uppercase',
      borderBottom: `1px solid ${VARIABLE.colorE5}`
    },

    link: {
      display: VARIABLE.display.block,
      paddingBottom: 15,
      position: 'static',

      name: {
        fontSize: 16,
        fontWeight: VARIABLE.fontSemiBold,
        lineHeight: '20px'
      },

      subName: {
        fontSize: 13,
        lineHeight: '18px',
        color: VARIABLE.color75
      }
    }
  },

  newShop: {
    container: {
      width: '100%',
      padding: '15px 40px 25px 40px',
      position: VARIABLE.position.relative,
      zIndex: VARIABLE.zIndex9,

      flexWrap: 'wrap',
      flexDirection: 'column',
      maxHeight: '70vh',
      overflow: 'auto'
    },

    group: {
      padding: 1,
      minWidth: '20%',
      maxWidth: '20%',

      withBorder: {
        width: 'calc(100% - 20px)',
        borderBottom: `1px solid ${VARIABLE.colorE5}`
      }
    },

    heading: {},

    headingLink: (isWithoutLink) => ({
      pointerEvents: isWithoutLink ? 'none' : 'all',
      display: 'block',
      padding: '20px 25px 5px 0',
      marginBottom: 5
    }),

    subList: {
      paddingBottom: 10
    },

    subLink: {
      display: 'block',
      padding: '5px 25px 5px 0'
    },

    headingName: {
      fontSize: 18,
      fontWeight: VARIABLE.fontSemiBold,
      lineHeight: '18px'
    },

    headingSecondName: {},

    name: {
      fontSize: 16,
      fontWeight: VARIABLE.fontLight,
      // color: VARIABLE.color20,
      lineHeight: '22px'
    },

    secondName: {
      fontSize: 14,
      lineHeight: '18px',
      fontWeight: VARIABLE.fontLight,
      color: VARIABLE.color8A
    }
  }
} as any;
