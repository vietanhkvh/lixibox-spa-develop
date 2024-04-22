import { reduxRender } from 'utils/test-utils';
import { UserSilver } from 'test/sample/api/user';
import LixicoinPreview from '..';

const component = (params = {}) => {
  const props = {
    user: UserSilver,
    coinsExpireAt: new Date().getTime() / 1000,
    onTransactionsLinkClick: jest.fn()
  };

  return <LixicoinPreview {...Object.assign({}, props, params)} />;
};

describe('LixicoinPreview', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
