import * as VARIABLE from '../../style/variable';
import { combineStyle } from '../../utils/responsive';

export default {
  container: {
    display: VARIABLE.display.block
  },

  row: {
    display: VARIABLE.display.flex,
    flexWrap: 'wrap'
  },

  content: {
    width: '50%',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5
  },

  placeholder: {
    width: '100%',

    title: {
      background: VARIABLE.colorF0,
      display: VARIABLE.display.block,
      width: 100,
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
      paddingTop: 5
    },

    productMobileItem: {
      minWidth: '50%',
      width: '50%',
      paddingLeft: 5,
      paddingRight: 5,
      marginBottom: 10
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

  note: combineStyle({
    MOBILE: [
      {
        fontSize: 16
      }
    ] as any,

    DESKTOP: [
      {
        fontSize: 20
      }
    ] as any,

    GENERAL: [
      {
        textAlign: 'center' as const
      }
    ] as any
  })
} as any;
