import * as VARIABLE from 'style/variable';

export default {
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
  }
} as any;
