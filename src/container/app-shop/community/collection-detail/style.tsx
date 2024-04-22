import * as VARIABLE from '../../../../style/variable';

export default {
  display: 'block',
  position: 'relative',

  wrapLayout: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 20,
    paddingLeft: 0
  },

  mobileWrapLayout: {
    padding: '10px 10px 0'
  },

  item: {
    display: VARIABLE.display.flex,
    position: VARIABLE.position.relative,
    boxShadow: VARIABLE.shadowBlur,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,

    itemWithLine: {
      borderTop: `1px solid ${VARIABLE.colorF0}`
    },

    cover: {
      icon: {
        position: VARIABLE.position.absolute,
        bottom: 0,
        right: -45,
        opacity: 0.25,
        width: 110,
        height: 110,
        color: VARIABLE.randomColorList(-1)
      },

      innerIcon: {
        height: 130
      }
    },

    content: {
      padding: 20,

      title: {
        fontSize: 18,
        lineHeight: '24px',
        fontWeight: VARIABLE.fontBold,
        color: VARIABLE.colorBlack,
        marginBottom: 10
      },

      description: {
        fontSize: 14,
        lineHeight: '22px',
        marginBottom: 10
      },

      link: {
        display: VARIABLE.display.inlineFlex,
        justifyContent: 'center',
        alignItems: 'center',
        height: 26,
        lineHeight: 26,
        background: VARIABLE.colorF7,
        border: `1px solid ${VARIABLE.colorF0}`,
        color: VARIABLE.colorPink,

        borderRadius: 2,
        paddingLeft: 13,

        icon: {
          width: 26,
          height: 26,
          color: VARIABLE.colorPink
        },

        innerIcon: {
          height: 10
        }
      }
    }
  },

  feedList: {
    boxShadow: VARIABLE.shadowBlurSort,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10
  },

  feedItem: {
    heading: {
      display: VARIABLE.display.flex,
      justifyContent: 'space-between',
      cursor: 'pointer',
      padding: 20,
      borderBottom: `1px solid ${VARIABLE.colorF0}`,

      avatar: {
        width: 40,
        minWidth: 40,
        height: 40,
        borderRadius: '50%'
      },

      infoUser: {
        padding: '0 40px 0 10px',

        name: {
          fontSize: 14,
          lineHeight: '20px',
          height: 20,
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        },

        message: {
          fontSize: 14,
          color: VARIABLE.color4D,
          lineHeight: '20px',
          height: 20,
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      },

      icon: {
        minWidth: 40,
        width: 40,
        height: 40,
        color: VARIABLE.color2E,
        marginRight: -10
      },

      innerIcon: {
        height: 8
      }
    },

    content: {}
  }
} as any;
