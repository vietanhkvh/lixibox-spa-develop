import * as VARIABLE from '../../../style/variable';

export default {
  container: {
    width: '100%',
    background: VARIABLE.colorWhite,
    zIndex: VARIABLE.zIndexMax,
    transform: `translate3d(0, 150%, 0)`,
    visibility: 'hidden',
    opacity: 0,
    transition: VARIABLE.transitionNormal,
    overflow: 'hidden',
    borderRadius: '15px 15px 0 0',

    visible: {
      transform: `translate3d(0, 0%, 0)`,
      visibility: 'visible',
      opacity: 1,
      transition: VARIABLE.transitionNormal
    },

    content: {
      paddingTop: 66,
      paddingRight: 16,
      paddingBottom: 16,
      paddingLeft: 16,

      header: {
        display: VARIABLE.display.flex,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,

        title: {
          fontSize: 26
        },

        close: {
          icon: {
            width: 20,
            height: 20,
            color: VARIABLE.colorBlack
          },

          innerIcon: {
            width: 20
          }
        }
      },

      productInfo: {
        display: VARIABLE.display.flex,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        position: VARIABLE.position.relative,
        opacity: 1,

        hidden: {
          opacity: 0.2,
          pointerEvents: 'none'
        },

        avatarContainer: {
          width: 90,
          height: 'auto',
          marginRight: 20,
          transition: VARIABLE.transitionOpacity,

          img: {
            width: '100%',
            height: '100%'
          }
        },

        info: {
          flex: 10,

          name: {
            fontSize: 13,
            fontWeight: VARIABLE.fontLight,
            marginBottom: 10,
            lineHeight: '20px',
            maxHeight: 60,
            overflow: 'hidden'
          },

          price: {
            color: VARIABLE.color20,
            fontWeight: VARIABLE.fontSemiBold,
            display: VARIABLE.display.flex,
            justifyContent: 'space-between',
            alignItems: 'center'
          }
        },

        removeConfirmation: {
          position: 'absolute',
          top: 0,
          right: 0,
          paddingLeft: 20,
          zIndex: VARIABLE.zIndex5,
          height: '100%',
          width: 'calc(100% - 100px)',
          background: VARIABLE.colorWhite,
          transition: VARIABLE.transitionNormal,
          transform: 'translateX(120%)',
          visibility: 'hidden',
          maxWidth: 330,
          opacity: 0,

          show: {
            opacity: 1,
            transform: 'translateX(0)',
            visibility: 'visible'
          },

          text: {
            fontSize: 16,
            lineHeight: '24px'
          },

          action: {
            button: {
              flex: 1,
              marginRight: 10
            }
          }
        },

        trash: {
          width: 40,
          height: 40,
          color: VARIABLE.colorCC
        },

        trashOuter: {
          width: 40,
          height: 40,
          cursor: 'pointer',
          marginRight: -10,
          transition: VARIABLE.transitionNormal
        },

        trashInner: {
          width: 18,
          height: 'auto'
        }
      },

      checkoutBtn: {
        width: '100%',
        borderRadius: 5,
        background: VARIABLE.colorBlack,
        color: VARIABLE.colorWhite,
        height: 40,
        lineHeight: '40px',
        textAlign: 'center' as const,
        fontSize: 15,

        display: VARIABLE.display.block
      }
    }
  },

  overlay: (isShowModal = false) => ({
    position: VARIABLE.position.fixed,
    top: 0,
    left: 0,
    width: '100%',
    height: '200vh',
    zIndex: VARIABLE.zIndex9,
    background: VARIABLE.colorBlack06,
    visibility: isShowModal ? 'visible' : 'hidden',
    opacity: isShowModal ? 1 : 0
  })
} as any;
