jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import AdLink from '..';

const component = (params = {}) => {
  const props = {
    to: 'https://www.lixibox.com/halio'
  };

  return <AdLink {...Object.assign({}, props, params)} />;
};

describe('AdLink', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
