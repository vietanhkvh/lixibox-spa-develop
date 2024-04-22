import { reduxRender } from 'utils/test-utils';
import BalancePreviewItem, { BalancePreviewViewType } from '..';

const component = (params = {}) => {
  const props = {
    type: BalancePreviewViewType.CONFIRMED,
    value: 10000,
    expirableValue: 2000,
    expiryDate: new Date().getTime() / 1000
  };

  return <BalancePreviewItem {...Object.assign({}, props, params)} />;
};

describe('BalancePreviewItem', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
