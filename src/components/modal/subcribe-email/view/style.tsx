import * as VARIABLE from 'style/variable';

export default {
  container: {
    padding: 0,
    background: VARIABLE.colorBlack,
    height: '100%'
  },

  product: {
    container: { padding: `0 20px 25px`, background: VARIABLE.colorWhite },

    image: {
      display: VARIABLE.display.block,
      width: '100%',
      marginBottom: 10,

      img: {
        display: VARIABLE.display.block,
        margin: '0 auto',
        maxWidth: 150
      }
    },

    name: {
      paddingLeft: 30,
      paddingRight: 30,
      fontSize: 16,
      lineHeight: '22px',
      color: VARIABLE.colorBlack,

      textAlign: 'center' as const,
      display: VARIABLE.display.block,
      marginBottom: 10
    },

    description: {
      fontSize: 14,
      lineHeight: '20px',
      textAlign: 'justify' as const
    }
  },

  content: {
    background: VARIABLE.colorBlack,
    padding: `30px 20px`,
    position: VARIABLE.position.relative,
    overflow: 'hidden',
    width: 370,
    maxWidth: '100%',
    margin: '0 auto',

    logo: {
      top: -60,
      right: -60,
      opacity: 0.1,
      width: 200,
      height: 200,
      color: VARIABLE.colorWhite,
      position: VARIABLE.position.absolute
    },

    innerLogoIcon: {
      width: 200
    },

    title: {
      fontWeight: VARIABLE.fontRegular,
      color: VARIABLE.colorWhite,
      fontSize: 20,
      lineHeight: '30px',
      textAlign: 'center' as const,
      textTransform: 'uppercase'
    },

    text: {
      textAlign: 'center' as const,
      paddingLeft: 10,
      paddingRight: 10,
      width: '100%',
      maxWidth: 300,
      margin: '0 auto',
      fontSize: 14,
      lineHeight: '20px',

      marginBottom: 20,
      color: VARIABLE.colorWhite08,
      paddingTop: 20
    },

    textLink: {
      textAlign: 'center' as const,
      paddingLeft: 10,
      paddingRight: 10,
      width: '100%',
      margin: '0 auto',
      fontSize: 14,
      lineHeight: '20px',

      marginBottom: 20,
      color: VARIABLE.colorWhite,
      paddingTop: 20
    },

    form: {
      paddingLeft: 20,
      paddingRight: 20,
      margin: '0 auto',
      maxWidth: 320,

      input: {
        marginBottom: 0
      },

      button: {
        height: 30,
        lineHeight: '30px',
        marginTop: 5
      }
    },

    description: {
      paddingLeft: 20,
      paddingRight: 20,
      textAalign: 'center',
      width: '100%',
      maxWidth: 360,
      margin: '0 auto',
      fontSize: 12,
      lineHeight: '18px',
      color: VARIABLE.colorWhite05,
      textAlign: 'center' as const
    }
  },

  desktop: {
    minimal: {
      display: VARIABLE.display.flex,
      position: VARIABLE.position.fixed,
      left: 20,
      bottom: 20,
      background: VARIABLE.colorBlack,
      border: `1px solid ${VARIABLE.colorWhite03}`,
      width: 60,
      height: 60,
      zIndex: VARIABLE.zIndex8,
      transform: 'rotate(-45deg)',
      cursor: 'pointer',
      borderRadius: 7,

      giftIcon: {
        width: 60,
        height: 60,
        color: VARIABLE.colorWhite,
        transform: 'rotate(45deg)'
      },

      innerGiftIcon: {
        width: 25
      }
    },

    fullContent: {
      container: {
        display: VARIABLE.display.flex,
        position: VARIABLE.position.fixed,
        left: 20,
        bottom: 20,
        background: VARIABLE.colorBlack,
        border: `1px solid ${VARIABLE.colorWhite03}`,
        zIndex: VARIABLE.zIndex8
      },

      product: {
        container: {
          padding: `25px 20px 25px`,
          background: VARIABLE.colorWhite,
          width: 190,
          margin: 1
        },

        image: {
          display: VARIABLE.display.block,
          width: '100%',
          marginBottom: 10,

          img: {
            display: VARIABLE.display.block,
            margin: '0 auto',
            maxWidth: 90
          }
        },

        name: {
          fontSize: 12,
          lineHeight: '18px',
          color: VARIABLE.colorBlack,

          textAlign: 'center' as const,
          display: VARIABLE.display.block
        }
      },

      content: {
        background: VARIABLE.colorBlack,
        padding: `25px 20px`,
        position: VARIABLE.position.relative,
        overflow: 'hidden',
        width: 360,
        maxWidth: '100%',
        margin: '0 auto',

        logo: {
          top: -60,
          right: -60,
          opacity: 0.1,
          width: 200,
          height: 200,
          color: VARIABLE.colorWhite,
          position: VARIABLE.position.absolute
        },

        innerLogoIcon: {
          width: 200
        },

        text: {
          textAlign: 'left' as const,
          width: '100%',
          margin: '0 auto',
          fontSize: 14,
          lineHeight: '20px',

          marginBottom: 20,
          color: VARIABLE.colorWhite08,
          paddingRight: 30
        },

        textLink: {
          textAlign: 'center' as const,
          paddingLeft: 10,
          paddingRight: 10,
          width: '100%',
          margin: '0 auto',
          fontSize: 14,
          lineHeight: '20px',

          marginBottom: 20,
          color: VARIABLE.colorWhite,
          paddingTop: 20
        },

        form: {
          margin: '0 auto',
          display: VARIABLE.display.flex,

          input: {
            marginBottom: 0,
            marginRight: 10,
            paddingBottom: 0,
            paddingTop: 5
          },

          button: {
            height: 30,
            lineHeight: '30px',
            marginTop: 5,
            marginBottom: 0,
            width: 100
          }
        },

        downIcon: {
          position: VARIABLE.position.absolute,
          top: 0,
          right: 0,
          width: 44,
          height: 44,
          color: VARIABLE.colorWhite,
          zIindex: VARIABLE.zIndex5,
          cursor: 'pointer'
        },

        innerDownIcon: {
          width: 16
        }
      }
    }
  },

  mobile: {
    container: {
      paddingTop: 15,
      paddingRight: 15,
      paddingBottom: 15,
      paddingLeft: 15,
      background: VARIABLE.colorWhite,
      overflow: 'hidden',
      borderRadius: '15px 15px 0 0',
      zIndex: VARIABLE.zIndexMax
    },

    header: {
      display: VARIABLE.display.flex,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,

      title: {
        fontSize: 20
      },

      close: {
        icon: {
          width: 18,
          height: 18,
          color: VARIABLE.colorBlack
        },

        innerIcon: {
          width: 18
        }
      }
    },

    product: {
      marginBottom: 20,

      container: {
        background: VARIABLE.colorWhite,
        marginRight: 10,
        display: 'block'
      },

      image: {
        display: VARIABLE.display.block,
        width: '100%',
        marginBottom: 15,

        img: {
          display: VARIABLE.display.block,
          margin: '0 auto',
          maxWidth: 150
        }
      },

      name: {
        fontSize: 14,
        lineHeight: '17px',
        color: VARIABLE.colorBlack,

        textAlign: 'center' as const,
        display: VARIABLE.display.block,
        marginBottom: 10
      },

      price: {
        fontSize: 13,
        color: VARIABLE.colorBlack07
      },

      description: {
        fontSize: 14,
        lineHeight: '20px',
        textAlign: 'center' as const
      }
    },

    sendInfo: {
      position: VARIABLE.position.relative,
      overflow: 'hidden',
      maxWidth: '100%',
      margin: '0 auto',

      form: {
        margin: '0 auto',

        input: {
          marginBottom: 10,
          height: 40,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0
        },

        button: {
          height: 40,
          lineHeight: '40px',
          marginBottom: 0,
          marginTop: 0
        }
      }
    }
  }
} as any;
