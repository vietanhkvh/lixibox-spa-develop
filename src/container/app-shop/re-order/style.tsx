import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [{ paddingTop: 0 }] as any,
    DESKTOP: [{ paddingTop: 30 }] as any,

    GENERAL: [
      {
        display: 'block',
        position: 'relative',
        zIndex: VARIABLE.zIndex5
      }
    ] as any
  }),

  row: {
    display: VARIABLE.display.flex,
    flexWrap: 'wrap',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5
  },

  item: {
    padding: 5
  },

  placeholder: {
    width: '100%',
    paddingTop: 20,

    title: {
      background: VARIABLE.colorF0,
      display: VARIABLE.display.block,
      width: '40%',
      height: 40,
      margin: '0 auto 30px'
    },

    titleMobile: {
      margin: 0,
      textAlign: 'left' as const
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
      minWidth: '20%',
      width: '20%',

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
  }
} as any;
