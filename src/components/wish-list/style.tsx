import * as VARIABLE from '../../style/variable';
import { combineStyle } from '../../utils/responsive';

export default {
  container: {},

  row: combineStyle({
    MOBILE: [{ padding: `10px 0 10px 0`, marginBottom: 0 }] as any,
    DESKTOP: [
      {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0
      }
    ] as any,
    GENERAL: [
      {
        display: VARIABLE.display.flex,
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }
    ] as any
  }),

  contentGroup: {
    container: combineStyle({
      MOBILE: [{ marginBottom: 10, width: '100%' }] as any,
      DESKTOP: [{ marginBottom: 20, width: 'calc(50% - 10px)' }] as any,
      GENERAL: [
        {
          borderRadius: 3,
          boxShadow: VARIABLE.shadowBlurSort
        }
      ] as any
    }),

    inner: {
      display: VARIABLE.display.flex,
      justifyContent: 'space-between'
    },

    imgGroup: {
      display: VARIABLE.display.flex,
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: 'calc(40% - 10px)',

      img: {
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        paddingTop: '100%'
      },

      btn: {
        marginBottom: 0,
        maxWidth: 200
      }
    },

    rateGroup: {
      display: VARIABLE.display.flex,
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: 'calc(60%)',

      header: {
        title: {
          fontSize: 16,
          marginBottom: 5,
          color: VARIABLE.colorBlack
        },

        price: {
          fontSize: 15,
          marginBottom: 5
        },

        date: {
          fontSize: 12,
          color: VARIABLE.colorBlack05
        },

        rateGroup: {
          container: combineStyle({
            MOBILE: [{ flexDirection: 'column' }] as any,
            DESKTOP: [{ alignItems: 'center', flexDirection: 'row' }] as any,
            GENERAL: [{ display: VARIABLE.display.flex, marginBottom: 10 }] as any
          }),

          ratingStarIcon: {
            display: VARIABLE.display.flex,
            alignItems: 'center'
          },

          slash: combineStyle({
            MOBILE: [{ display: VARIABLE.display.none }] as any,
            DESKTOP: [{ display: VARIABLE.display.block }] as any,
            GENERAL: [{ color: VARIABLE.colorBlack05 }] as any
          }),

          inner: {
            width: 15
          },

          rate: {
            padding: '0px 5px',
            height: 30,
            lineHeight: '35px'
          },

          love: combineStyle({
            MOBILE: [{ lineHeight: '32px' }] as any,
            DESKTOP: [{ lineHeight: '35px' }] as any,
            GENERAL: [{ height: 30 }] as any
          })
        },

        review: {
          maxHeight: 200,
          overflow: 'hidden',
          fontSize: 14
        }
      },

      btn: {
        marginBottom: 0
      }
    }
  },

  content: {
    container: combineStyle({
      MOBILE: [{ margin: '0 10px 10px 10px' }] as any,
      DESKTOP: [{ margin: '0 0 20px 0' }] as any,
      GENERAL: [
        {
          display: VARIABLE.display.flex,
          width: '100%',
          borderRadius: '3px',
          border: `1px solid ${VARIABLE.colorD2}`
        }
      ] as any
    }),

    imageGroup: {
      display: VARIABLE.display.block,
      padding: '10px',

      image: combineStyle({
        MOBILE: [
          {
            width: window.innerWidth <= VARIABLE.breakPoint320 ? '60px' : '100px',
            height: window.innerWidth <= VARIABLE.breakPoint320 ? '60px' : '100px'
          }
        ] as any,

        DESKTOP: [{ width: '200px', height: '175px' }] as any,
        GENERAL: [
          {
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            padding: '10px'
          }
        ] as any
      })
    }
  },

  placeholder: {
    width: '100%',

    title: {
      background: VARIABLE.colorF0,
      display: VARIABLE.display.block,
      width: 100,
      height: 40,
      margin: '0 auto 30px'
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
      paddingTop: 5
    },

    productMobileItem: {
      minWidth: '50%',
      width: '50%',
      paddingLeft: 5,
      paddingRight: 5,
      marginBottom: 10
    },

    productItem: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 20,
      minWidth: '25%',
      width: '25%',

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

  note: combineStyle({
    MOBILE: [
      {
        fontSize: 16
      }
    ] as any,

    DESKTOP: [
      {
        fontSize: 20
      }
    ] as any,

    GENERAL: [
      {
        textAlign: 'center' as const
      }
    ] as any
  }),

  listItem: {
    display: 'flex',
    flexDirection: 'column'
  }
} as any;
