import * as VARIABLE from '../../../style/variable';

export default {
  container: {
    position: VARIABLE.position.relative,
    display: VARIABLE.display.flex,
    flexDirection: `column`,
    justifyContent: 'center',
    alignItems: 'center',
    width: `100%`,
    padding: '30px 20px',
    background: VARIABLE.colorWhite,
    borderRadius: 8,
    borderTop: `1px solid ${VARIABLE.colorF0}`
  },

  username: {
    width: `100%`,
    overflow: `hidden`,
    textOverflow: `ellipsis`,
    fontSize: 18,
    lineHeight: `24px`,
    textAlign: `center`,
    position: VARIABLE.position.relative,
    fontWeight: VARIABLE.fontSemiBold,
    marginBottom: 6,
    color: VARIABLE.color20
  },

  emptyAvatar: {
    display: 'block',
    width: 90,
    height: 90,
    margin: '5px auto 15px'
  },

  noteHeading: {
    fontWeight: VARIABLE.fontSemiBold,
    fontSize: 18,
    lineHeight: '24px',
    color: VARIABLE.color20,
    textAlign: 'center' as const,
    marginBottom: 10
  },

  note: {
    fontWeight: VARIABLE.fontLight,
    fontSize: 13,
    color: VARIABLE.color20,
    lineHeight: '20px',
    textAlign: 'center' as const,
    padding: '0 40px',
    marginBottom: 15
  },

  title: {
    width: `100%`,
    overflow: `hidden`,
    textOverflow: `ellipsis`,
    fontSize: 11,

    textAlign: `center`,
    textShadow: `0 1px 2px rgba(0,0,0,.2)`,
    marginBottom: 20,
    position: VARIABLE.position.relative
  },

  stats: {
    display: VARIABLE.display.flex,
    flexDirection: `row`,
    width: `100%`,
    position: VARIABLE.position.relative,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 12,

    itemWidthBorder: {
      borderRight: `1px solid ${VARIABLE.colorF0}`
    },

    item: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: 50,
      padding: '0 10px',

      value: {
        fontSize: 20,
        lineHeight: `24px`,
        fontWeight: VARIABLE.fontSemiBold,
        color: VARIABLE.color20,
        marginBottom: 5,
        textAlign: 'center'
      },

      title: {
        fontSize: 14,
        lineHeight: `12px`,
        fontWeight: VARIABLE.fontLight,
        color: VARIABLE.color20
      }
    },
    itemLeft: {
      padding: '0 10px 0 5px'
    },
    itemRight: {
      padding: '0 5px 0 10px'
    }
  },

  loginGroup: {
    alignItems: 'center',
    width: '100%',

    btnSignIn: {
      width: `calc(50% - 10px)`
    },

    btnSignUp: {
      width: `50%`
    },

    btn: {
      marginTop: 5,
      marginBottom: 5
    }
  },

  level: {
    display: 'inline-block',
    height: 18,
    width: 'auto',
    margin: '0 auto 12px',

    outer: {
      display: 'block',
      textAlign: 'center' as const
    },

    img: {
      display: 'block',
      height: 18,
      width: 'auto'
    }
  }
} as any;
