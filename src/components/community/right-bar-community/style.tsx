import * as VARIABLE from '../../../style/variable';

export default {
  wrapLayout: {
    paddingTop: 10,
    paddingLeft: 10
  },

  header: {
    fontSize: 16,
    fontWeight: VARIABLE.fontSemiBold,
    color: VARIABLE.color20,
    marginBottom: 16
  },

  headerNoBorder: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderBottom: 'none'
  },

  text: {
    fontSize: 16,
    marginBottom: 10,
    color: VARIABLE.colorBlack08
  },

  wrapElement: {
    boxShadow: VARIABLE.shadowBlurSort,
    borderRadius: 5,
    backgroundColor: VARIABLE.colorWhite,
    marginBottom: 20
  },

  hashtagGroup: {
    marginBottom: 20
  },

  wrapTag: {
    display: VARIABLE.display.flex,
    flexWrap: 'wrap',

    tag: {
      backgroundColor: VARIABLE.colorWhite,
      color: VARIABLE.color4D,
      marginRight: 10,
      marginBottom: 10,
      padding: 10,
      borderRadius: 4,
      height: 30,
      lineHeight: '10px',

      active: {
        color: VARIABLE.colorWhite,
        backgroundColor: VARIABLE.colorBlack
      }
    }
  }
} as any;
