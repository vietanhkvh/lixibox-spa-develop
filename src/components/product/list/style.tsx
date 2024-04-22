import { getDeviceVersion, combineStyle } from '../../../utils/responsive';
import * as VARIABLE from '../../../style/variable';

const generateSwitchStyle = (mobile, desktop) => {
  const switchStyle = {
    MOBILE: { padding: 5, width: mobile, minWidth: mobile },
    DESKTOP: { width: desktop }
  };

  return switchStyle[getDeviceVersion()];
};

export default {
  paddingBottom: 20,

  container: {
    paddingTop: 0,
    display: VARIABLE.display.block,
    position: VARIABLE.position.relative,
    width: '100%'
  },

  column: {
    2: generateSwitchStyle(window.innerWidth < 375 ? '100%' : window.innerWidth > 480 ? '33.33%' : '50%', '33.33%'),
    3: generateSwitchStyle('50%', '33.33%'),
    4: generateSwitchStyle('50%', '25%'),
    5: generateSwitchStyle('50%', '20%'),
    6: generateSwitchStyle('50%', '16.66%')
  },

  blockContent: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 10,
    paddingLeft: 0
  },

  statInfoContainer: {
    width: `100%`,
    position: VARIABLE.position.relative,
    height: 50,
    maxHeight: 50,

    statInfo: {
      container: combineStyle({
        MOBILE: [
          {
            position: VARIABLE.position.absolute,
            top: 0,
            left: 0,
            borderBottom: `1px solid ${VARIABLE.colorBlack005}`,
            height: 50,
            maxHeight: 50
          }
        ] as any,

        DESKTOP: [
          {
            marginBottom: 15,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            paddingLeft: 0
          }
        ] as any,

        GENERAL: [
          {
            width: '100%',
            position: 'relative'
          }
        ] as any
      }),

      isTop: {
        top: 0,
        left: 0,
        position: VARIABLE.position.fixed
      },

      count: {
        height: 32,
        lineHeight: '32px',
        fontSize: 12,
        color: VARIABLE.color4D,
        whiteSpace: 'nowrap',
        display: VARIABLE.display.flex,
        alignItems: `center`,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        borderRadius: 3,
        cursor: `pointer`,

        number: {
          color: VARIABLE.color2E,

          marginRight: 5
        },

        title: {
          fontSize: 15,
          flex: 10,
          marginRight: 5,

          color: VARIABLE.color4D
        },

        icon: {
          width: 14,
          heigth: 14,
          color: VARIABLE.colorBlack08
        },

        innerStyle: {
          width: 10
        }
      },

      sort: {
        position: 'relative',

        text: {
          height: 32,
          lineHeight: '32px',
          fontSize: 12,
          color: VARIABLE.color4D,
          paddingRight: 10,
          display: 'none'
        },

        item: {
          cursor: 'pointer',
          color: VARIABLE.color4D,

          icon: combineStyle({
            MOBILE: [
              {
                width: 49,
                height: 49,
                minWidth: 49
              }
            ] as any,

            DESKTOP: [
              {
                width: 30,
                height: 30,
                minWidth: 30
              }
            ] as any,

            GENERAL: [
              {
                color: VARIABLE.color4D
              }
            ] as any
          }),

          inner: {
            height: 14
          },

          title: {
            height: 30,
            lineHeight: '30px',
            fontSize: 12,
            whiteSpace: 'nowrap',
            color: 'inherit',

            selected: {
              display: 'none'
            }
          }
        },

        itemSelected: {
          container: combineStyle({
            MOBILE: [
              {
                borderLeft: `1px solid ${VARIABLE.colorBlack005}`,
                background: VARIABLE.colorWhite
              }
            ] as any,

            DESKTOP: [
              {
                paddingTop: 0,
                paddingRight: 15,
                paddingBottom: 0,
                paddingLeft: 0,
                borderRadius: 5,
                border: `1px solid ${VARIABLE.colorD2}`
              }
            ] as any,

            GENERAL: [
              {
                transition: VARIABLE.transitionNormal
              }
            ] as any
          }),

          noBorder: combineStyle({
            MOBILE: [{}] as any,
            DESKTOP: [{ border: `1px solid ${VARIABLE.colorWhite}` }] as any,
            GENERAL: [{}] as any
          })
        },

        list: {
          visibility: 'hidden',
          position: 'absolute',
          top: 42,
          right: 0,
          boxShadow: VARIABLE.shadowBlur,
          backgroundColor: VARIABLE.colorWhite,
          borderRadius: 3,
          paddingTop: 12,
          paddingRight: 0,
          paddingBottom: 12,
          paddingLeft: 0,
          transition: VARIABLE.transitionTop,

          show: combineStyle({
            MOBILE: [
              {
                top: 50
              }
            ] as any,

            DESKTOP: [
              {
                top: 32
              }
            ] as any,

            GENERAL: [
              {
                visibility: 'visible'
              }
            ] as any
          })
        }
      },

      iconWithoutText: {
        category: {
          marginRight: 10
        },

        filter: {
          marginLeft: 10
        }
      }
    },

    head: {
      height: 50,

      title: {
        color: VARIABLE.colorBlack08,
        fontSize: 14
      }
    },

    subCategory: combineStyle({
      MOBILE: [
        {
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 10,
          background: VARIABLE.colorWhite
        }
      ] as any,

      DESKTOP: [{}] as any,

      GENERAL: [
        {
          display: 'flex',
          flex: 1,
          justifyContent: 'flex-start'
        }
      ] as any
    }),

    sortContainer: {
      background: VARIABLE.colorWhite
    },

    filter: {
      position: VARIABLE.position.relative,
      borderLeft: `1px solid ${VARIABLE.colorBlack005}`,
      zIndex: VARIABLE.zIndexMax,

      icon: {
        width: 50,
        height: 50,
        color: VARIABLE.colorBlack08,
        transition: VARIABLE.transitionNormal,
        transform: 'rotate(0deg)'
      },

      inner: {
        width: 16,
        height: 16
      },

      angle: {
        position: VARIABLE.position.absolute,
        top: 30,
        right: 15,
        borderTop: `10px solid ${VARIABLE.colorTransparent}`,
        borderRight: `10px solid ${VARIABLE.colorTransparent}`,
        borderBottom: `10px solid ${VARIABLE.colorE5}`,
        borderLeft: `10px solid ${VARIABLE.colorTransparent}`
      }
    },

    overlay: {
      position: VARIABLE.position.absolute,
      width: '100vw',
      height: '100vh',
      top: 50,
      left: 0,
      zIndex: VARIABLE.zIndex9,
      background: VARIABLE.colorBlack06,
      transition: VARIABLE.transitionNormal
    }
  },

  listContainer: {
    position: 'relative',
    zIndex: VARIABLE.zIndex1,
    width: '100%',
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5
  },

  customStyleLoading: {
    height: 350
  },

  modal: {
    container: (isShow = false) => ({
      position: VARIABLE.position.fixed,
      top: 49,
      left: 0,
      width: `100%`,
      height: `100vh`,
      transition: VARIABLE.transitionNormal,
      zIndex: VARIABLE.zIndex9,
      backgroundColor: VARIABLE.colorWhite,
      transform: isShow ? `rotate3d(0, 100%, 0)` : `rotate3d(0, 0, 0)`,
      display: VARIABLE.display.flex,
      flexDirection: `column`
    }),

    header: {
      display: VARIABLE.display.flex,
      alignItems: `center`,
      height: 50,
      paddingLeft: 20,
      paddingRight: 20,
      justifyContent: `space-between`,
      backgroundColor: VARIABLE.colorBlack005,

      wrap: {
        display: VARIABLE.display.flex,
        alignItems: `center`,
        width: 100,
        heigth: '100%'
      },

      name: {
        fontSize: 14,
        marginLeft: 10
      },

      icon: {
        width: 16,
        height: 16
      },

      innerStyle: {
        width: 14
      }
    },

    detailGroup: {
      height: `100%`,
      display: VARIABLE.display.flex,
      justifyContent: `center`,
      flexDirection: `column`,

      subText: {
        fontSize: 10,
        color: VARIABLE.colorBlack07,
        marginRight: 2,
        textAlign: `right`
      },

      text: {
        fontSize: 16,
        lineHeight: '20px',
        color: VARIABLE.colorBlack,

        whiteSpace: `nowrap`,
        textOverflow: `ellipsis`,
        overflow: `hidden`,
        textAlign: `right`,
        maxWidth: 200
      }
    },

    wrap: {
      borderTop: `1px solid ${VARIABLE.colorF0}`,
      flex: 10,
      backgroundColor: VARIABLE.colorWhite,

      group: {
        display: VARIABLE.display.flex,
        alignItems: `center`,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottom: `1px solid ${VARIABLE.colorF0}`,
        minHeight: 50,

        name: {
          flex: 10,
          fontSize: 14,
          color: VARIABLE.color2E,

          main: {
            fontSize: 14,
            color: VARIABLE.color2E
          },

          sub: {
            fontSize: 11,
            color: VARIABLE.color75
          }
        },

        icon: {
          width: 8,
          height: 8,
          color: VARIABLE.colorBlack08
        },

        innerStyle: {
          width: 8
        }
      }
    }
  },

  brandList: {
    container: combineStyle({
      MOBILE: [
        {
          whiteSpace: 'nowrap',
          overflowX: 'scroll',
          marginLeft: 5,
          marginRight: 5,
          paddingTop: 10
        }
      ] as any,

      DESKTOP: [
        {
          flexWrap: 'wrap',
          marginBottom: 20,
          marginLeft: -10,
          marginRight: -10,
          width: `calc(100% + 20px)`
        }
      ] as any,

      GENERAL: [
        {
          display: VARIABLE.display.flex
        }
      ] as any
    }),

    brandItem: {
      container: combineStyle({
        MOBILE: [
          {
            paddingTop: 5,
            paddingRight: 5,
            paddingBottom: 5,
            paddingLeft: 5
          }
        ] as any,

        DESKTOP: [
          {
            width: '16.66%',
            paddingTop: 10,
            paddingRight: 10,
            paddingBottom: 10,
            paddingLeft: 10
          }
        ] as any,

        GENERAL: [
          {
            cursor: 'pointer',
            position: VARIABLE.position.relative
          }
        ] as any
      }),

      brand: {
        container: combineStyle({
          MOBILE: [
            {
              paddingTop: 5,
              paddingBottom: 5,
              filter: 'grayscale(100%)',
              boxShadow: VARIABLE.shadowBlurSort
            }
          ] as any,

          DESKTOP: [
            {
              paddingTop: 10,
              paddingBottom: 10
            }
          ] as any,

          GENERAL: [
            {
              display: VARIABLE.display.flex,
              flexDirection: 'column',
              borderRadius: 5,
              paddingLeft: 5,
              paddingRight: 5
            }
          ] as any
        }),

        fallbackContainer: combineStyle({
          MOBILE: [
            {
              height: 50,
              width: 110
            }
          ] as any,
          DESKTOP: [
            {
              height: 60
            }
          ] as any,
          GENERAL: [
            {
              textAlign: 'center' as const,
              lineHeight: '40px'
            }
          ] as any
        }),

        textContent: {
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          fontSize: 20,
          maxWidth: 115
        },

        avatar: combineStyle({
          MOBILE: [
            {
              width: 100
            }
          ] as any,

          DESKTOP: [
            {
              width: '100%',
              minWidth: 100
            }
          ] as any,

          GENERAL: [
            {
              height: 40,
              objectFit: 'contain'
            }
          ] as any
        }),

        closeIconStyle: combineStyle({
          MOBILE: [
            {
              width: 12,
              height: 12
            }
          ] as any,

          DESKTOP: [
            {
              width: 20,
              height: 20
            }
          ] as any,

          GENERAL: [
            {
              color: VARIABLE.colorWhite
            }
          ] as any
        }),

        closeIconInnerStyle: combineStyle({
          MOBILE: [
            {
              width: 12
            }
          ] as any,

          DESKTOP: [
            {
              width: 20
            }
          ] as any,

          GENERAL: [{}] as any
        }),

        overlayMobile: {
          position: VARIABLE.position.absolute,
          top: 6,
          right: 6,
          width: 25,
          height: 25,
          background: VARIABLE.colorBlack04,
          display: VARIABLE.display.flex,
          alignItems: 'center',
          justifyContent: 'center',
          borderTopRightRadius: 4
        },

        viewMore: combineStyle({
          MOBILE: [
            {
              height: 50,
              flexDirection: 'row'
            }
          ] as any,

          DESKTOP: [
            {
              height: 62,
              border: `1px solid ${VARIABLE.colorBlack01}`
            }
          ] as any,

          GENERAL: [
            {
              display: VARIABLE.display.flex,
              alignItems: 'center',
              justifyContent: 'center',

              textAlign: 'center' as const,
              fontSize: 14
            }
          ] as any
        }),

        txtViewMore: combineStyle({
          MOBILE: [
            {
              marginRight: 5
            }
          ] as any,

          DESKTOP: [{}] as any,

          GENERAL: [
            {
              fontSize: 14
            }
          ] as any
        })
      },

      selected: {
        filter: 'none',
        border: `1px solid ${VARIABLE.colorRed}`,
        transition: VARIABLE.transitionNormal,
        boxShadow: VARIABLE.shadow.selection1
      }
    }
  },

  brandPriceGroup: combineStyle({
    MOBILE: [
      {
        position: VARIABLE.position.absolute,
        top: 50,
        right: -50,
        background: VARIABLE.colorWhite,
        width: 200,
        maxWidth: 200,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        maxHeight: 'calc(100vh - 200px)',
        overflowX: 'hidden',
        overflowY: 'auto',
        boxShadow: '0 3px 3px rgba(0,0,0,.25)',
        zIndex: VARIABLE.zIndexMax
      }
    ] as any,

    DESKTOP: [
      {
        paddingLeft: 10,
        paddingRight: 10
      }
    ] as any,

    GENERAL: [{}] as any
  }),

  tooltip: {
    position: VARIABLE.position.absolute,
    top: 80,
    left: '50%',
    transform: 'translate3d(-50%, 0, 0)',
    zIndex: VARIABLE.zIndex5,

    group: {
      height: '100%',
      position: VARIABLE.position.relative,

      text: {
        padding: '0 8px',
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
        top: -17,
        left: '50%',
        height: 5,
        width: 5,
        borderWidth: 6,
        borderStyle: 'solid',
        borderColor: `${VARIABLE.colorTransparent} ${VARIABLE.colorTransparent} ${VARIABLE.colorBlack} ${VARIABLE.colorTransparent}`,
        transform: 'translate(-50%, 50%)'
      }
    }
  }
} as any;
