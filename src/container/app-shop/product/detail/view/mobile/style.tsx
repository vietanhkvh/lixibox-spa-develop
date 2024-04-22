import * as VARIABLE from '../../../../../../style/variable';
import { combineStyle } from '../../../../../../utils/responsive';

export default {
  mobile: {
    priceBlock: {
      height: 70,
      width: '100%',
      position: 'fixed',
      bottom: 0,
      left: 0,
      display: 'flex',
      background: VARIABLE.colorWhite,
      zIndex: VARIABLE.zIndex9,
      paddingTop: 13,
      paddingRight: 16,
      paddingBottom: 13,
      paddingLeft: 16,
      alignItems: 'center',
      overflow: 'hidden',
      borderBottom: `1px solid ${VARIABLE.colorBlack005}`,
      boxShadow: '0 -2px 10px rgba(0, 0, 0, .08)',

      addToCart: {
        flex: 1,
        minWidth: 120,
        marginTop: 0,
        marginBottom: 0,

        icon: {
          width: 18,
          minWidth: 18,
          height: 18,
          color: VARIABLE.colorWhite,
          position: VARIABLE.position.relative,
          top: -2
        }
      }
    },

    priceContainer: {
      position: VARIABLE.position.relative,
      height: 70,
      maxHeight: 70
    }
  },

  desktop: {
    buttonGroup: {
      btnWaiting: combineStyle({
        MOBILE: [
          {
            marginBottom: 0,
            marginTop: 0,
            width: 300,
            padding: `0 20px`
          }
        ] as any,

        DESKTOP: [
          {
            flex: 1,
            marginRight: 7
          }
        ] as any,

        GENERAL: [
          {
            color: VARIABLE.color4D,
            border: `1px solid ${VARIABLE.color4D}`,
            pointerEvents: 'none'
          }
        ] as any
      })
    }
  },

  newMobile: {
    shoppingCart: {
      transition: VARIABLE.transitionWidth,
      marginLeft: '0',
      position: 'relative',
      width: 0,
      opacity: 0,

      show: {
        width: 70,
        opacity: 1
      },

      value: {
        position: VARIABLE.position.absolute,
        display: 'inline-block',
        backgroundColor: VARIABLE.colorRed,
        color: VARIABLE.colorWhite,
        height: 16,
        lineHeight: '18px',
        fontSize: 11,
        fontStyle: 'normal',
        borderRadius: 3,
        paddingTop: 0,
        paddingRight: 3,
        paddingBottom: 0,
        paddingLeft: 3,
        right: 10,
        top: 10
      }
    },

    menuIcon: {
      minWidth: 70,
      width: 70,
      height: 60,
      color: VARIABLE.colorBlack08,
      cursor: 'pointer',

      inner: {
        width: 25,
        height: 30
      }
    },

    mobileRatingGroup: {
      loveAction: {
        button: {
          height: 44,
          width: 44,
          minWidth: 44,
          marginTop: 0,
          marginBottom: 0,
          borderRadius: 8,
          background: VARIABLE.colorF5,
          boxShadow: 'none',
          marginRight: 8
        },

        icon: {
          width: 16,
          height: 16,
          marginRight: 0,
          marginLeft: 0,
          color: VARIABLE.color20,
          position: VARIABLE.position.relative
        },

        likedIcon: {
          color: VARIABLE.colorPrimary
        }
      }
    },

    container: {
      display: VARIABLE.display.flex,
      flexDirection: `column`,
      position: VARIABLE.position.relative
    },

    mobileProductColor: {
      paddingLeft: 16,
      paddingRight: 16,
      marginBottom: 10
    }
  },

  newBrandName: {
    fontWeight: VARIABLE.fontSemiBold,
    fontSize: 14,
    lineHeight: '22px',
    color: VARIABLE.colorBlue,
    padding: '0 16px'
  }
} as any;
