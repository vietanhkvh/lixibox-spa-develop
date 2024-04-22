import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  itemInfo: {
    container: (isShow = false) => ({
      display: VARIABLE.display.flex,
      alignItems: `center`,
      justifyContent: `space-between`,
      borderBottom: isShow ? '' : `1px solid ${VARIABLE.colorF0}`
    }),

    name: {
      fontSize: 15,
      paddingLeft: 20,

      color: VARIABLE.colorBlack08
    },

    icon: (isShow = false) => ({
      width: 50,
      height: 50,
      color: VARIABLE.color4D,
      transition: VARIABLE.transitionNormal,
      transform: isShow ? 'rotate(90deg)' : ''
    }),

    innerIcon: {
      width: 8
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

  infoContainer: {
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 10,
    transition: VARIABLE.transitionNormal,
    borderBottom: `1px solid ${VARIABLE.colorF0}`,
    paddingBottom: 10,

    infoGroup: {
      display: VARIABLE.display.flex,
      marginBottom: 20,

      imgWrap: {
        width: '30%',
        marginRight: 10,

        img: (imgUrl = '') =>
          combineStyle({
            MOBILE: [
              {
                paddingTop: `100%`
              }
            ] as any,

            DESKTOP: [
              {
                paddingTop: `50%`
              }
            ] as any,

            GENERAL: [
              {
                width: `100%`,
                backgroundImage: `url(${imgUrl})`,
                backgroundPosition: `center`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `contain`
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
      color: VARIABLE.colorBlack08
    }
  }
} as any;
