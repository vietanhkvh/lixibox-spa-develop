import * as VARIABLE from '../../../style/variable';

export default {
  container: {},

  item: {
    display: VARIABLE.display.block,

    active: {
      background: `rgba(0,0,0,.03)`,
      pointerEvents: 'none'
    },

    inner: {
      display: VARIABLE.display.flex,
      background: VARIABLE.colorTransparent
    }
  },

  itemMobile: {
    display: VARIABLE.display.block,
    paddingRight: 5,

    mobileItemBoder: {
      borderBottom: `1px solid ${VARIABLE.colorF0}`
    },

    icon: {
      color: VARIABLE.color2E,
      width: 50,
      height: 50,
      marginLeft: 10,
      marginRight: 10
    },

    innerIcon: {
      width: 18
    },

    iconAngleRight: {
      color: VARIABLE.color2E,
      width: 30,
      height: 50
    },

    iconAngleRightInner: {
      width: 5
    },

    groupTitle: {
      display: VARIABLE.display.flex,
      flex: 10
    },

    title: {
      fontSize: 15,
      lineHeight: '52px',
      color: VARIABLE.colorBlack,

      flex: 10
    }
  }
} as any;
