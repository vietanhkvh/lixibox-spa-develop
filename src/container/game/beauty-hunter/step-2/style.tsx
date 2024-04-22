import * as VARIABLE from '../../../../style/variable';

import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';

const pattern = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/pattern.png');
const top = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/top.png');
const banner = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/banner.png');

const bgr2 = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/bgr-2.png');
const diamond = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/diamond.png');
const s1Phone = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s1-phone.png');
const s1Play = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s1-play.png');
const s2Flora = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-flora.png');
const s2Info = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-info.png');
const s2Text = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-text.png');
const s2Text2 = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-text-2.png');
const s2Time = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-time.png');
const s2p1 = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-p-1.png');
const s2p2 = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-p-2.png');
const s2p3 = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-p-3.png');
const s2p4 = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-p-4.png');
const s2p5 = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-p-5.png');

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
      backgroundImage: `url(${bgr2})`,
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
      backgroundImage: `url(${s2Flora})`,
      backgroundSize: 'contain',
      width: '100%',
      paddingTop: '44%',
      position: 'relative',
      zIndex: 5,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom center'
    },

    countdown: {
      backgroundImage: `url(${s2Time})`,
      backgroundSize: 'contain',
      width: 200,
      height: 70,
      position: 'absolute',
      zIndex: 10,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom center',
      top: 0,
      left: '50%',
      marginLeft: -100,
      textAlign: 'center' as const,
      color: '#FFF',
      lineHeight: '80px',
      fontSize: '29px',
      fontWeight: '800',
      textShadow: '1px 1px 0px rgba(0,0,0,.25), 1px 1px 2px rgba(0,0,0,.25)'
    },

    content: {
      width: '100vw',
      flex: 1,
      position: 'relative',
      zIndex: 10,
      display: 'flex',
      justifyContent: 'center',
      alignitems: 'center'
    },

    contentInfo: {
      backgroundImage: `url(${s2Info})`,
      width: '100%',
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
      width: 110,
      height: 110,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'absolute',
      top: '34%',
      left: '50%',
      marginLeft: -55,
      marginTop: -55
    },

    slogan: {
      backgroundImage: `url(${s2Text})`,
      width: 200,
      height: 110,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'absolute',
      top: '89%',
      left: '50%',
      marginLeft: -100,
      marginTop: -55
    },

    emptySlogan: {
      backgroundImage: `url(${s2Text2})`,
      width: 200,
      height: 110,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'absolute',
      top: '95%',
      left: '50%',
      marginLeft: -100,
      marginTop: -55
    },

    pig: {
      width: 300,
      height: 300,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },

    pig1: {
      backgroundImage: `url(${s2p1})`
    },

    pig2: {
      backgroundImage: `url(${s2p2})`
    },

    pig3: {
      backgroundImage: `url(${s2p3})`
    },

    pig4: {
      backgroundImage: `url(${s2p4})`
    },

    pig5: {
      backgroundImage: `url(${s2p5})`
    },

    playOverlay: {
      position: 'fixed',
      background: 'rgba(0,0,0,.9)',
      width: '100%',
      height: '100%',
      zIndex: VARIABLE.zIndexMax,
      top: 0,
      left: 0
    },

    play: {
      backgroundImage: `url(${s1Play})`,
      width: 150,
      height: 50,
      fontSize: 32,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'absolute',
      bottom: '50%',
      left: '50%',
      zIndex: VARIABLE.zIndexMax,
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

    playAgain: {
      backgroundImage: `url(${s1Play})`,
      width: 150,
      height: 50,
      fontSize: 15,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'absolute',
      bottom: '-24%',
      left: '50%',
      zIndex: VARIABLE.zIndexMax,
      marginLeft: -75,
      marginTop: -55,
      textAlign: 'center' as const,
      color: '#FFF',
      lineHeight: '50px',
      textTransform: 'uppercase',
      fontWeight: 'bolder',
      letterSpacing: '1px',
      textShadow: '1px 1px 0px rgba(0,0,0,0.75), 1px 1px 1px rgba(0,0,0,0.15)'
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
      left: '14%',
      transform: 'scale(.8) rotate(-45deg)'
    },
    diamond3: {
      bottom: '10%',
      right: '61%',
      transform: 'scale(1) rotate(-45deg)'
    },
    diamond4: {
      top: '50%',
      left: '10%',
      transform: 'scale(1.2)'
    },
    diamond5: {
      right: '10%',
      bottom: '24%',
      transform: 'scale(1.3) rotate(10deg)'
    }
  },

  gift: {
    background: '#FFF',
    height: 90,
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
      display: 'inline-block',
      width: 50,
      height: 50,
      margin: 10,
      boxShadow: '1px 1px 0 .5px inset #ffffff, 0 0 0px 2px #f1d5e1, 1px 1px 0 2px #e7c1d1',
      borderRadius: 4,
      background: '#f7e6ed'
    },
    lastItem: {
      marginRight: 20
    }
  }
} as any;
