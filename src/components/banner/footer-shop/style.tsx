import { combineStyle } from '../../../utils/responsive';
import * as LAYOUT from '../../../style/layout';
import * as VARIABLE from '../../../style/variable';

export default {
  display: VARIABLE.display.block,
  paddingTop: 10,
  paddingBottom: 16,

  heading: {
    fontWeight: VARIABLE.fontSemiBold,
    fontSize: 22,
    color: VARIABLE.color20,
    margin: '20px 0 28px 10px',
    textTransform: 'capitalize'
  },

  container: Object.assign({}, LAYOUT.flexContainer.wrap, {
    marginLeft: 0,
    marginRight: 0
  }),

  banner: {
    container: combineStyle({
      MOBILE: [{ width: '50%' }],
      DESKTOP: [{ width: '25%' }],

      GENERAL: [
        {
          height: 'auto',
          paddingRight: 8,
          paddingBottom: 0,
          paddingLeft: 8,
          cursor: 'pointer',
          position: 'relative'
        }
      ]
    }),

    flexContainer: {
      width: '100%',
      flex: 1
    },

    innerContainer: {
      width: '100%',
      paddingTop: '161%',
      borderRadius: 12,
      overflow: 'hidden',
      position: VARIABLE.position.relative
    },

    image: {
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      backgroundColor: VARIABLE.colorF7,
      display: 'block',
      position: 'absolute',
      transition: VARIABLE.transitionOpacity
    },

    linkList: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',

      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: VARIABLE.zIndex5
    },

    link: {
      flex: 1,
      display: 'block',
      height: '100%',
      width: '100%'
    }
  }
} as any;
