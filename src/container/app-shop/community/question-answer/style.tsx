import * as VARIABLE from '../../../../style/variable';

export default {
  display: 'block',
  position: 'relative',
  paddingTop: 10,

  container: {
    boxShadow: VARIABLE.shadowBlurSort,
    borderRadius: 3,
    marginBottom: 10,
    background: VARIABLE.colorWhite,
    position: VARIABLE.position.relative,

    active: {
      trasition: VARIABLE.transitionNormal,
      zIndex: VARIABLE.zIndex9,
      boxShadow: `0px 10px 70px ${VARIABLE.colorBlack05}`
    }
  },

  wrapFocus: {
    top: 0,
    left: 0,
    position: VARIABLE.position.fixed,
    background: VARIABLE.colorBlack,
    opacity: 0.7,
    width: '100%',
    height: '100%',
    zIndex: VARIABLE.zIndex9,
    trasition: VARIABLE.transitionNormal
  },

  wrapInfo: {
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    cursor: 'pointer',
    display: VARIABLE.display.flex,

    avatar: {
      width: 50,
      minWidth: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundColor: VARIABLE.colorE5
    },

    input: {
      border: 'none',
      flex: 1,
      paddingLeft: 10
    }
  },

  wrapSelect: {
    display: VARIABLE.display.flex,
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,

    selectGroup: {
      display: VARIABLE.display.flex,
      flexDirection: 'column',
      width: `calc(50% - 5px)`,

      title: {
        color: VARIABLE.colorBlack06,
        fontSize: 14,
        marginBottom: 10
      },

      input: {
        height: 40,
        borderRadius: 3,
        paddingLeft: 10,
        border: `1px solid ${VARIABLE.colorBlack02}`
      }
    }
  },

  wrapQuestionBtn: {
    background: VARIABLE.colorFA,
    textAlign: 'right' as const,
    height: 50,
    maxHeight: 50,
    borderTop: `1px solid ${VARIABLE.colorBlack005}`,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,

    questionBtn: {
      height: 30,
      padding: '10px 20px',
      lineHeight: '10px',
      background: VARIABLE.colorBlack,
      color: VARIABLE.colorWhite,
      textTransform: 'uppercase',
      width: 150,
      maxWidth: 150,
      marginRight: 20
    }
  },

  wrapBtn: {
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center' as const,
    paddingTop: 10,
    marginBottom: 20,

    btn: {
      marginTop: 0,
      marginBottom: 10,
      width: 200,
      maxWidth: 200
    }
  },

  wrapLayout: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0
  },

  feedList: {
    paddingLeft: 0,
    paddingRight: 0
  }
} as any;
