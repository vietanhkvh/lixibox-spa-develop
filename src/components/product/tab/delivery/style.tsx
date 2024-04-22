import * as VARIABLE from '../../../../style/variable';
import { combineStyle } from '../../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [
      {
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10
      }
    ] as any,
    DESKTOP: [
      {
        paddingRight: 20,
        paddingBottom: 50,
        paddingLeft: 20,
        paddingTop: 20
      }
    ] as any,
    GENERAL: [
      {
        width: '100%',
        display: 'block'
      }
    ] as any
  }),

  top: {
    marginBottom: 10
  },

  selectCountry: {},

  infoDelivery: {
    icon: {},

    info: {
      value: {
        color: VARIABLE.colorPink
      }
    }
  },

  deliverCalculator: {
    marginBottom: 30
  },

  bankList: {
    maxWidth: '100%',
    height: 'auto'
  }
} as any;
