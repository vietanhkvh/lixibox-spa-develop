import * as VARIABLE from 'style/variable';

export const infoIcon = {
  outer: {
    verticalAlign: 'middle',
    width: 16,
    height: 16,
    cursor: 'pointer',
    marginLeft: 3,
    marginRight: 3,
    display: 'inline-flex',
    color: VARIABLE.color4D
  },

  inner: { width: 11 }
} as any;

export const progress = {
  text: {
    fontSize: 12,
    lineHeight: '18px',
    display: 'inline-block',
    verticalAlign: 'top'
  },

  boldText: {
    fontSize: 12,
    padding: '0 3px',
    fontWeight: VARIABLE.fontBold,
    lineHeight: '18px',
    marginBottom: 10
  },

  bar: {
    width: '100%',
    display: 'flex',
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 9,
    background: VARIABLE.colorWhite,
    border: `1px solid ${VARIABLE.colorBlack}`,
    padding: 1,
    height: 18
  },

  startBar: {
    fontSize: 10,
    height: 14,
    borderRadius: '7px 0 0 7px',
    padding: '0 5px',
    lineHeight: '16px',
    color: VARIABLE.colorWhite,
    background: VARIABLE.colorBlack
  },

  valueBar: {
    minWidth: '15%',
    maxWidth: '100%',
    textAlign: 'right' as const,
    padding: '0 5px',
    borderRadius: '0 7px 7px 0',
    fontSize: 10,
    height: 14,
    lineHeight: '16px',
    color: VARIABLE.colorWhite,
    background: VARIABLE.colorBlack
  },

  innerBar: {
    flex: 1
  },

  endBar: {
    fontSize: 10,
    height: 14,
    lineHeight: '16px',
    padding: '0 5px',

    color: VARIABLE.colorBlack
  },

  level: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },

  levelText: {
    fontSize: 10,
    lineHeight: '16px',
    letterSpacing: 1,
    fontWeight: VARIABLE.fontBold,
    textTransform: 'uppercase',
    cursor: 'pointer'
  }
} as any;
