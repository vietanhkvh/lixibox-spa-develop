jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ItemVerticalList from '..';

const component = (params = {}) => {
  const props = {
    title: 'Test title',
    viewMore: '',
    viewMoreLink: '#',
    children: <div>Test node</div>,
    key: 0,
    column: 2
  };

  return <ItemVerticalList {...Object.assign({}, props, params)} />;
};

describe('ItemVerticalList', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
