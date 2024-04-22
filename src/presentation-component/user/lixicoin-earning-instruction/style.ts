import * as VARIABLE from 'style/variable';

export const main = {
  container: {
    paddingLeft: 16,
    paddingRight: 16
  }
};

export const step = {
  container: {
    with: '100%',
    padding: '15px 0 17px',
    display: 'flex'
  },

  containerWithBorder: {
    borderBottom: `1px solid ${VARIABLE.colorF0}`
  },

  icon: {
    width: 75,
    minWidth: 75,
    height: 50,
    color: VARIABLE.colorBlack
  },

  innerIcon: {
    width: 50
  },

  angleIcon: {
    width: 20,
    minWidth: 20,
    height: 50,
    color: VARIABLE.color4D
  },

  innerAngleIcon: {
    width: 9
  },

  info: {
    flexGrow: 1,
    paddingRight: 5
  },

  title: {
    textTransform: 'uppercase' as const,

    fontSize: 14,
    color: VARIABLE.colorBlack,
    mraginBottom: 5
  },

  contentList: {},

  content: {
    color: VARIABLE.colorBlack,
    fontSize: 12
  },

  boldText: {
    padding: '0 3px',
    fontWeight: VARIABLE.fontBold
  },

  button: {
    width: 130,
    borderRadius: 5,
    margin: 0
  },

  buttonTitleStyle: {}
};
