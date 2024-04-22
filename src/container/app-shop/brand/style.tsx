import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [{ paddingTop: 0 }] as any,
    DESKTOP: [{ paddingTop: 30 }] as any,
    GENERAL: [
      {
        display: 'block',
        position: 'relative',
        zIndex: VARIABLE.zIndex5
      }
    ] as any
  }),

  row: {
    display: VARIABLE.display.flex,
    flexWrap: 'wrap'
  },

  itemWrap: {
    padding: 5
  },

  customStyleLoading: {
    height: 400
  },

  placeholder: {
    width: '100%',
    paddingTop: 20,

    title: {
      background: VARIABLE.colorF0,
      display: VARIABLE.display.block,
      width: 'calc(100% - 20px)',
      height: 40,
      margin: '0 auto 30px'
    },

    titleMobile: {
      margin: '0 10px',
      textAlign: 'left' as const
    },

    control: {
      width: '100%',
      display: VARIABLE.display.flex,
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 20
    },

    controlItem: {
      width: 150,
      height: 30,
      background: VARIABLE.colorF7
    },

    productList: {
      display: VARIABLE.display.flex,
      flexWrap: 'wrap',
      paddingTop: 20
    },

    productMobileItem: {
      minWidth: '50%',
      width: '50%'
    },

    productItem: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 20,
      minWidth: '20%',
      width: '20%',

      image: {
        width: '100%',
        height: 'auto',
        paddingTop: '82%',
        marginBottom: 10
      },

      text: {
        width: '94%',
        height: 25,
        marginBottom: 10
      },

      lastText: {
        width: '65%',
        height: 25
      }
    }
  },

  headerMenuContainer: {
    display: VARIABLE.display.block,
    position: VARIABLE.position.relative,
    height: 50,
    maxHeight: 50,
    background: VARIABLE.colorWhite,

    headerMenuWrap: {
      width: '100%',
      height: '100%',
      display: VARIABLE.display.flex,
      position: VARIABLE.position.relative
    }
  },

  subContent: {
    container: (existedImage) =>
      combineStyle({
        MOBILE: [
          {
            marginTop: 0,
            padding: 16
          }
        ] as any,
        DESKTOP: [{ marginTop: 10, marginBottom: 30 }] as any,
        GENERAL: [
          {
            position: VARIABLE.position.sticky,
            top: 20,
            width: '100%',
            maxWidth: '100%'
          }
        ] as any
      }),

    wrap: {
      container: (existedImage) => ({
        position: VARIABLE.position.relative,
        paddingTop: existedImage ? 20 : 10
      }),

      imgContainer: (imgUrl) => ({
        width: 200,
        margin: '0 auto',
        height: 'auto',
        zIndex: VARIABLE.zIndex9,
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: VARIABLE.colorWhite,
        display: VARIABLE.display.block,
        marginBottom: 20
      }),

      content: {
        brandName: {
          fontSize: 22,

          textAlign: 'center' as const,
          marginBottom: 10,
          textTransform: 'uppercase',
          wordBreak: 'break-all'
        },

        description: {
          textAlign: 'justify' as const,
          fontSize: 16,
          color: VARIABLE.colorBlack06
        }
      }
    }
  },

  productInfo: {
    desc: {
      fontSize: 14,
      lineHeight: `24px`,
      overflow: `hidden`,
      fontWeight: VARIABLE.fontLight,
      color: VARIABLE.color20,
      textAlign: `justify`,
      marginBottom: 20,
      display: VARIABLE.display.inline
    },

    htmlContent: {
      fontWeight: VARIABLE.fontLight,
      fontSize: 14,
      color: VARIABLE.color20,
      lineHeight: '20px'
    },

    viewMore: {
      fontSize: 14,
      color: VARIABLE.color8A,
      cursor: 'pointer'
    }
  }
} as any;
