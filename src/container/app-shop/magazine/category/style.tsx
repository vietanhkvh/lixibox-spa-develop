import * as VARIABLE from '../../../../style/variable';

export default {
  tempText: {
    width: '100%',
    textAlign: 'center' as const,
    fontSize: 20,
    lineHeight: '150px'
  },

  placeholder: {
    width: '100%',
    paddingTop: 20,

    imgCover: {
      width: '100%',
      height: 510,
      backgroundColor: VARIABLE.colorE5,
      position: VARIABLE.position.relative,
      marginBottom: 30,

      item: {
        position: VARIABLE.position.absolute,
        left: 0,
        bottom: 25,
        backgroundColor: VARIABLE.colorWhite,
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        width: '50%',
        height: 125,
        display: VARIABLE.display.flex,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',

        text: {
          width: '100%',
          height: 20
        }
      }
    },

    title: {
      background: VARIABLE.colorWhite,
      display: VARIABLE.display.flex,
      alignItems: 'center',
      width: '100%',
      height: 60,
      marginLeft: 10,

      text: {
        width: '40%',
        height: 30
      }
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
      flexWrap: 'wrap'
    },

    productMobileItem: {
      minWidth: '50%',
      width: '50%'
    },

    productItem: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 20,
      minWidth: '20%',
      width: '20%',

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
    },

    mobile: {
      width: '100%',

      image: {
        width: '100%',
        height: 192,
        marginBottom: 10
      },

      text: {
        height: 48,
        paddingTop: 0,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
      }
    }
  }
} as any;
