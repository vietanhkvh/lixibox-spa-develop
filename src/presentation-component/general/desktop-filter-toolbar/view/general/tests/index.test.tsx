jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import { HeadingItem } from '..';

const component = (params = {}) => {
  const props = {
    title: 'Test title',
    value: 'Test value',
    onClick: jest.fn(),
    isLeftAlign: true
  };

  return <HeadingItem {...Object.assign({}, props, params)} />;
};

describe('HeadingItem', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
