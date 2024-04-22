import { combineStyle } from '../../../utils/responsive';
import * as LAYOUT from '../../../style/layout';
import * as VARIABLE from '../../../style/variable';

export default {
  wrap: {
    display: VARIABLE.display.flex,
    flexDirection: 'column',
    height: '100%'
  },

  container: combineStyle({
    MOBILE: [
      {
        display: VARIABLE.display.block,
        paddingTop: 20,
        overflowX: 'hidden',
        overflowY: 'auto',
        overflowScrolling: 'touch'
      }
    ] as any,

    DESKTOP: [
      LAYOUT.flexContainer.justify,
      {
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 30,
        paddingRight: 30
      }
    ] as any,

    GENERAL: [
      {
        WebkitOverflowScrolling: 'touch',
        overflowScrolling: 'touch',
        background: VARIABLE.colorWhite,
        width: '100%',
        maxWidth: 960
      }
    ] as any
  }),

  productImage: {
    container: combineStyle({
      MOBILE: [{ paddingLeft: 30, paddingRight: 30 }] as any,
      DESKTOP: [{ paddingLeft: 0, paddingRight: 0 }] as any,
      GENERAL: [{ flex: 3 }] as any
    }),

    imageWrap: combineStyle({
      MOBILE: [{ marginTop: 0, marginBottom: 20 }] as any,
      DESKTOP: [{ marginTop: 30, marginBottom: 30 }] as any,
      GENERAL: [
        {
          width: '100%',
          paddingTop: '67.70%',
          position: VARIABLE.position.relative
        }
      ] as any
    }),

    img: {
      display: VARIABLE.display.block,
      position: VARIABLE.position.absolute,
      top: '50%',
      left: '50%',
      maxWidth: '100%',
      maxHeight: '100%',
      width: 'auto',
      height: 'auto',
      transform: 'translate(-50%, -50%)'
    },

    viewDetail: {
      display: VARIABLE.display.flex,
      alignItems: 'center',
      justifyContent: 'center',

      icon: {
        width: 10,
        height: 10,
        color: VARIABLE.colorBlack
      },

      btn: {
        border: `1px solid ${VARIABLE.colorBlack06}`,
        borderRadius: 50,
        color: VARIABLE.colorBlack,
        width: 150
      }
    }
  },

  productPrice: combineStyle({
    MOBILE: [{ paddingLeft: 20, paddingRight: 20 }] as any,
    DESKTOP: [{ paddingLeft: 0, paddingRight: 0 }] as any,
    GENERAL: [{}] as any
  }),

  productSummary: combineStyle({
    MOBILE: [{ paddingLeft: 20, paddingRight: 20 }] as any,
    DESKTOP: [{ paddingLeft: 0, paddingRight: 0 }] as any,
    GENERAL: [{}] as any
  }),

  buttonGroup: {
    container: combineStyle({
      MOBILE: [
        {
          minHeight: 60,
          position: VARIABLE.position.relative,
          bottom: 0,
          width: '100%',
          paddingBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
          backgroundColor: VARIABLE.colorWhite,
          boxShadow: VARIABLE.shadowBlurSort
        }
      ] as any,
      DESKTOP: [{ paddingLeft: 0, paddingRight: 0 }] as any,
      GENERAL: [LAYOUT.flexContainer.justify] as any
    }),

    button: {
      width: 'auto',
      flex: 1,
      marginBottom: 0,

      left: { marginRight: 5 },
      right: { marginLeft: 5 },

      iconCart: {
        width: 18,
        height: 18,
        color: VARIABLE.colorWhite,
        position: VARIABLE.position.relative,
        top: -3
      },

      iconTime: {
        width: 18,
        height: 18,
        color: VARIABLE.colorWhite,
        position: VARIABLE.position.relative,
        marginTop: -2
      },

      iconLove: {
        width: 16,
        height: 16,
        color: VARIABLE.color4D,
        position: VARIABLE.position.relative,
        top: -1,

        liked: {
          color: VARIABLE.colorBlack
        }
      }
    },

    btnWaiting: combineStyle({
      MOBILE: [
        {
          marginBottom: 0,
          marginTop: 10,
          width: 'auto',
          padding: `0 20px`
        }
      ] as any,

      DESKTOP: [
        {
          flex: 1,
          marginBottom: 0
        }
      ] as any,

      GENERAL: [
        {
          color: VARIABLE.color4D,
          background: VARIABLE.colorWhite,
          border: `1px solid ${VARIABLE.color4D}`,
          pointerEvents: 'none',
          marginRight: 5
        }
      ] as any
    }),

    quantity: {
      marginTop: 10,
      marginRight: 5
    }
  },

  productInfo: {
    container: combineStyle({
      MOBILE: [{ paddingLeft: 0 }] as any,
      DESKTOP: [{ paddingLeft: 30 }] as any,
      GENERAL: [{ flex: 4 }] as any
    }),

    description: combineStyle({
      MOBILE: [{ paddingLeft: 20, paddingRight: 20, marginBottom: 20 }] as any,
      DESKTOP: [
        {
          paddingLeft: 0,
          paddingRight: 0,
          overflow: 'auto',
          maxHeight: 88,
          marginBottom: 10
        }
      ] as any,

      GENERAL: [
        {
          textAlign: 'justify' as const,
          marginTop: 20,
          fontSize: 14,
          lineHeight: `22px`
        }
      ] as any
    })
  }
} as any;
