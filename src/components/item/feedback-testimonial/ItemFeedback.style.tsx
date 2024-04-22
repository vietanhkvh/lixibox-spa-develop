import { getDeviceVersion } from '../../../utils/responsive';
import * as LAYOUT from '../../../style/layout';
import * as VARIABLE from '../../../style/variable';

const generateSwitchStyle = (mobile, desktop) => {
  const switchStyle = {
    MOBILE: { paddingRight: 10, width: mobile, minWidth: mobile },
    DESKTOP: { width: desktop }
  };

  return switchStyle[getDeviceVersion()];
};

export default {
  container: {
    height: '100%',

    itemSlider: {
      width: `100%`,
      height: `100%`,
      display: VARIABLE.display.inlineBlock,
      overflow: 'hidden',
      boxShadow: VARIABLE.shadowBlur,
      position: VARIABLE.position.relative
    },

    itemSliderPanel: {
      width: '100%',
      paddingTop: '75%',
      position: VARIABLE.position.relative
    },

    innerItemSliderPanel: {
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      position: VARIABLE.position.absolute,
      transition: VARIABLE.transitionOpacity
    },

    image: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: VARIABLE.zIndex1,
      objectFit: 'cover'
    },

    info: {
      width: '100%',
      padding: 12,
      position: VARIABLE.position.relative,
      background: VARIABLE.colorWhite,
      display: VARIABLE.display.flex,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      zIndex: VARIABLE.zIndex5
    }
  },

  info: {
    container: Object.assign({}, LAYOUT.flexContainer.left, {
      width: '100%',
      marginBottom: 15
    }),

    avatar: {
      width: 40,
      minWidth: 40,
      height: 40,
      borderRadius: '50%',
      marginRight: 10,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundColor: VARIABLE.colorE5,
      transition: VARIABLE.transitionOpacity,

      small: {
        width: 30,
        minWidth: 30,
        height: 30,
        borderRadius: '50%'
      }
    },

    username: {
      paddingRight: 15,
      marginBottom: 5,
      textAlign: 'left' as const
    },

    detail: {
      flex: 10,
      display: VARIABLE.display.flex,
      flexDirection: 'column',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      justifyContent: 'center',

      username: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        fontSize: 14,
        lineHeight: '22px',
        marginRight: 5,
        color: VARIABLE.colorBlack
      },

      ratingGroup: {
        display: VARIABLE.display.flex,
        alignItems: 'center',
        lineHeight: '23px',
        height: 18,
        color: VARIABLE.color97,
        cursor: 'pointer'
      }
    },

    description: {
      fontSize: 14,
      lineHeight: '22px',
      textAlign: 'justify' as const,
      height: 66,
      maxHeight: 66,
      width: '100%',
      color: VARIABLE.colorBlack08,
      whiteSpace: 'pre-wrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 3
    }
  },

  icon: {
    position: VARIABLE.position.absolute,
    top: '50%',
    left: '50%',
    color: VARIABLE.colorWhite,
    transform: 'translate(-50%, -50%)',
    zIndex: VARIABLE.zIndex2,

    inner: {
      width: 60,
      height: 60
    }
  },

  videoIcon: {
    width: 70,
    height: 70,
    left: '55%',
    transform: 'translate(-50%, -50%)',
    borderTop: `35px solid ${VARIABLE.colorTransparent}`,
    borderLeft: `51px solid ${VARIABLE.colorWhite}`,
    borderBottom: `35px solid ${VARIABLE.colorTransparent}`,
    position: VARIABLE.position.absolute,
    boxSizing: `border-box`,
    zIndex: VARIABLE.zIndex5,
    opacity: 1,
    top: '50%',
    filter: `drop-shadow(0 0px 25px rgba(0,0,0,1))`
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
