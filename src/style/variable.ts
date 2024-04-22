/** COLOR LIST */
export const colorPrimary = '#fe2c6d';

export const colorTransparent = 'rgba(0,0,0,0)';

export const colorBlack = '#000204';
export const colorBlack005 = 'rgba(0, 2, 4, .05)';
export const colorBlack01 = 'rgba(0, 2, 4, .1)';
export const colorBlack02 = 'rgba(0, 2, 4, .2)';
export const colorBlack03 = 'rgba(0, 2, 4, .3)';
export const colorBlack04 = 'rgba(0, 2, 4, .4)';
export const colorBlack05 = 'rgba(0, 2, 4, .5)';
export const colorBlack06 = 'rgba(0, 2, 4, .6)';
export const colorBlack07 = 'rgba(0, 2, 4, .7)';
export const colorBlack08 = 'rgba(0, 2, 4, .8)';
export const colorBlack09 = 'rgba(0, 2, 4, .9)';
export const colorBlack095 = 'rgba(0, 2, 4, .95)';

export const randomColorList = (index) => {
  let colorIndex = index;

  if (-1 === index) {
    colorIndex = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
  }

  const colorList = ['#fa5d71', '#fde484', '#3dcdd0', '#DD94C1', '#574992', '#3983aa', '#f5807f', '#00999f', '#ff4e84'];

  return colorList[colorIndex];
};

export const colorWhite = '#FFF';
export const colorWhite005 = 'rgba(255, 255, 255, .05)';
export const colorWhite01 = 'rgba(255, 255, 255, .1)';
export const colorWhite15 = 'rgba(255, 255, 255, .15)';
export const colorWhite02 = 'rgba(255, 255, 255, .2)';
export const colorWhite03 = 'rgba(255, 255, 255, .3)';
export const colorWhite04 = 'rgba(255, 255, 255, .4)';
export const colorWhite05 = 'rgba(255, 255, 255, .5)';
export const colorWhite06 = 'rgba(255, 255, 255, .6)';
export const colorWhite07 = 'rgba(255, 255, 255, .7)';
export const colorWhite08 = 'rgba(255, 255, 255, .8)';
export const colorWhite09 = 'rgba(255, 255, 255, .9)';
export const colorWhite095 = 'rgba(255, 255, 255, .95)';

// export const colorPink = '#FF2B70';
export const colorPink = '#fe2c6d';
export const colorPink01 = 'rgba(255, 43, 112, .1)';
export const colorPink02 = 'rgba(255, 43, 112, .2)';
export const colorPink03 = 'rgba(255, 43, 112, .3)';
export const colorPink04 = 'rgba(255, 43, 112, .4)';
export const colorPink05 = 'rgba(255, 43, 112, .5)';
export const colorPink06 = 'rgba(255, 43, 112, .6)';
export const colorPink07 = 'rgba(255, 43, 112, .7)';
export const colorPink08 = 'rgba(255, 43, 112, .8)';
export const colorPink09 = 'rgba(255, 43, 112, .9)';

export const colorBlueLight = '#00B0FF';
export const colorGreen = '#2ba832';
export const colorGreenDark = '#2ba845';

export const colorRed = '#fe2c6d';

export const colorpinkHightLight = '#FFE0E9';
export const colorPinkLighter = '#FE4A81';
export const colorPinkDarker = '#C71762';
export const colorPinkdb = '#db046c';

export const colorYellowDarker = '#93712d';
export const colorYellowLighter = '#f8d38b';
export const colorYellowLightest = '#fff2da';
export const colorYellow = '#F7AB30';

export const colorGold = '#EBC920';
export const colorAmber = '#B0834A';
export const colorDiamond = '#3291B5';

export const loyalyColor0 = '#DFE2F3';
export const loyalyColor1 = '#6D6D6D';
export const loyalyColor2 = '#CCA500';
export const loyalyColor3 = '#1B597B';

export const color20 = '#202020';
export const color2E = '#2E3E4E';
export const color3E = '#3e4048';
export const color4D = '#4D4E4F';
export const color75 = '#757779';
export const color8A = '#8a8d90';
export const color8E = '#8e9dab';
export const color97 = '#97999A';
export const colorA2 = '#A2A3A5';
export const colorB0 = '#B0B2B4';
export const colorBA = '#8A8D90';
export const colorCC = '#CCCCCC';
export const colorC6 = '#C6CED5';
export const colorD2 = '#DDDFE2';
export const colorE1 = '#E1E4E8';
export const colorE4 = '#e4e4ea';
export const colorE5 = '#E9EBEE';
export const colorE9 = '#e9ebee';
export const colorF0 = '#F0F2F5';
export const colorF0F0 = '#F0F0F0';
export const colorF4 = '#f4f5f6';
export const colorF5 = '#f5f6f6';
export const colorF7 = '#F7F9FA';
export const colorFA = '#FAFCFD';

export const colorSocial = {
  facebook: '#1877FE',
  facebookLighter: '#1877FE',
  instagram: '#8a3ab9',
  youtube: '#FF0202',
  pinterest: '#BD081C',
  momo: '#B0006E',
  onepay: '#288FD2'
};

export const colorBlue = '#1887DB';
export const colorSecondaryBlue = '#00b0dd';
export const colorGoldenFE = '#fed37f';

