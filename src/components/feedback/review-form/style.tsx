import * as VARIABLE from '../../../style/variable';

export default {
  container: {
    display: VARIABLE.display.block,
    backgroundColor: VARIABLE.colorWhite,
    width: '100%',
    paddingTop: 10
  },

  contentGroup: {
    display: VARIABLE.display.flex,
    borderRadius: 3,
    justifyContent: 'space-between',

    imgGroup: {
      display: VARIABLE.display.flex,
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: 100,

      img: {
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        paddingTop: '100%'
      },

      btn: {
        marginBottom: 0,
        maxWidth: 200
      }
    },

    rateGroup: {
      display: VARIABLE.display.flex,
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex: 1,
      paddingTop: 20,

      header: {
        title: {
          fontSize: 16,
          marginBottom: 5,
          color: VARIABLE.colorBlack
        },

        date: {
          fontSize: 12,
          color: VARIABLE.colorBlack05,
          marginBottom: 5
        },

        rate: {
          width: 100,
          marginBottom: 10,
          cursor: 'pointer'
        },

        review: {
          maxHeight: 200,
          overflow: 'hidden',
          fontSize: 14
        }
      },

      textarea: {
        height: 200,
        width: '100%',
        padding: 10,
        fontSize: 14,
        lineHeight: '20px',
        border: `1px solid ${VARIABLE.colorD2}`,
        borderRadius: 3,
        marginTop: 10,
        resize: 'none'
      },

      btn: {
        marginBottom: 0
      }
    }
  }
} as any;
