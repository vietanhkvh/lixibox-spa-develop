import * as VARIABLE from '../../style/variable';
import { combineStyle } from '../../utils/responsive';

export default {
  container: {
    position: VARIABLE.position.relative
  },

  itemSelect: {
    container: (isAddressEmpty = false, isShowError = false) =>
      combineStyle({
        MOBILE: [
          {
            paddingTop: 15,
            paddingRight: 5,
            paddingBottom: 8,
            paddingLeft: 0,
            marginBottom: 10
          }
        ] as any,

        DESKTOP: [
          {
            height: isAddressEmpty ? 34 : '',
            paddingTop: isAddressEmpty ? 5 : 0,
            paddingRight: 5,
            paddingBottom: 8,
            paddingLeft: 0,
            marginBottom: 21,
            marginTop: isAddressEmpty ? 20 : 0
          }
        ] as any,

        GENERAL: [
          {
            cursor: 'pointer',
            borderBottom: `1px solid ${isShowError ? VARIABLE.colorRed : VARIABLE.colorE5} `
          }
        ] as any
      }),

    select: {
      display: VARIABLE.display.flex,
      alignItems: `flex - start`,
      justifyContent: 'space-between'
    },

    title: (isShowError) => ({
      color: isShowError ? VARIABLE.colorRed : VARIABLE.colorBlack,
      opacity: 0.65,
      flex: 10,
      fontSize: 15
    }),

    icon: {
      width: 15,
      height: 15,
      color: VARIABLE.colorBlack04,
      marginLeft: 10,
      position: VARIABLE.position.relative,
      top: 2
    },

    innerIcon: {
      width: 15
    },

    addressHeading: {
      fontSize: 12,
      marginBottom: 10
    },

    addressValue: {
      color: VARIABLE.colorBlack,
      fontSize: 14
    }
  },

  error: {
    fontSize: 10,
    width: '100%',
    height: 16,
    lineHeight: '16px',
    color: VARIABLE.colorRed,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
    overflow: 'hidden',
    transition: VARIABLE.transitionNormal,
    position: VARIABLE.position.absolute,
    bottom: -17,
    left: 0
  }
} as any;