/** BOX SHADOW */
export const shadowInsetBottom = '0 -2px 2px rgba(0,0,0,0.25) inset';
export const shadowInsetTop = '0 1px 2px rgba(0,0,0,0.25) inset';
export const shadowInsetMiddle = '0 0 2px rgba(0,0,0,0.25) inset';
export const shadowText = '0px 2px 2px rgba(0, 0, 0, 0.9)';
export const shadowTextBlur = '0 1px 2px rgba(0,0,0,.2), 0 1px 10px rgba(0,0,0,.2), 0 1px 20px rgba(0,0,0,.3)';
export const shadowTextSort = '0px 1px 1px rgba(0, 0, 0, 0.25)';
export const shadowReverse = '0 -5px 7px rgba(0,0,0,0.1)';
export const shadowReverseSort =
  '0 -1px 3px 0 rgba(0,0,0,.12), 0 0px 1px 0 rgba(0,0,0,.14), 0 -2px 1px -1px rgba(0,0,0,.12)';
export const shadowReverse2 = '0 -5px 8px rgba(0,0,0,0.25)';
export const shadow1 = '0 5px 7px rgba(0,0,0,0.1)';
export const shadow2 = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.124)';
export const shadow3 = '0 2px 6px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.15)';
export const shadow4 = '0 3px 8px rgba(0,0,0,0.15), 0 6px 6px rgba(0,0,0,0.2)';
export const shadow5 = '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)';
export const shadow6 = '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)';

export const shadowBlur = '0 0 0 1px rgba(0,0,0,0.025), 1px 1px 1px 1px rgba(0,0,0,.03)';
export const shadowBlurSort = '0 0 0 1px rgba(0,0,0,0.025), 1px 1px 1px 1px rgba(0,0,0,.03)';

export const shadowDropdown = '0px -1px 10px rgba(0,0,0,.124)';

export const shadowBorderGray = '0 0 0 2px #FFF, 0 0 0 5px #DDD';
export const shadowBorderBlack = '0 0 0 2px #FFF, 0 0 0 5px #000';

export const shadowPopUp = '0 2px 20px rgba(0, 0, 0, 0.2)';
export const shadowBottom = '0px 4px 4px rgba(0, 0, 0, 0.03), 0px 4px 1px rgba(0, 0, 0, 0.02)';
export const shadow = Object.freeze({
  /**
   * USED_IN:
   * - Brand filter selected
   */
  selection1: '0 3px 8px rgba(0,0,0,0.15), 0 6px 6px rgba(0,0,0,0.5)'
});

/** BREAK POINT */

export const breakPoint1920 = 1920;
export const breakPoint1600 = 1600;
export const breakPoint1440 = 1440;
export const breakPoint1366 = 1366;
export const breakPoint1280 = 1280;
export const breakPoint1170 = 1170;
export const breakPoint1024 = 1024;
export const breakPoint960 = 960;
export const breakPoint959 = 959;
export const breakPoint768 = 768;
export const breakPoint610 = 610;
export const breakPoint480 = 480;
export const breakPoint320 = 320;

export const DEVICE_VERSION = {
  DESKTOP: 'DESKTOP',
  MOBILE: 'MOBILE',
  GENERAL: 'GENERAL'
};

/** Z INDEX LAYER */

export const zIndexNegative = -1;
export const zIndex1 = 10;
export const zIndex2 = 20;
export const zIndex3 = 30;
export const zIndex4 = 40;
export const zIndex5 = 50;
export const zIndex6 = 60;
export const zIndex7 = 70;
export const zIndex8 = 80;
export const zIndex9 = 90;

export const zIndexMin = 0;
export const zIndexMax = 100;

/** TRANSITION */

export const transitionOpacity = '0.3s opacity ease-out 0s';
export const transitionTransform = '0.3s transform ease-out 0s';
export const transitionOpacityTransform = '0.3s opacity ease-out 0s, 0.3s transform ease-out 0s';

export const transitionNormal = '0.3s all ease-out 0s';
export const transitionNormalFast = '0.3s all ease-out 0s';
export const transitionHeight = '0.3s height ease-out 0s';
export const transitionWidth = '0.3s width ease-out 0s';
export const transitionOpacityTop = '0.3s opacity ease-out 0s, 0.3s top ease-out 0s';
export const transitionBackground = '0.3s background ease-out 0s';
export const transitionColor = '0.3s color ease-out 0s';
export const transitionTop = '0.3s top ease-out 0s';
export const transitionLeft = '0.3s left ease-out 0s';

/** DEFINED BLUR */
export const blur5 = 'blur(5px)';
export const blur10 = 'blur(10px)';
export const blur15 = 'blur(15px)';
export const blur20 = 'blur(20px)';

/** DEFINED POSITION */
export const position = {
  absolute: 'absolute',
  relative: 'relative',
  fixed: 'fixed',
  static: 'static',
  sticky: 'sticky'
};

/** DEFINED DISPLAY */
export const display = {
  none: 'none',
  block: 'block',
  inline: 'inline',
  inlineBlock: 'inline-block',
  inlineFlex: 'inline-flex',
  flex: 'flex'
};

/** DEFINED VISIBLE */
export const visible = {
  hidden: 'hidden',
  visible: 'visible'
};

/** Margin */
export const mR20 = {
  marginRight: 20
};

export const fontLight = '300';
export const fontRegular = '400';
export const fontSemiBold = '600';
export const fontBold = '700';
