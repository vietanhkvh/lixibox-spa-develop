import * as VARIABLE from './variable';

/** BODY TEXT */
const textBase = {
  fontSize: 14,
  lineHeight: '20px',
  color: VARIABLE.color4D,
  textAlign: 'justify' as const
};

export const bodyText = {
  normal: Object.assign({}, textBase, {}) as any,

  textPink: Object.assign({}, textBase, {
    color: VARIABLE.colorPink
  }),

  sub: Object.assign({}, textBase, {
    fontSize: 12,
    color: VARIABLE.color75
  }),

  bold: Object.assign({}, textBase, {}),

  italic: Object.assign({}, textBase, {
    fontStyle: 'italic'
  }),

  titlePink: Object.assign({}, textBase, {
    fontSize: 16,

    color: VARIABLE.colorPink
  }),

  border: Object.assign({}, textBase, {
    fontSize: 12,
    background: VARIABLE.colorE5,
    borderRadius: 2,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 8,
    marginRight: 10,
    lineHeight: '22px'
  })
};

/** TITLE */

const titleBase = {
  fontSize: 18,
  lineHeight: '26px',
  textTransform: 'uppercase',
  textAlign: 'justify' as const,
  color: VARIABLE.color2E
};

export const title = {
  normal: Object.assign({}, titleBase, {
    marginBottom: 10
  }) as any
};
