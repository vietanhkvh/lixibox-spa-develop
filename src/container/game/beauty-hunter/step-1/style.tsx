import * as VARIABLE from '../../../../style/variable';

import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';

const pattern = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/pattern.png');
const top = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/top.png');
const infoTopHeader = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/info-top-header.png');
const banner = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/banner.png');

const bgr = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/bgr.png');
const diamond = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/diamond.png');
const s1Flora = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s1-flora.png');
const s1Info = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s1-info.png');
const s1Phone = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s1-phone.png');
const s1Play = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s1-play.png');
const s1Text = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s1-text.png');

export default {
  container: {
    position: 'relative',
    background: '#FFFFFF',
    minHeight: '100vh',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column'
  },

  bg: {
    backgroundImage: `url(${pattern})`,
    backgroundPosition: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: '100px 100px',
    opacity: 0.05,
    zIndex: -1
  },

  top: {
    backgroundImage: `url(${top})`,
    backgroundPosition: 'center',
    width: '100%',
    paddingTop: '33.33%',
    backgroundSize: 'cover'
  },

  content: {
    padding: 30
  },

  banner: {
    backgroundImage: `url(${banner})`,
    backgroundPosition: 'center',
    width: '100%',
    paddingTop: '46.666%',
    backgroundSize: 'cover',
    marginBottom: 30
  },

  countdown: {
    margin: '0 auto',
    width: 130,
    height: 30,
    textAlign: 'center' as const,
    lineHeight: '30px',
    background: '#FFF',
    marginBottom: 30,
    fontSize: 24,
    fontWeight: VARIABLE.fontBold,
    color: 'orange',
    border: '1px solid orange'
  },

  button: {
    background: '#ffab00',
    color: '#FFF',
    height: 40,
    lineHeight: '38px',
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center' as const,
    fontWeight: '800',
    borderRadius: 50,
    border: `2px dotted #f24a00`,
    width: 220,
    display: 'block',
    margin: `0 auto 10px`
  },

  info: {
    flex: 1,
    position: 'relative',
    zIndex: 0,
    display: 'flex',
    flexDirection: 'column',

    bgLight: {
      backgroundImage: `url(${bgr})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      position: 'fixed',
      width: '120vh',
      height: '120vh',
      top: '42%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      marginLeft: '-60vh',
      marginTop: '-60vh'
    },

    bgGradient: {
      width: '100%',
      height: '100%',
      position: 'absolute'
    },

    bgFlora: {
      backgroundImage: `url(${s1Flora})`,
      backgroundSize: 'contain',
      width: '100%',
      paddingTop: '45%',
      position: 'relative',
      zIndex: 5,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom center'
    },

    content: {
      width: '100vw',
      flex: 1,
      position: 'relative',
      zIndex: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },

    contentInfo: {
      backgroundImage: `url(${s1Info})`,
      width: '90%',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },

    contentInfoPanel: {
      width: '100%',
      paddingTop: '90%',
      position: 'relative',
      top: 70
    },

    phone: {
      backgroundImage: `url(${s1Phone})`,
      width: 150,
      height: 150,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'absolute',
      top: '34%',
      left: '50%',
      marginLeft: -75,
      marginTop: -55
    },

    slogan: {
      backgroundImage: `url(${s1Text})`,
      width: 140,
      height: 110,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'absolute',
      top: '68%',
      left: '50%',
      marginLeft: -70,
      marginTop: -55
    },

    play: {
      backgroundImage: `url(${s1Play})`,
      width: 150,
      height: 50,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'absolute',
      bottom: 14,
      left: '50%',
      marginLeft: -75,
      marginTop: -55,
      textAlign: 'center' as const,
      color: '#FFF',
      lineHeight: '50px',
      textTransform: 'uppercase',
      fontWeight: VARIABLE.fontBold,
      letterSpacing: '1px',
      textShadow: '1px 1px 0px rgba(0,0,0,0.75), 1px 1px 1px rgba(0,0,0,0.15)'
    },

    playBack: {
      bottom: 15
    },

    playAgain: {
      width: 220,
      height: 30,
      position: 'absolute',
      bottom: 14,
      left: '50%',
      marginLeft: -110,
      marginTop: -55,
      textAlign: 'center' as const,
      backgroundColor: '#e8f4fb',
      color: 'rgb(45, 123, 160)',
      boxShadow: 'rgb(81, 196, 238) 0px 0px 0px 2px, 0 0 0 2.5px #1682ab',
      lineHeight: '30px',
      textTransform: 'uppercase',

      letterSpacing: '1px',
      borderRadius: 15
    },

    getMore: {
      boxShadow:
        'rgb(255, 129, 144) 0px 0px 0px 2px, rgb(190, 30, 48) 0px 0px 0px 3px, rgba(190, 30, 48,.5) 0 -13px 0px inset',
      backgroundColor: 'rgb(214, 51, 70)',
      color: VARIABLE.colorWhite
    },

    diamond: {
      position: 'absolute',
      backgroundImage: `url(${diamond})`,
      width: 50,
      height: 50,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      zIndex: 10
    },
    diamond1: {
      top: '14%',
      right: '13%',
      transform: 'scale(.8)'
    },
    diamond2: {
      top: '16%',
      left: '21%',
      transform: 'scale(.8) rotate(-45deg)'
    },
    diamond3: {
      top: '34%',
      right: '15%'
    },
    diamond4: {
      top: '50%',
      left: '10%',
      transform: 'scale(1.2)'
    },
    diamond5: {
      right: '10%',
      bottom: '10%',
      transform: 'scale(1.3) rotate(10deg)'
    }
  },

  gift: {
    background: '#FFF',
    height: 100,
    position: 'relative',
    zIndex: 5,

    tab: {
      position: 'absolute',
      top: -40,
      left: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 10,
      paddingRight: 10
    },

    tabItem: {
      height: 40,
      display: 'flex',
      flex: 1,
      marginLeft: 2,
      marginRight: 2,
      justifyContent: 'center',
      alignItems: 'center',
      border: `2px solid #e7c1d1`,
      borderRadius: '6px 6px 0 0',
      background: '#f1d5e1',
      position: 'relative',
      zIndex: 1,
      boxShadow: '1px 1px 0 .5px rgba(255,255,255,.5) inset'
    },

    tabActive: {
      boxShadow: 'none',
      background: '#FFFFFF',
      borderBottom: `none`
    },

    tabInfo: {
      width: 40,
      maxWidth: 40,
      color: '#3b240a',
      fontWeight: VARIABLE.fontBold,

      fontSize: 18
    },

    tabImage: {
      height: 20,
      width: 'auto'
    },

    tabLine: {
      zIndex: 0,
      background: '#e7c1d1',
      left: 0,
      bottom: 0,
      position: 'absolute',
      width: '100%',
      height: 2
    },

    list: {
      width: '100%',
      overflowX: 'scroll',
      overflowY: 'hidden'
    },
    listPanel: {
      whiteSpace: 'nowrap',
      padding: 10
    },
    listItem: {
      display: 'inline-flex',
      verticalAlign: 'top',
      width: 200,
      height: 50,
      margin: 10,
      boxShadow: '0 0 0px 2px #f1d5e1, 1px 1px 0 2px #e7c1d1',
      borderRadius: 4,
      // background: '#f7e6ed',
      background: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center'
    },
    itemCoinValue: {
      fontSize: 32,

      paddingLeft: 5,
      paddingRight: 10,
      color: 'rgb(218, 159, 182)',
      textShadow: 'rgb(255, 255, 255) 1px 1px 0px, rgb(229, 155, 183) 2px 2px 0px'
    },
    itemCoinValueText: {
      fontSize: 12,
      lineHeight: '14px',
      maxHeight: 42,
      whiteSpace: 'normal',
      paddingRight: 10,

      color: '#ca839f'
    },
    emptyGift: {
      fontSize: 18,
      color: 'rgb(218, 159, 182)',
      textShadow: 'rgb(255, 255, 255) 1px 1px 0px, rgb(228, 193, 206) 2px 2px 0px',
      whiteSpace: 'normal',
      textAlign: 'center' as const,
      lineHeight: '24px',
      paddingTop: 10,
      paddingLeft: 50,
      paddingRight: 50
    },
    lastItem: {
      marginRight: 20
    },
    listItemAvatar: {
      height: 50,
      borderRadius: 5
    },

    listItemName: {
      paddingLeft: 10,
      paddingRight: 10,
      width: 130,
      whiteSpace: 'normal',
      fontSize: 12,
      lineHeight: '14px',
      maxHeight: 42,
      overflow: 'hidden',

      color: '#ca839f'
    }
  },

  infoGame: {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: VARIABLE.colorWhite,
      zIndex: VARIABLE.zIndexMax,
      backgroundImage: `url(${bgr})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      transition: VARIABLE.transitionNormal,
      transform: 'translateY(100%)',
      visibility: 'hidden',

      show: {
        transform: 'translateY(0)',
        visibility: 'visible'
      }
    },

    bgGradient: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: VARIABLE.zIndex1,
      opacity: 0.5
    },

    content: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: VARIABLE.zIndex5,
      padding: '120px 30px 40px 30px'
    },

    panel: {
      background: VARIABLE.colorWhite,
      width: '100%',
      height: '100%',
      borderRadius: 30,
      boxShadow:
        'rgb(95, 154, 191) 0px 0px 0px 1px, rgb(119, 187, 229) 0px 0px 0px 5px, rgb(95, 154, 191) 0px 0px 0px 6px, rgba(119, 187, 229, 0.5) 0px 0px 100px inset',
      padding: '70px 10px 35px 10px',
      overflow: 'hidden'
    },

    headerPanel: {
      width: 260,
      height: 160,
      backgroundImage: `url(${infoTopHeader})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'absolute',
      top: 20,
      left: '50%',
      marginLeft: -130
    },

    infoContent: {
      width: '100%',
      height: '100%',
      overflow: 'scroll',
      padding: '0 10px'
    },

    title: {
      width: '100%',
      textAlign: 'center' as const,
      fontSize: 16,

      textTransform: 'uppercase',
      color: '#5f9abe',
      marginBottom: 10
    },

    text: {
      textAlign: 'justify' as const,
      marginBottom: 7
    }
  },

  coinRedeem: {
    status: {
      color: 'rgb(95, 154, 190)',
      textAlign: 'center' as const,
      padding: 5,
      width: '100%',
      margin: '20px auto',
      borderRadius: 10
    },

    count: {
      fontSize: 25
    },

    redeemAction: {
      width: 200,
      height: 40,
      lineHeight: '40px',
      textAlign: 'center' as const,
      color: '#5f9abe',
      borderRadius: 4,
      textTransform: 'uppercase',

      fontSize: 15,
      boxShadow:
        'rgb(95, 154, 191) 0px 0px 0px 1px, rgb(119, 187, 229) 0px 0px 0px 4px, rgb(95, 154, 191) 0px 0px 0px 4px, rgba(119, 187, 229, 0.5) 0px 0px 100px inset',
      margin: '0 auto'
    },

    noCoin: {
      width: 200,
      height: 40,
      lineHeight: '40px',
      textAlign: 'center' as const,
      color: 'rgb(255, 111, 127)',
      borderRadius: 4,
      textTransform: 'uppercase',

      fontSize: 15,
      boxShadow:
        'rgb(255, 111, 127) 0px 0px 0px 1px, rgb(231, 52, 66) 0px 0px 0px 2px, rgb(255, 99, 117) 0px 0px 0px 3px, rgba(255, 224, 228, .5) 0px 0px 100px inset',
      margin: '0 auto'
    },

    outOfTimes: {
      width: 240,
      padding: '10px 20px',
      lineHeight: '20px',
      textAlign: 'center' as const,
      color: 'rgb(255, 111, 127)',
      borderRadius: 4,
      textTransform: 'uppercase',

      fontSize: 15,
      boxShadow:
        'rgb(255, 111, 127) 0px 0px 0px 1px, rgb(231, 52, 66) 0px 0px 0px 2px, rgb(255, 99, 117) 0px 0px 0px 3px, rgba(255, 224, 228, 0.5) 0px 0px 100px inset',
      margin: '0 auto'
    }
  }
} as any;
