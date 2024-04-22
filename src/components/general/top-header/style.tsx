import * as VARIABLE from '../../../style/variable';
import * as LAYOUT from '../../../style/layout';

export const INLINE_STYLE = {
  signInButton: {
    '.sign-in-button': { color: VARIABLE.colorBlack },
    '.sign-in-button:hover': { color: VARIABLE.colorPink }
  },

  userInfo: {
    '.user-info-action': {
      top: 70,
      opacity: 0,
      visibility: 'hidden'
    },

    '.user-info-container:hover .user-info-action': {
      top: 40,
      opacity: 1,
      visibility: 'visible'
    },

    '.user-info-action > div': {
      color: VARIABLE.color2E
    },

    '.user-info-action > div:hover': {
      color: VARIABLE.colorPink
    }
  },

  tooltip: {
    '.icon-item .tooltip': {
      opacity: 0,
      visibility: 'hidden'
    },

    '.icon-item:hover .tooltip': {
      opacity: 1,
      visibility: 'visible'
    }
  }
};

const STYLE = {
  container: [
    LAYOUT.flexContainer.justify,
    LAYOUT.flexContainer.verticalCenter,
    {
      height: 60,
      position: 'relative',
      zIndex: VARIABLE.zIndex9
    }
  ] as any,

  /** Logo desktop */
  logo: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    marginRight: 50,

    icon: {
      height: 36,
      width: 36,
      color: VARIABLE.colorWhite,
      marginRight: 20
    },

    text: {
      width: 140,
      color: VARIABLE.colorWhite,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0
    }
  },

  /** Search group: dropdown - input - button */
  search: {
    flex: 10,
    height: 40,
    // border: `1px solid ${VARIABLE.colorA2}`,
    background: VARIABLE.colorWhite,
    // borderRadius: 20,
    display: 'flex',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    position: VARIABLE.position.relative,
    zIndex: VARIABLE.zIndex1,
    cursor: 'text',
    borderRadius: 8,
    // paddingLeft: 20,

    text: {
      flex: 10,
      fontSize: 14,
      color: VARIABLE.color4D,
      whiteSpace: 'nowrap'
    },

    button: {
      flex: 1,
      width: 40,
      height: 40,
      maxWidth: 40,
      minWidth: 40,
      backgroundColor: 'transparent',
      color: VARIABLE.color75,
      lineHeight: '40px',
      fontSize: 16,
      marginRight: -1,
      marginTop: -1,
      transition: VARIABLE.transitionColor,

      inner: {
        width: 18
      }
    }
  },

  /** Sign in / Sign up */
  signInSignUp: {
    borderRadius: '33px',
    height: 34,
    lineHeight: '32px',
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    fontSize: 16,
    fontWeight: VARIABLE.fontRegular,
    color: VARIABLE.color20,
    marginLeft: 50,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transition: VARIABLE.transitionNormal
  },

  /** User info when login */
  userInfo: {
    position: 'relative',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    info: {
      container: [
        LAYOUT.flexContainer,
        LAYOUT.flexContainer.justify,
        {
          flexDirection: 'column',
          cursor: 'pointer',
          marginLeft: 40,
          height: 40
        }
      ] as any,

      avatar: (avatar: string) => ({
        width: 34,
        height: 34,
        backgroundSize: 'cover',
        borderRadius: '50%',
        backgroundImage: `url(${avatar})`,
        backgroundColor: VARIABLE.colorE5,
        marginLeft: 10,
        marginRight: 10
      }),

      username: {
        fontSize: 16,
        color: VARIABLE.color20,
        fontWeight: VARIABLE.fontRegular,
        maxWidth: 150,
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        position: VARIABLE.position.relative,
        paddingRight: 15
      },

      icon: {
        position: VARIABLE.position.absolute,
        display: VARIABLE.display.inlineFlex,
        width: 12,
        height: 12,
        color: VARIABLE.color4D,
        marginLeft: 8,
        top: 4,
        right: 0
      },

      extra: {
        text: {
          fontSize: 12
        }
      }
    },

    listAction: {
      container: {
        position: 'absolute',
        backgroundColor: VARIABLE.colorWhite,
        color: VARIABLE.colorBlack,
        boxShadow: VARIABLE.shadowBlur,
        overflow: 'hidden',
        // left: 10,
        paddingTop: 10,
        paddingBottom: 10,
        transition: VARIABLE.transitionNormal
      },

      item: {
        lineHeight: '34px',
        whiteSpace: 'nowrap',
        paddingLeft: 20,
        paddingRight: 50,
        textAlign: 'left' as const,
        cursor: 'pointer'
      },

      spacer: {
        borderTop: `1px solid ${VARIABLE.colorE5}`,
        paddingTop: 10,
        marginTop: 10
      }
    }
  },

  feature: {
    iconCommon: {
      marginLeft: '0',
      position: 'relative',

      icon: {
        width: 28,
        height: 28,
        lineHeight: 28,
        color: VARIABLE.colorWhite,
        position: 'relative',

        inner: {
          width: 20
        }

        // value: {
        //   position: VARIABLE.position.absolute,
        //   display: 'inline-block',
        //   backgroundColor: VARIABLE.colorBlack,
        //   color: VARIABLE.colorWhite,
        //   height: 10,
        //   lineHeight: '20px',
        //   fontSize: 8,
        //   fontStyle: 'normal',
        //   borderRadius: 3,
        //   paddingTop: 0,
        //   paddingRight: 3,
        //   paddingBottom: 0,
        //   paddingLeft: 3,
        //   left: 36,
        //   top: 16
        // }
      },
      iconActive: {
        color: VARIABLE.colorBlack
      }
    }
  },

  iconList: {
    container: [
      LAYOUT.flexContainer.right,
      {
        // marginRight: -12
      }
    ] as any,

    block: {
      cursor: 'pointer',

      info: {
        textAlign: 'left' as const
      }
    },

    shoppingCart: {
      marginLeft: '0',
      position: 'relative',

      icon: {
        width: 52,
        height: 60,
        lineHeight: '60px',
        color: VARIABLE.colorWhite,
        position: 'relative',

        inner: {
          width: 28,
          height: 28
        },

        value: {
          position: VARIABLE.position.absolute,
          display: 'inline-block',
          backgroundColor: VARIABLE.colorRed,
          color: VARIABLE.colorWhite,
          height: 18,
          lineHeight: '20px',
          fontSize: 11,
          fontStyle: 'normal',
          borderRadius: 3,
          paddingTop: 0,
          paddingRight: 3,
          paddingBottom: 0,
          paddingLeft: 3,
          left: 36,
          top: 16
        }
      }
    },

    wishList: {
      cursor: 'pointer',

      icon: {
        width: 54,
        height: 60,
        lineHeight: '60px',
        fontSize: 22,
        color: VARIABLE.colorWhite,
        position: 'relative',

        inner: {
          width: 27
        }
      }
    },

    delivery: {
      cursor: 'pointer',

      icon: {
        width: 60,
        height: 60,
        lineHeight: '60px',
        fontSize: 22,
        color: VARIABLE.colorBlack,
        position: 'relative',

        inner: {
          width: 36,
          marginTop: 4
        }
      }
    },

    notification: {
      cursor: 'pointer',

      icon: {
        width: 60,
        height: 60,
        lineHeight: '60px',
        fontSize: 22,
        color: VARIABLE.colorBlack,
        position: 'relative',

        inner: {
          width: 26,
          marginTop: 2
        }
      }
    }
  },

  tooltip: {
    position: VARIABLE.position.absolute,
    bottom: -2,
    left: '50%',
    transform: 'translate(-50%, 60%)',

    group: {
      height: '100%',
      position: VARIABLE.position.relative,

      text: {
        padding: '0 8px',
        color: VARIABLE.colorBlack,
        background: VARIABLE.colorWhite,
        borderRadius: 3,
        boxShadow: VARIABLE.shadowBlurSort,
        whiteSpace: 'nowrap',
        lineHeight: '20px',
        fontSize: 12
      },

      icon: {
        position: VARIABLE.position.absolute,
        top: -10,
        left: '50%',
        height: 5,
        width: 5,
        borderWidth: 6,
        borderStyle: 'solid',
        borderColor: `${VARIABLE.colorTransparent} ${VARIABLE.colorTransparent} ${VARIABLE.colorWhite} ${VARIABLE.colorTransparent}`,
        transform: 'translateX(-50%)'
      }
    }
  },

  itemWrap: {
    position: VARIABLE.position.relative
  }
} as any;

export default STYLE;
