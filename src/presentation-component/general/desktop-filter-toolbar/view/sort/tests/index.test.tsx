jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import { SortPanel } from '..';

const sortList = [
  {
    id: 1,
    key: 'default',
    title: 'Mặc định',
    selected: true
  },
  {
    id: 2,
    key: 'newest',
    title: 'Mới nhất',
    selected: false
  },
  {
    id: 3,
    key: 'most-discount',
    title: 'Giảm giá nhiều nhất',
    selected: false
  },
  {
    id: 4,
    key: 'price-asc',
    title: 'Giá tăng dần',
    selected: false
  },
  {
    id: 5,
    key: 'price-desc',
    title: 'Giá giảm dần',
    selected: false
  }
];

const component = (params = {}) => {
  const props = {
    isOpenSort: true,
    sortList,
    onSelect: jest.fn(),
    onClickOverlay: jest.fn()
  };

  return <SortPanel {...Object.assign({}, props, params)} />;
};

describe('SortPanel', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
