jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ProductSearchPopular from '..';
import { screen } from '@testing-library/react';

const popularSearch = ['sua tam', 'thayers', 'nuoc', 'halio', 'theaters', 'b', 'buick', 'buick hoa', 'halo'];
const component = (params = {}) => {
  const props = {
    list: popularSearch
  };

  return <ProductSearchPopular {...Object.assign({}, props, params)} />;
};

describe('ProductSearchPopular', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });

  test(`render desktop`, () => {
    reduxRender(component(), { initialState: {} });
    expect(screen.getByText('Tìm kiếm nhiều nhất')).toBeInTheDocument();
    expect(document.getElementsByClassName('item desktop')[0]).toBeInTheDocument();
    expect(document.getElementsByClassName('fadedInWarpper')[0]).toBeInTheDocument();
  });
  const resizeWindow = (width, height) => {
    global.innerWidth = width;
    global.innerHeight = height;
    expect(window.innerWidth).toBe(width);
    expect(window.innerHeight).toBe(height);
  };
  test(`render mobile`, () => {
    resizeWindow(390, 840);
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
