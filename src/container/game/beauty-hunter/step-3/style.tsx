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
const s2Time = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-time.png');
const s3Info = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s3-info.png');
const s3Share1 = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s3-share-1.png');
const s3Share2 = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s3-share-2.png');
const s3Share3 = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s3-share-3.png');
const s2p1 = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-p-1.png');
const s2p2 = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-p-2.png');
const s2p3 = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-p-3.png');
const s2p4 = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s2-p-4.png');
const s3Text = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s3-text.png');

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
      backgroundImage: `url(${s3Info})`,
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
      backgroundImage: `url(${s3Text})`,
      width: 280,
      height: 56,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'absolute',
      top: '32%',
      left: '50%',
      marginLeft: -140,
      marginTop: -65
    },

    reward: {
      position: 'absolute',
      top: '32%',
      left: '50%',
      width: 280,
      height: 250,
      marginLeft: -140,
      marginTop: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },

    rewardCoin: {
      fontSize: 32,
      color: '#ff95aa',
      textShadow: '1px 1px 0 #FFF, 2px 2px 0 #ff9eb0',
      border: '3px double rgb(255, 149, 170)',
      borderRadius: 10,
      paddingLeft: 15,
      paddingRight: 15,
      marginBottom: 20
    },

    rewardCoinText: {
      paddingLeft: 15,
      paddingRight: 15,
      textAlign: 'center' as const,
      fontSize: 18,
      lineHeight: '24px',
      color: '#ff95aa',
      textShadow: '1px 1px 0 #FFF, 2px 2px 0 #ecd2d7'
    },

    rewardAvatar: {
      maxWidth: '40%',
      marginBottom: 10
    },

    rewardName: {
      maxWidth: '80%',

      color: '#ff95aa',
      paddingLeft: 15,
      paddingRight: 15,
      textShadow: '1px 1px 0 #FFF, 2px 2px 0 #ecd2d7',
      fontSize: 18,
      textAlign: 'center' as const
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

    play: {
      backgroundImage: `url(${s1Play})`,
      width: 150,
      height: 50,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'absolute',
      bottom: -6,
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
    playAgain: {
      width: 200,
      height: 24,
      position: 'absolute',
      bottom: -46,
      left: '50%',
      marginLeft: -100,
      marginTop: -55,
      textAlign: 'center' as const,
      lineHeight: '22px',
      fontWeight: VARIABLE.fontBold,
      letterSpacing: '1px',
      backgroundColor: '#e8f4fb',
      color: 'rgb(45, 123, 160)',
      boxShadow: 'rgb(81, 196, 238) 0px 0px 0px 2px, 0 0 0 2.5px #1682ab',
      fontSize: 12,
      borderRadius: 12
    },
    social: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'absolute',
      right: 0,
      width: '84%',
      bottom: 32
    },
    socialItem: {
      width: 50,
      height: 50,
      margin: 5,
      backgroundSize: 'contain'
    },
    socialItemFb: {
      backgroundImage: `url(${s3Share1})`
    },
    socialItemTw: {
      backgroundImage: `url(${s3Share2})`
    },
    socialItemGp: {
      backgroundImage: `url(${s3Share3})`
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
      top: '19%',
      left: '21%',
      transform: 'scale(.8) rotate(-45deg)'
    },
    diamond3: {
      bottom: '10%',
      right: '47%',
      transform: 'scale(1.5) rotate(-45deg)'
    },
    diamond4: {
      top: '37%',
      left: '1%',
      transform: 'scale(1.2)'
    },
    diamond5: {
      left: '15%',
      bottom: '32%',
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
