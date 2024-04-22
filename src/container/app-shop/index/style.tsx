import * as LAYOUT from '../../../style/layout';
import * as VARIABLE from '../../../style/variable';

export default {
  display: 'block',
  position: 'relative',
  zIndex: VARIABLE.zIndex5,

  wrapBannerMain: {
    marginBottom: 10
  },

  groupProductVideomagazine: Object.assign({}, LAYOUT.splitContainer, LAYOUT.flexContainer.justify, {
    marginBottom: '20px'
  }),

  feedContainer: {
    paddingTop: '30%',
    position: VARIABLE.position.relative,

    panel: {
      position: VARIABLE.position.absolute,
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      overflowX: 'hidden',
      overflowY: 'auto',

      feed: {
        paddingTop: 1,
        paddingRight: 1,
        paddingBottom: 1,
        paddingLeft: 1
      }
    }
  },

  mainBanner: {
    marginBottom: 20
  },

  list: {
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 8,

    item: {
      marginBottom: 8,
      boxShadow: VARIABLE.shadowBlur,

      image: {
        display: VARIABLE.display.block,
        width: '100%',
        maxWidth: '100%',
        height: 'auto'
      },

      title: {
        width: '100%',
        height: 30,
        lineHeight: '30px',
        textAlign: 'center' as const,
        fontSize: 14,
        color: VARIABLE.color4D,
        overflow: VARIABLE.visible.hidden,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }
  },

  placeholder: {
    banner: {
      width: '100%',
      paddingTop: '21%',
      marginBottom: 20,
      marginTop: 20
    },

    productList: {
      title: {
        width: 200,
        marginLeft: 10,
        height: 50,
        marginBottom: 20
      },

      list: {
        display: VARIABLE.display.flex
      },

      item: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20,
        minWidth: '50%',
        width: '50%',

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
      }
    },

    categorySlideWrap: {
      display: VARIABLE.display.flex,
      padding: '0 10px',
      marginBottom: 20,
      justifyContent: 'space-between',

      categorySlide: {
        height: 50,
        width: 'calc(50% - 5px)'
      }
    }
  },

  viewMoreMobile: {
    textAlign: 'center' as const,
    marginLeft: 10,
    marginRight: 10,
    display: 'block',

    btn: {
      marginTop: 0
    }
  }
} as any;
