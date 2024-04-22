jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import Accordion from '..';

const component = (params = {}) => {
  const props = {
    data: [
      { id: 1, title: 'Chính sách đổi trả', content: () => <div>Chính sách đổi trả</div> },
      { id: 2, title: 'Tình trạng đổi trả', content: () => <div>Tình trạng đổi trả</div> },
      { id: 3, title: 'Quy trình nhận hàng', content: () => <div>Quy trình nhận hàng</div> },
      { id: 4, title: 'Điều kiện đổi trả sản phẩm', content: () => <div>Điều kiện đổi trả sản phẩm</div> }
    ],
    selectedIndex: 0,
    styles: {
      common: { borderLeft: 'none', borderRight: 'none' },
      desktop: {},
      mobile: { padding: '0 16px', border: 'none' },
      heading: {
        background: 'var(--colorWhite)',
        paddingLeft: 0
      }
    }
  };

  return <Accordion {...Object.assign({}, props, params)} />;
};

describe('Accordion', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
