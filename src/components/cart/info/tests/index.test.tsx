jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import Info from '..';

const data = { total_price: 0, lixicoin_bonux: 0 };
const isAllowCollapse = true;
const isShowActionButton = true;

const component = (params = {}) => {
  const props = {
    data,
    isAllowCollapse,
    isShowActionButton
  };

  return <Info {...Object.assign({}, props, params)} />;
};

describe('Info', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
