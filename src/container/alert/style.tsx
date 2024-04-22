import { combineStyle } from '../../utils/responsive';
import * as LAYOUT from '../../style/layout';
import * as VARIABLE from '../../style/variable';

export default {
  container: (isShowCart: boolean) =>
    combineStyle({
      MOBILE: [
        {
          maxWidth: `calc(100% - 20px)`,
          top: `calc(10px + var(--sticky-top-banner-height, 0px))`,
          right: 10 + (isShowCart ? 350 : 0)
        }
      ] as any,

      DESKTOP: [
        {
          maxWidth: `calc(100% - 40px)`,
          top: `calc(20px + var(--sticky-top-banner-height, 0px))`,
          right: 20 + (isShowCart ? 350 : 0)
        }
      ] as any,

      GENERAL: [
        {
          transition: VARIABLE.transitionNormal,
          display: VARIABLE.display.block,
          position: VARIABLE.position.fixed,
          width: 400,
          height: 'auto',
          zIndex: VARIABLE.zIndexMax
        }
      ] as any
    }),

  show: {
    visibility: VARIABLE.visible.visible
  },

  item: (type = 'DEFAULT', isRemove = false, isShow = false) => {
    const borderColor = {
      DEFAULT: VARIABLE.colorBlack,
      WARNING: VARIABLE.colorYellow,
      SUCCESS: VARIABLE.colorGreen,
      ERROR: VARIABLE.colorRed
    };

    return Object.assign({}, LAYOUT.flexContainer.justify, LAYOUT.flexContainer.verticalCenter, {
      transition: VARIABLE.transitionNormal,
      background: VARIABLE.colorWhite,
      marginBottom: 20,
      borderRadius: 5,
      boxShadow: VARIABLE.shadow3,
      paddingTop: 10,
      paddingBottom: 10,
      borderLeft: `5px solid ${borderColor[type]}`
    });
  },

  icon: (type = 'DEFAULT') => {
    const iconColor = {
      DEFAULT: VARIABLE.colorBlack,
      WARNING: VARIABLE.colorYellow,
      SUCCESS: VARIABLE.colorGreen,
      ERROR: VARIABLE.colorRed
    };

    return {
      flex: 1,
      width: 50,
      minWidth: 50,
      height: 50,
      color: iconColor[type],
      marginRight: 10,
      marginLeft: 10
    };
  },

  iconText: (type) => {
    const iconColor = {
      DEFAULT: VARIABLE.colorBlack,
      WARNING: VARIABLE.colorYellow,
      SUCCESS: VARIABLE.colorGreen,
      ERROR: VARIABLE.colorRed
    };

    return {
      width: 50,
      minWidth: 50,
      maxWidth: 50,
      height: 50,
      borderRadius: '50%',
      marginRight: 10,
      marginLeft: 10,
      background: iconColor[type],
      color: VARIABLE.colorWhite,
      lineHeight: '50px',
      textAlign: 'center' as const,
      fontSize: 22
    };
  },

  iconInner: {
    width: 26,
    height: 26
  },

  info: {
    flex: 10,

    title: {
      lineHeight: '18px',
      fontSize: 16,
      color: VARIABLE.colorBlack,
      marginBottom: 5
    },

    content: {
      fontSize: 14,
      lineHeight: '18px',
      color: VARIABLE.color75
    }
  } as any,

  iconClose: {
    cursor: 'pointer',
    flex: 1,
    width: 50,
    minWidth: 50,
    height: 50,
    color: VARIABLE.colorBlack,

    inner: {
      width: 14,
      height: 14
    }
  }
} as any;
