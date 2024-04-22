import * as LAYOUT from '../../../style/layout';
import * as VARIABLE from '../../../style/variable';

export default {
  display: VARIABLE.display.block,
  backgroundColor: VARIABLE.color20,
  position: VARIABLE.position.relative,
  overflow: 'hidden',

  wrap: Object.assign({}, LAYOUT.flexContainer.justify, LAYOUT.flexContainer.justifyContent, {
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center'
  }),

  bannerGroup: {
    display: VARIABLE.display.block,
    backgroundColor: VARIABLE.colorWhite,
    position: VARIABLE.position.relative,
    overflow: 'hidden',
    height: 60,

    banner: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      position: VARIABLE.position.relative
    }
  },

  notice: {
    fontSize: 13,
    lineHeight: '40px',
    transition: VARIABLE.transitionOpacity,
    cursor: 'pointer',
    color: VARIABLE.colorWhite,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textTransform: 'uppercase',
    opacity: 1,

    paddingLeft: 10,
    paddingRight: 10,
    zIndex: VARIABLE.zIndex8,
    position: VARIABLE.position.relative,
    boxShadow: `0px 0px ${VARIABLE.colorWhite}`
  },

  bgBlur: (url) => ({
    fontSize: 13,
    transition: VARIABLE.transitionOpacity,
    cursor: 'pointer',
    color: VARIABLE.colorB0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textTransform: 'uppercase',
    background: `url(${url})`,
    position: VARIABLE.position.absolute,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    filter: 'blur(20px)',
    backgroundPosition: 'center',
    transform: 'scale(1.4)',
    opacity: 0.5
  }),

  rightLink: {
    container: {
      zIndex: VARIABLE.zIndex8,
      display: VARIABLE.display.flex,
      position: VARIABLE.position.relative
    },

    link: {
      display: VARIABLE.display.flex,
      height: 40,
      fontSize: 14,
      fontWefght: VARIABLE.fontSemiBold,
      lineHeight: '40px',

      transition: VARIABLE.transitionColor,
      color: VARIABLE.colorWhite,
      cursor: 'pointer',
      marginLeft: 10,
      marginRight: 10,
      boxShadow: `0px 0px ${VARIABLE.colorWhite}`
    },

    icon: {
      width: 'auto',
      height: 40,
      color: VARIABLE.colorWhite,
      marginRight: 5
    },

    innerIcon: (icon) => {
      const switchStyle = {
        deliver: { height: 11 },
        dollar: { height: 13 },
        store: { height: 13 }
      };
      return switchStyle[icon];
    }
  },

  bgImg: (url) => ({
    width: '100%',
    height: '100%',
    backgroundImage: `url(${url})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto 50px'
  }),

  topBannerLink: {
    height: 40,
    fontSize: 14,
    fontWefght: VARIABLE.fontSemiBold,
    lineHeight: '40px',
    cursor: 'pointer',
    color: VARIABLE.colorWhite,

    maxWidth: 400,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
} as any;
