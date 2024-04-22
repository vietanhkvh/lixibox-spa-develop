import { reduxRender } from 'utils/test-utils';
import { Constants } from 'test/sample/api/cart';
import GetMoreCoin from '..';

const component = (params = {}) => {
  const props = {
    isUnboxingEnabled: true,
    unboxingReward: Constants.unboxing_reward,
    referrerReward: Constants.referrer_reward,
    earnRate: 1.5
  };

  return <GetMoreCoin {...Object.assign({}, props, params)} />;
};

describe('GetMoreCoin', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
