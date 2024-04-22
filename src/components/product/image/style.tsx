import { combineStyle } from '../../../utils/responsive';
import * as VARIABLE from '../../../style/variable';

export default {
  display: 'block',
  width: '100%',
  marginBottom: 20,
  position: 'relative',

  main: {
    container: combineStyle({
      MOBILE: [
        {
          paddingRight: 0,
          paddingLeft: 0
        }
      ] as any,

      DESKTOP: [
        {
          paddingRight: 50,
          paddingLeft: 50
        }
      ] as any,

      GENERAL: [
        {
          width: '100%',
          marginBottom: 20,
          paddingTop: 0,
          position: 'relative',
          paddingBottom: 0
        }
      ] as any
    }),

    image: {
      width: '100%',
      height: 'auto',
      paddingTop: '67.7325%',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: VARIABLE.position.relative
    }
  },

  productImageSlider: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',

    sliderPanel: {
      overflowX: 'auto',
      display: 'flex',
      height: '100%',
      scrollSnapType: 'x mandatory'
    },

    sliderItem: {
      scrollSnapAlign: 'center',
      top: 0,
      left: 0,
      minWidth: '100%',
      width: '100%',
      height: '100%',
      display: 'block',
      position: 'relative'
    }
  },

  list: {
    container: {
      width: '100%',
      paddingLeft: 15,
      paddingRight: 15,
      transition: VARIABLE.transitionNormal,
      marginTop: 0,
      marginRight: 'auto',
      marginBottom: 0,
      marginLeft: 'auto',
      justifyContent: 'center',
      display: 'flex'
    },

    viewmoreItem: {
      overflow: 'hidden',
      borderRadius: 10,

      color: VARIABLE.colorWhite,
      textAlign: 'center' as const,
      fontSize: 11,
      lineHeight: '16px',
      backgroundSize: 'cover',
      width: 85
    },

    innerViewmoreItem: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: VARIABLE.colorBlack,
      transform: 'scale(1.5)',
      zIndex: VARIABLE.zIndex1,
      opacity: 0.35
    },

    textViewmoreItem: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      fontSize: 14,
      fontWeight: VARIABLE.fontSemiBold,
      zIndex: VARIABLE.zIndex5,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      letterSpacing: 0.5
    },

    videoIcon: {
      width: 30,
      height: 40,
      borderTop: '20px solid transparent',
      borderBottom: '20px solid transparent',
      borderLeft: '30px solid #FFF',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 1000
    },

    item: {
      icon: {
        color: VARIABLE.colorWhite,
        zIndex: VARIABLE.zIndex2,
        width: 30,
        height: 30
      },

      video: {
        transition: VARIABLE.transitionNormal,
        backgroundColor: VARIABLE.colorF7,
        width: '100%',
        height: '100%',
        position: VARIABLE.position.absolute,
        top: 0,
        left: 0
      }
    }
  },

  customStyleLoading: {
    height: 350
  },

  placeholder: {
    // marginTop: 400,
    marginBottom: 50,

    main: {
      width: '100%',
      paddingTop: '67.7325%',
      marginBottom: 20
    },

    list: {
      display: VARIABLE.display.flex,
      justifyContent: 'center'
    },

    item: {
      width: 120,
      height: 80,
      marginLeft: 10,
      marginRight: 10
    }
  },

  statusNumber: combineStyle({
    MOBILE: [
      {
        left: 16
      }
    ] as any,

    DESKTOP: [
      {
        left: '50%',
        marginLeft: -20
      }
    ] as any,

    GENERAL: [
      {
        height: 20,
        lineHeight: '20px',
        background: VARIABLE.colorF5,
        borderRadius: 4,
        fontSize: 12,
        color: VARIABLE.color20,
        fontWeight: VARIABLE.fontLight,
        position: 'absolute',
        bottom: 16,

        padding: '0 6px'
      }
    ] as any
  })
} as any;
