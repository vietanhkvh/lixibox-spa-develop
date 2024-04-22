import * as VARIABLE from '../../../../style/variable';

export default {
  display: VARIABLE.display.block,
  position: VARIABLE.position.relative,

  header: {
    height: 50,
    maxHeight: 50,
    display: VARIABLE.display.flex,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: VARIABLE.colorWhite,
    position: VARIABLE.position.fixed,
    width: '100%',
    top: 0,
    left: 0,
    zIndex: VARIABLE.zIndex9,

    icon: {
      width: 50,
      height: 50,
      color: VARIABLE.colorBlack
    },

    innerIcon: {
      width: 16,
      height: 16
    },

    input: {
      flex: 10,
      height: 34,
      maxHeight: 34,
      marginLeft: 10,
      paddingLeft: 10,
      borderRadius: 17,
      background: VARIABLE.colorF7,
      boxShadow: 'none',
      border: `1px solid ${VARIABLE.colorF0}`,
      outline: 'none'
    }
  },

  brandContainer: {
    background: VARIABLE.colorWhite,
    boxShadow: VARIABLE.shadow3,
    width: '100%',
    height: 350,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,

    list: {
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      marginTop: 50,
      width: '100%',
      height: '100%',

      group: {
        marginBottom: 20
      },

      heading: {
        borderBottom: `1px solid ${VARIABLE.color75}`,
        fontSize: 18,

        height: 25,
        lineHeight: '27px',
        marginBottom: 10,
        backgroundColor: VARIABLE.colorWhite,
        top: 0
      },

      item: {
        fontSize: 13,
        lineHeight: '40px',
        cursor: 'pointer',
        textDecoration: 'none',
        color: VARIABLE.color75
      }
    }
  }
} as any;
