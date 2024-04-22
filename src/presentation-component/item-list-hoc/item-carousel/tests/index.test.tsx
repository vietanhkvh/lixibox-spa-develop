jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ItemCarousel from '..';

const component = (params = {}) => {
  const props = {
    title: 'Test title',
    viewMore: '',
    viewMoreLink: '#',
    children: <div>Test node</div>,
    key: 0,
    isSection: false,
    onViewMoreClick: jest.fn()
  };

  return <ItemCarousel {...Object.assign({}, props, params)} />;
};

describe('ItemCarousel', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
