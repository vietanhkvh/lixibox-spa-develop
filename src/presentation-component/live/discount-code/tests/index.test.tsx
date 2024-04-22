jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import LiveDiscountCode from '..';

const component = (params = {}) => {
  const props = {
    discountCodeList: [
      {
        id: 1,
        description: 'Test description 1',
        code: 'ABCDEF'
      },
      {
        id: 2,
        description: 'Test description 2',
        code: 'BCDEFG'
      }
    ],
    isShowFullList: true,
    onAddDiscountCode: jest.fn()
  };

  return <LiveDiscountCode {...Object.assign({}, props, params)} />;
};

describe('LiveDiscountCode', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
