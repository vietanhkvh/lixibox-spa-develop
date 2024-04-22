import * as VARIABLE from '../../../style/variable';

export default {
  outer: {
    width: '100%',
    backgroundColor: VARIABLE.colorGoldenFE,
    borderRadius: 8
  },

  inner: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '5px 0'
  },

  icon: {
    width: 29,
    height: 50,
    margin: '16px 0 16px 10px'
  },

  innerIcon: {
    width: 21
  },

  text: {
    fontSize: 14,
    padding: '12px 12px 12px 10px',
    alignSelf: 'center'
  }
} as any;
