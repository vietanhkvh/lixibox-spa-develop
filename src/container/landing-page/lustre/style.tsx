import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  bannerImage: {
    width: '100%'
  },

  hotDeal: {
    paddingTop: 10,
    marginBottom: 20
  },

  sliderImage: {
    container: combineStyle({
      MOBILE: [
        {
          width: '100%',
          maxWidth: 940,
          paddingLeft: 10,
          display: VARIABLE.display.block,
          marginBottom: 30
        }
      ] as any,

      DESKTOP: [
        {
          width: '100%',
          display: VARIABLE.display.flex,
          justifyContent: 'space-between',
          marginBottom: 20
        }
      ] as any,

      GENERAL: [{ whiteSpace: 'nowrap' }] as any
    }),

    image: combineStyle({
      MOBILE: [
        {
          display: VARIABLE.display.inlineBlock,
          verticalAlign: 'top',
          maxWidth: 'calc(50% - 5px)',
          width: 'calc(50% - 5px)',
          marginRight: 10,
          paddingRight: 10,
          boxShadow: VARIABLE.shadowBlur
        }
      ] as any,

      DESKTOP: [
        {
          display: VARIABLE.display.block,
          maxWidth: 'calc(50% - 10px)',
          width: 'calc(50% - 10px)',
          marginRight: 0,
          paddingRight: 0
        }
      ] as any,

      GENERAL: [
        {
          whiteSpace: 'nowrap',
          flex: 1,
          cursor: 'pointer',
          borderRadius: 5,
          paddingTop: '21%',
          transition: VARIABLE.transitionNormal,
          overflow: 'hidden',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }
      ] as any
    })
  },

  productContent: {
    container: combineStyle({
      MOBILE: [
        {
          marginBottom: 30
        }
      ] as any,

      DESKTOP: [
        {
          paddingLeft: 40,
          paddingRight: 40,
          paddingTop: 20,
          marginBottom: 40
        }
      ] as any,

      GENERAL: [
        {
          display: VARIABLE.display.flex,
          justifyContent: 'space-between'
        }
      ] as any
    }),

    leftContainer: {
      container: combineStyle({
        MOBILE: [
          {
            display: VARIABLE.display.none
          }
        ] as any,
        DESKTOP: [{}] as any,
        GENERAL: [
          {
            flex: 1,
            marginRight: 20
          }
        ] as any
      }),

      image: (url) => ({
        width: '100%',
        height: '100%',
        paddingTop: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${url})`,
        borderRadius: 10
      })
    },

    rightContainer: {
      flex: 2,
      display: VARIABLE.display.flex,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
    },

    title: {
      backgroundColor: VARIABLE.colorBlack,
      display: VARIABLE.display.flex,
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 300,
      maxWidth: 300,
      paddingTop: 5,
      paddingRight: 10,
      paddingBottom: 5,
      paddingLeft: 10,
      borderRadius: 5,
      marginBottom: 20,

      leftIcon: {
        borderTop: `10px solid ${VARIABLE.colorTransparent}`,
        borderRight: `15px solid ${VARIABLE.colorWhite}`,
        borderBottom: `10px solid ${VARIABLE.colorTransparent}`,
        borderLeft: `10px solid ${VARIABLE.colorTransparent}`,
        cursor: 'pointer'
      },

      name: {
        fontSize: 25,
        textTransform: 'upper-case',
        color: VARIABLE.colorWhite
      },

      rightIcon: {
        borderTop: `10px solid ${VARIABLE.colorTransparent}`,
        borderLeft: `15px solid ${VARIABLE.colorWhite}`,
        borderBottom: `10px solid ${VARIABLE.colorTransparent}`,
        borderRight: `10px solid ${VARIABLE.colorTransparent}`,
        cursor: 'pointer'
      }
    },

    productWrap: {
      container: combineStyle({
        MOBILE: [
          {
            paddingLeft: 10,
            paddingRight: 10
          }
        ] as any,

        DESKTOP: [{}] as any,

        GENERAL: [
          {
            display: VARIABLE.display.flex,
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginBottom: -20
          }
        ] as any
      }),

      product: combineStyle({
        MOBILE: [
          {
            width: 'calc(50% - 5px)',
            marginBottom: 10
          }
        ] as any,
        DESKTOP: [
          {
            width: 'calc(33.33% - 13px)',
            marginBottom: 20
          }
        ] as any,
        GENERAL: [
          {
            borderRadius: 5,
            // paddingLeft: 10,
            // paddingRight: 10,
            boxShadow: VARIABLE.shadowBlur
          }
        ] as any
      })
    }
  },

  content: {
    display: VARIABLE.display.flex,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,

    title: {
      fontSize: 25,

      marginBottom: 20
    },

    desc: combineStyle({
      MOBILE: [{}] as any,

      DESKTOP: [
        {
          width: 600
        }
      ] as any,

      GENERAL: [
        {
          fontSize: 18,
          textAlign: 'center' as const
        }
      ] as any
    })
  },

  instagram: {
    container: combineStyle({
      MOBILE: [
        {
          paddingTop: 20,
          paddingBottom: 20
        }
      ] as any,

      DESKTOP: [
        {
          paddingTop: 40,
          paddingBottom: 60
        }
      ] as any,

      GENERAL: [{}] as any
    }),

    heading: {
      marginBottom: 30,

      title: {
        fontSize: 32,
        textAlign: 'center' as const,
        textTransform: 'uppercase',

        opacity: 0.8,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
      },

      boldTitle: {
        fontSize: 32,
        paddingLeft: 5
      },

      icon: {
        display: VARIABLE.display.block,
        margin: '0 auto'
      }
    },

    list: {
      container: combineStyle({
        MOBILE: [
          {
            flexWrap: 'wrap',
            paddingLeft: 5,
            paddingRight: 5
          }
        ] as any,

        DESKTOP: [{}] as any,

        GENERAL: [{ display: VARIABLE.display.flex }] as any
      }),

      link: combineStyle({
        MOBILE: [{ width: '50%', padding: 5 }] as any,

        DESKTOP: [{ flex: 1, padding: 15 }] as any,

        GENERAL: [
          {
            cursor: 'pointer',
            display: VARIABLE.display.block
          }
        ] as any
      }),

      img: {
        borderRadius: 10,
        paddingTop: '100%',
        width: '100%',
        display: VARIABLE.display.block,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    }
  }
} as any;
