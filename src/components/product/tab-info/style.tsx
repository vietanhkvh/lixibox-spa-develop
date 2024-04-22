import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  itemInfo: {
    container: {
      display: VARIABLE.display.flex,
      alignItems: `center`,
      justifyContent: `space-between`,
      cursor: 'pointer',
      borderTop: `1px solid ${VARIABLE.colorF0}`
    },

    name: {
      fontSize: 14,
      fontWeight: VARIABLE.fontSemiBold,
      color: VARIABLE.color20
    },

    icon: (isShow = false) => ({
      width: 13,
      height: 50,
      color: VARIABLE.color4D,
      transition: VARIABLE.transitionNormal,
      transform: isShow ? 'rotate(180deg)' : 'rotate(0deg)'
    }),

    innerIcon: {
      width: 13
    }
  },

  category: {
    width: `100%`,
    display: VARIABLE.display.flex,
    justifyContent: `flex-start`,
    marginBottom: 5,
    color: VARIABLE.colorBlack,

    title: {
      fontSize: 11,
      color: VARIABLE.colorBlack07,
      marginRight: 5,
      minWidth: 80
    },

    name: {
      fontSize: 12,

      opacity: 0.7
    }
  },

  infoWrap: (isShow = false) => ({
    height: isShow ? `100%` : 0,
    opacity: isShow ? 1 : 0,
    visibility: isShow ? `visible` : `hidden`,
    transition: VARIABLE.transitionNormal,
    display: isShow ? VARIABLE.display.block : VARIABLE.display.none
  }),

  reasonToSell: {
    paddingLeft: 20,
    paddingBottom: 20
  },

  infoContainer: {
    paddingTop: 10,
    transition: VARIABLE.transitionNormal,
    paddingBottom: 10,

    infoGroup: {
      display: VARIABLE.display.flex,
      marginBottom: 20,

      imgWrap: {
        width: '20%',
        marginRight: 10,

        img: combineStyle({
          MOBILE: [
            {
              width: `80%`
            }
          ] as any,

          DESKTOP: [
            {
              width: `75%`,
              margin: '0 auto'
            }
          ] as any,

          GENERAL: [
            {
              display: 'block',
              maxWidth: '100%'
            }
          ] as any
        })
      },

      info: {
        flex: 10,

        productName: {
          fontSize: 14,

          marginBottom: 10,
          color: VARIABLE.colorBlack,
          display: VARIABLE.display.block
        }
      }
    },

    desc: {
      textAlign: `justify`,
      fontSize: 13,
      lineHeight: `18px`,
      color: VARIABLE.colorBlack08,
      paddingRight: 30
    }
  }
} as any;
