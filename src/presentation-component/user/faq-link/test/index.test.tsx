import { reduxRender } from 'utils/test-utils';
import FaqLink from '..';

const component = (params = {}) => {
  const props = {
    to: '/',
    title: 'FAQ link title',
    info: 'FAQ link info'
  };

  return <FaqLink {...Object.assign({}, props, params)} />;
};

describe('FaqLink', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
