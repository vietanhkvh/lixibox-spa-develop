import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  container: {},

  list: combineStyle({
    MOBILE: [{}] as any,

    DESKTOP: [
      {
        padding: 10,
        display: 'flex',
        flexWrap: 'wrap'
      }
    ] as any,

    GENERAL: [{ width: '100%' }] as any
  }),

  row: {
    display: VARIABLE.display.flex,
    flexWrap: 'wrap',
    marginLeft: -10,
    marginRight: -10
  },

  item: combineStyle({
    MOBILE: [{}] as any,

    DESKTOP: [
      {
        border: `1px solid ${VARIABLE.colorE5}`,
        borderRadius: 8,
        margin: 10,
        maxWidth: 'calc(50% - 20px)',
        minWidth: 'calc(50% - 20px)',
        display: VARIABLE.display.flex
      }
    ] as any,

    GENERAL: [{}] as any
  }),

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

    productList: combineStyle({
      MOBILE: [
        {
          paddingTop: 10
        }
      ] as any,

      DESKTOP: [{}] as any,

      GENERAL: [
        {
          display: VARIABLE.display.flex,
          flexWrap: 'wrap'
        }
      ] as any
    }),

    productMobileItem: {
      minWidth: '100%',
      width: '100%',
      marginBottom: 10
    },

    productItem: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 20,
      minWidth: '50%',
      width: '50%',

      image: {
        width: '100%',
        height: 'auto',
        paddingTop: '83%'
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
