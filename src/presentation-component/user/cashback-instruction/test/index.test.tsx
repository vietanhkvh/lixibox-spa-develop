import { reduxRender } from 'utils/test-utils';
import CashbackInstruction from '..';

const component = (params = {}) => {
  const props = {};

  return <CashbackInstruction {...Object.assign({}, props, params)} />;
};

describe('CashbackInstruction', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
