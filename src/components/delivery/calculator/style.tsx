import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  display: 'block',
  width: '100%',
  marginBottom: 20,

  selectBox: {
    marginBottom: 15,
    maxWidth: 300
  },

  result: {
    marginBottom: 10,

    icon: {
      width: 20,
      minWidth: 20,
      height: 20,
      textAlign: 'center' as const,
      lineHeight: '20px',
      marginRight: 10
    },

    heading: combineStyle({
      MOBILE: [{ fontSize: 13 }] as any,
      DESKTOP: [{}] as any,
      GENERAL: [
        {
          marginRight: 10,
          minWidth: 150
        }
      ] as any
    }),

    value: combineStyle({
      MOBILE: [{ fontSize: 12 }] as any,
      DESKTOP: [{ fontSize: 16 }] as any,
      GENERAL: [
        {
          textAlign: 'left' as const,
          fontWeight: VARIABLE.fontBold
        }
      ] as any
    })
  },

  itemSelect: {
    container: (isAddressEmpry = false) =>
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
            height: isAddressEmpry ? 34 : '',
            paddingTop: isAddressEmpry ? 5 : 0,
            paddingRight: 5,
            paddingBottom: 8,
            paddingLeft: 0,
            marginBottom: 21,
            marginTop: isAddressEmpry ? 20 : 0
          }
        ] as any,

        GENERAL: [
          {
            borderRadius: 3,
            borderBottom: `1px solid ${VARIABLE.colorE5} `
          }
        ] as any
      }),

    select: {
      display: VARIABLE.display.flex,
      alignItems: `center`,
      justifyContent: 'space-between',
      height: 40,
      backgroundColor: VARIABLE.colorWhite,
      border: `1px solid rgb(210, 211, 213)`,
      borderRadius: 3,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      cursor: 'pointer'
    },

    title: {
      color: VARIABLE.colorBlack,

      opacity: 0.65,
      flex: 10,
      fontSize: 15
    },

    icon: {
      width: 15,
      height: 15,
      color: VARIABLE.colorBlack04,
      marginLeft: 10,
      position: VARIABLE.position.relative
    },

    innerIcon: {
      width: 15
    },

    addressHeading: {
      lineHeight: '40px',
      fontSize: 15,
      color: VARIABLE.color75,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    },

    addressValue: {
      color: VARIABLE.colorBlack,
      fontSize: 14
    }
  }
} as any;
