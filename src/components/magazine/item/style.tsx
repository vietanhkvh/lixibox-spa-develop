import * as VARIABLE from '../../../style/variable';
import { isMobileVersion, combineStyle } from '../../../utils/responsive';

export default {
  infoContainer: {
    display: VARIABLE.display.flex,
    flexDirection: 'column',

    title: combineStyle({
      MOBILE: [
        {
          paddingLeft: 10,
          paddingRight: 10,
          fontSize: 14
        }
      ] as any,

      DESKTOP: [
        {
          paddingLeft: 0,
          paddingRight: 0,
          fontSize: 15
        }
      ] as any,

      GENERAL: [
        {
          lineHeight: '22px',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
          color: VARIABLE.colorBlack08,

          width: '100%',
          fontWeight: 900,
          marginBottom: 10,
          textTransform: 'capitalize',
          textAlign: 'justify' as const,
          maxHeight: 66
        }
      ] as any
    }),

    description: combineStyle({
      MOBILE: [{ fontSize: 12 }] as any,
      DESKTOP: [{ fontSize: 14 }] as any,

      GENERAL: [
        {
          lineHeight: '22px',
          maxHeight: 66,
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
          overflow: 'hidden',
          color: VARIABLE.colorBlack08,
          textAlign: 'justify' as const,
          width: '100%',
          marginBottom: 10
        }
      ] as any
    })
  },

  itemContainer: {
    width: '100%',
    display: VARIABLE.display.flex,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 20,

    itemWrap: {
      container: combineStyle({
        MOBILE: [{ marginBottom: 10 }] as any,
        DESKTOP: [{ marginBottom: 20 }] as any,
        GENERAL: [{ width: 'calc(50% - 10px)', display: VARIABLE.display.block }] as any
      }),

      itemImage: {
        width: '100%',
        paddingTop: '65%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        marginBottom: 10,
        posicontion: VARIABLE.position.relative,
        transition: VARIABLE.transitionNormal
      }
    }
  },

  mobile: {
    itemSlider: combineStyle({
      MOBILE: [{}] as any,

      DESKTOP: [{ marginBottom: 30 }] as any,

      GENERAL: [
        {
          width: '100%',
          display: VARIABLE.display.inlineBlock,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          position: VARIABLE.position.relative
        }
      ] as any
    }),

    itemSliderMini: {
      display: 'flex'
    },

    largeItemSlider: combineStyle({
      MOBILE: [{}] as any,

      DESKTOP: [{}] as any,

      GENERAL: [{}] as any
    }),

    mediumItemSlider: combineStyle({
      MOBILE: [{ margin: 5, width: 'calc(50% - 15px)' }] as any,

      DESKTOP: [{ width: 'calc(50% - 15px)', marginBottom: 40 }] as any,

      GENERAL: [
        {
          display: VARIABLE.display.inlineBlock,
          backgroundColor: VARIABLE.colorWhite,
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
          position: VARIABLE.position.relative
        }
      ] as any
    }),

    smallItemSlider: combineStyle({
      MOBILE: [{ margin: 5, width: 'calc(33% - 15px)' }] as any,

      DESKTOP: [{ width: 'calc(33% - 15px)', marginBottom: 40 }] as any,

      GENERAL: [
        {
          display: VARIABLE.display.inlineBlock,
          backgroundColor: VARIABLE.colorWhite,
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
          position: VARIABLE.position.relative
        }
      ] as any
    }),

    itemSliderPanel: {
      wdith: '100%',
      paddingTop: '52.5%',
      position: VARIABLE.position.relative
    },

    smallItemSliderPanelOuter: {
      width: '100%',
      marginBottom: 6,
      mini: {
        width: 120,
        minWidth: 120,
        maxWidth: 120,
        marginBottom: 16
      }
    },

    smallItemSliderPanel: {
      wdith: '100%',
      paddingTop: '62.5%',
      borderRadius: 8,
      position: VARIABLE.position.relative,
      backgroundPosition: 'top center',
      backgroundSize: 'cover',
      overflow: 'hidden'
    },

    smallItemSliderPanelImg: {
      borderRadius: 8,
      objectFit: 'cover',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0
    },

    smallItemSliderPanelMobile: {
      width: '100%'
    },

    gradientSmallItemSliderPanel: {
      padding: 10,
      position: VARIABLE.position.absolute,
      bottom: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: VARIABLE.display.flex,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-start'
    },

    info: {
      width: '100%',
      padding: !isMobileVersion() ? 40 : 12,
      position: VARIABLE.position.absolute,
      bottom: 0,
      left: 0,
      background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgb(0,0,0,.6) 100%)',
      filter: `progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 )`,
      height: '100%',
      display: VARIABLE.display.flex,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',

      category: {
        background: VARIABLE.colorWhite,
        display: VARIABLE.display.block,
        height: 22,
        lineHeight: '24px',
        padding: '0 6px',
        float: 'left',
        color: VARIABLE.colorBlack,
        fontSize: 12,
        marginBottom: 5
      },
      title: {
        color: VARIABLE.colorWhite,
        whiteSpace: 'pre-wrap',
        fontSize: !isMobileVersion() ? 36 : 20,
        fontWeight: VARIABLE.fontBold,
        lineHeight: !isMobileVersion() ? '50px' : '26px',
        maxHeight: !isMobileVersion() ? '150px' : '78px',
        maxWidth: !isMobileVersion() ? '80%' : '100%',
        textShadow: VARIABLE.shadowTextBlur,
        overflow: 'hidden'
      },

      tagItem: {
        background: VARIABLE.colorWhite07,
        color: VARIABLE.colorBlack,
        height: 24,
        lineHeight: '25px',
        padding: '0 10px',
        marginRight: 10,
        borderRadius: 3,

        fontSize: 12,
        textTransform: 'uppercase'
      },

      tagList: {
        display: 'flex',
        marginBottom: 10
      }
    },

    smallInfo: {
      width: '100%',
      padding: '10px 0 10px',
      position: VARIABLE.position.relative,
      background: VARIABLE.colorWhite,
      display: VARIABLE.display.flex,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',

      mini: { paddingTop: 0, paddingLeft: 12, paddingBottom: 0 },

      title: {
        color: VARIABLE.color20,
        whiteSpace: 'pre-wrap',

        fontSize: 16,
        lineHeight: '22px',
        maxHeight: '44px',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        overflow: 'hidden',
        marginBottom: 10,
        fontWeight: VARIABLE.fontSemiBold,

        mini: { fontSize: 14, lineHeight: '20px' }
      },

      category: {
        fontSize: 14,
        lineHeight: '22px',
        marginBottom: 5,
        color: VARIABLE.colorBlack,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        icon: {
          width: 22,
          height: 22,
          color: VARIABLE.colorBlack,
          position: 'relative',
          top: -1
        },

        innerIcon: {
          width: 9
        }
      },

      description: {
        fontSize: 14,
        color: VARIABLE.colorBlack,

        opacity: 0.7,
        marginRight: 10,
        whiteSpace: 'pre-wrap',
        lineHeight: '22px',
        maxHeight: 44,
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        overflow: 'hidden'
      }
    }
  },

  extraInfo: {
    container: {
      display: VARIABLE.display.flex
    },

    group: {
      paddingLeft: 0,
      paddingRight: 0,
      maxWidth: 800,
      display: VARIABLE.display.flex,
      flexWrap: 'wrap',
      justifyContent: 'center',
      margin: 0
    },

    icon: {
      width: 30,
      height: 30,
      color: VARIABLE.colorWhite08
    },

    innerIcon: {
      width: 16,
      height: 16
    },

    text: {
      height: 30,
      lineHeight: '32px',

      display: VARIABLE.display.block,
      fontSize: 15,
      color: VARIABLE.colorWhite08,
      marginRight: 20,
      maxWidth: 150,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }
} as any;
