import * as VARIABLE from '../../../style/variable';

export default {
  display: 'block',
  position: VARIABLE.position.fixed,
  background: VARIABLE.colorWhite,
  width: '100vw',
  height: '100%',
  visibility: VARIABLE.visible.hidden,
  top: 0,
  left: 0,
  zIndex: VARIABLE.zIndexMax,
  overflow: 'auto',
  transition: VARIABLE.transitionNormal,
  transform: 'translateX(100%)',
  opacity: 0,

  show: {
    visibility: VARIABLE.visible.visible,
    transform: 'translateX(0)',
    opacity: 1
  },

  menu: {
    paddingRight: 0,
    paddingLeft: 0,
    flex: 10,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',

    heading: {
      display: VARIABLE.display.flex,
      background: VARIABLE.colorWhite,
      height: 50,
      minHeight: 50,
      maxHeight: 50,
      boxShadow: VARIABLE.shadowBlurSort,

      logoGroup: {
        display: VARIABLE.display.flex,

        logo: {
          height: 50,

          line: {
            width: 50,
            height: 50,
            color: VARIABLE.colorBlack,
            marginLeft: 10,
            marginRight: 10,

            inner: {
              width: 30
            }
          },

          text: {
            width: 120,
            height: 50,
            color: VARIABLE.colorBlack,

            inner: {
              width: 120
            }
          }
        }
      },

      closePanel: {
        top: 0,
        right: 0,
        color: VARIABLE.colorBlack,
        width: 50,
        height: 50,

        inner: {
          width: 16
        }
      }
    },

    item: {
      display: VARIABLE.display.flex,
      alignItems: 'center',
      height: 40,

      title: {
        lineHeight: '40px',
        fontSize: 18,
        color: VARIABLE.colorBlack,

        flex: 10
      },

      text: {
        display: VARIABLE.display.flex,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        fontSize: 14,
        color: VARIABLE.colorBlack
      }
    },

    contentGroup: {
      display: VARIABLE.display.block,
      overflowY: 'auto',

      content: {
        paddingTop: 20,
        paddingLeft: 10,
        borderBottom: `1px solid ${VARIABLE.colorD2}`
      },

      about: {
        paddingTop: 20
      }
    }
  }
} as any;
