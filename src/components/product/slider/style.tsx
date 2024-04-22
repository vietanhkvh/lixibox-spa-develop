import * as LAYOUT from '../../../style/layout';
import * as VARIABLE from '../../../style/variable';
import * as COMPONENT from '../../../style/component';
import { combineStyle, getDeviceVersion } from '../../../utils/responsive';

const generateSwitchStyle = (mobile, desktop) => {
  const switchStyle = {
    MOBILE: {
      scrollSnapAlign: 'center',
      paddingRight: 10,
      width: mobile,
      minWidth: mobile
    },
    DESKTOP: { width: desktop }
  };

  return switchStyle[getDeviceVersion()];
};

export default {
  display: 'block',
  width: '100%',

  column: {
    1: { width: '100%' },
    2: { width: 'calc(50% - 10px)', margin: 5 },
    3: generateSwitchStyle('165px', '33.33%'),
    4: generateSwitchStyle('175px', '25%'),
    5: generateSwitchStyle('175px', '20%'),
    6: generateSwitchStyle('50%', '16.66%')
  },

  productSlide: {
    position: 'relative',
    overflow: 'hidden',

    container: Object.assign({}, LAYOUT.flexContainer.wrap, COMPONENT.block.content, {
      paddingTop: 10,
      transition: VARIABLE.transitionOpacity
    }),

    pagination: Object.assign({}, LAYOUT.flexContainer.center, COMPONENT.slidePagination, {
      transition: VARIABLE.transitionNormal
    }),

    show: {
      opacity: 1,
      transform: 'translateY(0)'
    },

    navigation: Object.assign(
      {},
      LAYOUT.flexContainer.center,
      LAYOUT.flexContainer.verticalCenter,
      COMPONENT.slideNavigation
    )
  },

  customStyleLoading: {
    height: 300
  },

  mobileWrap: {
    container: (showHorizontal = false) => {
      return {
        width: '100%',
        paddingTop: 0,
        paddingLeft: showHorizontal ? 0 : 5,
        paddingRight: 0,
        paddingBottom: showHorizontal ? 0 : 5
      };
    },

    panel: (showHorizontal = false) => {
      return {
        flexWrap: showHorizontal ? 'nowrap' : 'wrap',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        paddingLeft: showHorizontal ? 10 : 0,
        paddingRight: showHorizontal ? 10 : 5,
        paddingTop: showHorizontal ? 10 : 0,
        paddingBottom: showHorizontal ? 10 : 0
      };
    }
  },

  placeholder: {
    width: '100%',
    display: VARIABLE.display.flex,
    marginBottom: 35,

    item: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10
    },

    image: {
      width: '100%',
      height: 'auto',
      paddingTop: '84%',
      marginBottom: 10
    },

    text: {
      width: '94%',
      height: 30,
      marginBottom: 10
    },

    lastText: {
      width: '65%',
      height: 30
    }
  },

  desktopTitle: {
    marginBottom: 0,
    textAlign: `center`
  },

  title: {
    container: combineStyle({
      MOBILE: [
        {
          marginBottom: 10
        }
      ] as any,

      DESKTOP: [
        {
          marginBottom: 20
        }
      ] as any,

      GENERAL: [
        {
          top: -1,
          height: 60,
          fontSize: 20,
          letterSpacing: -0.5,
          maxWidth: `100%`,
          overflow: `hidden`,
          lineHeight: `60px`,
          whiteSpace: `nowrap`,
          textOverflow: `ellipsis`,
          color: VARIABLE.colorBlack,

          background: VARIABLE.colorWhite,
          position: VARIABLE.position.relative
        }
      ] as any
    }),

    borderLine: {
      display: VARIABLE.display.block,
      position: VARIABLE.position.absolute,
      height: 4,
      width: 25,
      background: VARIABLE.colorBlack,
      bottom: 1
    },

    line: {
      display: VARIABLE.display.block,
      position: VARIABLE.position.absolute,
      height: 1,
      width: '100%',
      background: VARIABLE.colorBlack05,
      bottom: 1
    }
  }
} as any;
