import { getDeviceVersion } from '../../../utils/responsive';
import * as VARIABLE from '../../../style/variable';

const generateSwitchStyle = (mobile, desktop) => {
  const switchStyle = {
    MOBILE: { paddingRight: 10, width: mobile, minWidth: mobile },
    DESKTOP: { width: desktop }
  };

  return switchStyle[getDeviceVersion()];
};

export default {
  mainWrap: {
    paddingLeft: 10,
    paddingRight: 10
  },

  heading: {
    paddingLeft: 10,
    display: VARIABLE.display.inlineBlock,
    maxWidth: `100%`,
    whiteSpace: `nowrap`,
    overflow: `hidden`,
    textOverflow: `ellipsis`,

    color: VARIABLE.colorBlack,
    fontSize: 20,
    lineHeight: `40px`,
    height: 40,
    letterSpacing: -0.5,
    textTransform: `uppercase`
  },

  container: {
    width: '100%',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    paddingTop: 0,
    marginBottom: 0,
    display: VARIABLE.display.flex,

    itemSlider: {
      width: `100%`,
      height: `100%`,
      display: VARIABLE.display.inlineBlock,
      overflow: 'hidden',
      position: VARIABLE.position.relative
    },

    itemSliderPanel: {
      width: '100%',
      paddingTop: '62.5%',
      position: VARIABLE.position.relative,
      transition: VARIABLE.transitionOpacity,
      backgroundSize: 'cover',
      borderRadius: 8,
      overflow: 'hidden'
    },

    imageSlider: {
      position: VARIABLE.position.absolute,
      width: '100%',
      height: '100%',
      zIndex: VARIABLE.zIndex1,
      top: 0,
      left: 0,
      objectFit: 'cover'
    },

    videoIcon: {
      width: 70,
      height: 70,
      zIndex: VARIABLE.zIndex5,
      position: VARIABLE.position.absolute,
      top: '50%',
      left: '55%',
      transform: 'translate(-50%, -50%)',
      borderTop: '35px solid transparent',
      boxSizing: 'border-box',
      borderLeft: '51px solid white',
      borderBottom: '35px solid transparent',
      opacity: 0.8
    },

    info: {
      width: '100%',
      height: 110,
      padding: '12px 0',
      position: VARIABLE.position.relative,
      background: VARIABLE.colorWhite,

      image: (imgUrl) => ({
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: -1,
        position: VARIABLE.position.absolute,
        backgroundColor: VARIABLE.colorF7,
        backgroundImage: `url(${imgUrl})`,
        backgroundPosition: 'bottom center',
        backgroundSize: 'cover',
        filter: 'blur(4px)',
        transform: `scaleY(-1) scale(1.1)`,
        WebkitBackfaceVisibility: 'hidden',
        WebkitPerspective: 1000,
        WebkitTransform: 'translate3d(0,0,0) translateZ(0)',
        backfaceVisibility: 'hidden',
        perspective: 1000
      }),

      title: {
        color: VARIABLE.color20,
        whiteSpace: 'pre-wrap',
        fontWeight: VARIABLE.fontBold,
        fontSize: 14,
        lineHeight: '20px',
        maxHeight: '52px',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        overflow: 'hidden',
        marginBottom: 5
      },

      description: {
        fontSize: 13,
        color: VARIABLE.colorBlack,

        opacity: 0.7,
        marginRight: 10,
        whiteSpace: 'pre-wrap',
        lineHeight: '18px',
        maxHeight: 36,
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        overflow: 'hidden'
      },

      tagList: {
        width: '100%',
        display: VARIABLE.display.flex,
        flexWrap: 'wrap',
        height: '36px',
        maxHeight: '36px',
        overflow: 'hidden'
      },

      tagItem: {
        fontSize: 12,
        lineHeight: '18px',
        color: VARIABLE.colorBlack,

        opacity: 0.7,
        marginRight: 10,
        whiteSpace: 'pre-wrap'
      }
    }
  },

  column: {
    1: { width: '100%' },
    2: { width: '50%' },
    3: generateSwitchStyle('75%', '33.33%'),
    4: generateSwitchStyle('47%', '25%'),
    5: generateSwitchStyle('47%', '20%'),
    6: generateSwitchStyle('50%', '16.66%')
  }
} as any;
