import * as VARIABLE from '../../../style/variable';

import { CDN_ASSETS_PREFIX } from '../../../utils/uri';

const bannerImg = CDN_ASSETS_PREFIX('/spa-assets/mobile/top-banner.jpg');
const leftImg = CDN_ASSETS_PREFIX('/spa-assets/mobile/left.jpg');
const rightImg = CDN_ASSETS_PREFIX('/spa-assets/mobile/right.jpg');
const bottomImg = CDN_ASSETS_PREFIX('/spa-assets/mobile/bottom.jpg');
const quoteImg = CDN_ASSETS_PREFIX('/spa-assets/mobile/quote.png');

export default {
  container: {},

  wrap: {
    position: VARIABLE.position.relative,
    background: VARIABLE.colorWhite
  },

  header: {
    backgroundImage: `url(${bannerImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top left',
    padding: 20,

    logo: {
      display: VARIABLE.display.flex,
      marginBottom: 30,
      filter: `drop-shadow(0px 2px 5px #fff)`,

      icon: {
        width: 40,
        height: 40,
        color: VARIABLE.colorPink,
        marginRight: 10
      },
      iconInner: {
        height: 36
      },
      line: {
        width: 'auto',
        height: 40,
        color: VARIABLE.colorPink
      },
      lineInner: {
        height: 20
      }
    },

    content: {
      title: {
        fontSize: 40,

        fontWeight: VARIABLE.fontSemiBold,
        lineHeight: '40px',
        textShadow: '0 2px 10px #fff',
        color: VARIABLE.colorBlack,
        maxWidth: '70%',
        marginBottom: 20
      },

      description: {
        fontSize: 16,
        textTransform: 'uppercase',

        textShadow: '0 2px 10px #fff',
        maxWidth: '90%',
        marginBottom: 20
      },

      link: {
        display: VARIABLE.display.flex,

        item: {
          display: VARIABLE.display.block,
          marginBottom: 10,
          marginRight: 10,

          image: {
            display: VARIABLE.display.block,
            height: 44,
            minWidth: 120,
            border: `0px solid #FFF`,
            background: VARIABLE.colorBlack,
            paddingLeft: 5,
            paddingTop: 3,
            paddingBottom: 3,
            borderRadius: 5
          }
        }
      }
    }
  },

  content: {
    padding: '25px 20px',

    left: {},
    right: {},

    phone: {
      display: 'none',
      position: VARIABLE.position.absolute,
      width: '24%',
      height: 'auto',
      left: '50%',
      transform: 'translate(-50%, -110px)'
    },

    textBlock: {
      marginBottom: 25,

      header: {
        fontWeight: VARIABLE.fontRegular,
        fontSize: 24,
        marginBottom: 10
      },

      description: {
        fontSize: 16,
        lineHeight: '22px'
      }
    },

    quoteBlock: {
      backgroundImage: `url(${quoteImg})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left 5px',
      backgroundSize: '34px 23px',
      fontSize: 20,
      lineHeight: '30px',

      fontWeight: VARIABLE.fontRegular,
      fontStyle: 'italic',
      paddingLeft: 42
    }
  },

  bg: {
    left: {
      backgroundImage: `url(${leftImg})`,
      width: 130,
      height: '100%',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top right',
      position: VARIABLE.position.absolute,
      left: -110,
      top: 0
    },

    right: {
      backgroundImage: `url(${rightImg})`,
      width: 130,
      height: '100%',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top right',
      position: VARIABLE.position.absolute,
      right: -110,
      top: 0
    },

    bottom: {
      backgroundImage: `url(${bottomImg})`,
      width: '100%',
      height: 80,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center left'
    }
  }
} as any;
