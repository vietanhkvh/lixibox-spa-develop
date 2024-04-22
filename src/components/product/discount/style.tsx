import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [
      {
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 0,
        paddingBottom: 20
      }
    ] as any,

    DESKTOP: [
      {
        paddingTop: 10,
        paddingBottom: 10
      }
    ] as any,

    GENERAL: [{}] as any
  }),

  item: combineStyle({
    MOBILE: [{}] as any,

    DESKTOP: [
      {
        marginTop: 5,
        marginBottom: 5
      }
    ] as any,

    GENERAL: [
      {
        color: VARIABLE.colorBlack08,
        display: VARIABLE.display.flex,
        alignItems: 'center',
        position: VARIABLE.position.relative,
        cursor: 'pointer'
      }
    ] as any
  }),

  innerItem: {
    display: VARIABLE.display.flex,
    alignItems: 'center'
  },

  highlight: combineStyle({
    MOBILE: [{}] as any,

    DESKTOP: [{}] as any,

    GENERAL: [
      {
        paddingLeft: 3,
        paddingRight: 3,
        fontSize: 14,

        color: VARIABLE.color2E
      }
    ] as any
  }),

  content: combineStyle({
    MOBILE: [
      {
        fontSize: 12
      }
    ] as any,

    DESKTOP: [
      {
        fontSize: 14
      }
    ] as any,

    GENERAL: [
      {
        flex: 10,

        color: VARIABLE.color2E
      }
    ] as any
  }),

  icon: {
    width: 20,
    height: 15,
    color: VARIABLE.color2E
  },

  innerIcon: {
    width: 16
  },

  info: {
    container: combineStyle({
      MOBILE: [
        {
          transition: VARIABLE.transitionNormal,
          boxShadow: VARIABLE.shadowBlurSort,
          marginTop: 10
        }
      ] as any,

      DESKTOP: [
        {
          position: VARIABLE.position.absolute,
          top: 50,
          left: 0,
          width: '100%',
          boxShadow: VARIABLE.shadow4
        }
      ] as any,

      GENERAL: [
        {
          borderRadius: 5,
          zIndex: VARIABLE.zIndexMax,
          backgroundColor: VARIABLE.colorWhite,
          paddingTop: 10,
          paddingRight: 15,
          paddingBottom: 10,
          paddingLeft: 15
        }
      ] as any
    }),

    title: {
      paddingTop: 10,
      fontSize: 16,

      color: VARIABLE.colorBlack,
      marginBottom: 10
    },

    content: {
      fontSize: 14,
      color: VARIABLE.colorBlack08,
      marginBottom: 5
    },

    btnWrap: {
      display: VARIABLE.display.flex,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 10,
      marginBottom: 10,

      btn: (isAddedToCart = false) => ({
        borderRadius: 5,
        backgroundColor: isAddedToCart ? VARIABLE.colorRed : VARIABLE.color97,
        color: VARIABLE.colorWhite,
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 10,
        paddingLeft: 20,
        fontSize: 14,

        pointerEvents: isAddedToCart ? 'visible' : 'none',
        opacity: isAddedToCart ? 1 : 0.7
      })
    }
  },

  warningMessage: {
    color: VARIABLE.colorRed,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14
  }
} as any;
