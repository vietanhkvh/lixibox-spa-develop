import * as variableStyle from './variable';

/** GENERAL WRAP LAYOUT */

export const wrapLayout = {
  display: 'block',
  width: '100%',
  maxWidth: variableStyle.breakPoint1170,
  // minWidth: variableStyle.breakPoint320,
  marginTop: 0,
  marginRight: 'auto',
  marginBottom: 0,
  marginLeft: 'auto',
  paddingTop: 0,
  paddingLeft: 0,
  paddingBottom: 0,
  paddingRight: 0,

  smaller: {
    maxWidth: variableStyle.breakPoint960
  },

  larger: {
    maxWidth: variableStyle.breakPoint1440
  }
};

/** SPLIT LAYOUT: MAIN / RIGHT COLUMN */
export const splitContainer = {
  display: 'flex',
  flexWrap: 'wrap'
};

/** CONTAINER LAYOUT: FLEX / BLOCK */

export const flexContainer = {
  wrap: {
    display: 'flex',
    flexWrap: 'wrap'
  },

  noWrap: {
    display: 'flex',
    flexWrap: 'no-wrap'
  },

  justify: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  around: {
    display: 'flex',
    justifyContent: 'space-around'
  },

  left: {
    display: 'flex',
    justifyContent: 'flex-start'
  },

  right: {
    display: 'flex',
    justifyContent: 'flex-end'
  },

  center: {
    display: 'flex',
    justifyContent: 'center'
  },

  verticalFlex: {
    display: 'flex',
    flexDirection: 'column'
  },

  verticalFlexBottom: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },

  verticalCenter: {
    display: 'flex',
    alignItems: 'center'
  }
} as any;

/** COMLUMN LAYOUT*/

export const layoutColumn = {
  col1: { width: '8.333%' },
  col2: { width: '16.666%' },
  col3: { width: '25%' },
  col4: { width: '33.333%' },
  col5: { width: '41.666%' },
  col6: { width: '50%' },
  col7: { width: '58.333%' },
  col8: { width: '66.666%' },
  col9: { width: '75%' },
  col10: { width: '83.333%' },
  col11: { width: '91.666%' },
  col12: { width: '100%' }
};
