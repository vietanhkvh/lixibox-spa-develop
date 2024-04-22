import * as VARIABLE from '../../../../style/variable';

export default {
  display: VARIABLE.display.block,
  position: VARIABLE.position.relative,

  wrap: {
    position: 'relative',
    zIndex: 0,
    paddingTop: 5
  },

  layout: {
    left: {
      borderRight: `1px solid ${VARIABLE.colorF0}`
    }
  },

  customStyleLoading: {
    height: 400
  },

  desktopMainContent: {
    paddingTop: 20
  },

  desktopSubContent: {
    paddingTop: 20
  },

  placeholder: {
    width: '100%',
    paddingTop: 20,

    title: {
      background: VARIABLE.colorF0,
      display: VARIABLE.display.block,
      width: '50%',
      height: 40,
      margin: '0 auto 30px'
    },

    control: {
      width: '100%',
      display: VARIABLE.display.flex,
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 20
    },

    controlItem: {
      width: 150,
      height: 30,
      background: VARIABLE.colorF7
    },

    productList: {
      display: VARIABLE.display.flex,
      flexWrap: 'wrap',
      paddingTop: 20
    },

    productMobileItem: {
      minWidth: '50%',
      width: '50%'
    },

    productItem: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 20,
      minWidth: '25%',
      width: '25%',

      image: {
        width: '100%',
        height: 'auto',
        paddingTop: '82%',
        marginBottom: 10
      },

      text: {
        width: '94%',
        height: 25,
        marginBottom: 10
      },

      lastText: {
        width: '65%',
        height: 25
      }
    }
  },

  mobileList: {
    padding: '16px 0'
  }
} as any;
