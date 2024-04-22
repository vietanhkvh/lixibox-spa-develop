import * as VARIABLE from '../../../../style/variable';

export default {
  asidebar: {
    borderRight: `1px solid ${VARIABLE.colorE5}`
  },

  container: {
    marginTop: 30
  },

  navigationBlock: {
    marginBottom: 20
  },

  mobileUserInfoContainer: {
    marginTop: 20,
    marginBottom: 20
  },

  mobileNavigationBlock: {
    marginBottom: 20
  },

  contentWrap: {
    paddingTop: 20,

    title: {
      fontSize: 25,
      textAlign: 'center' as const,
      textTransform: 'uppercase'
    },

    content: {
      textAlign: 'justify' as const,

      textMain: {
        fontSize: 20,
        margin: '20px 0'
      },

      text: {
        fontSize: 15,
        lineHeight: '21px'
      }
    }
  },

  desktopPanel: {
    // background: VARIABLE.colorF5,
    padding: '20px 0'
  },

  desktopWrap: {
    background: VARIABLE.colorWhite,
    borderRadius: 8
  }
} as any;
