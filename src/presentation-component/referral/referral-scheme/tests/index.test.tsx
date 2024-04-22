jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ReferralScheme from '..';

const component = (params = {}) => {
  const props = {
    scheme: {
      code: 'CODEABCDE',
      balance: 200000,
      lixicoin: 100,
      title: 'Some title',
      note: 'Some note',
      expired: false
    },
    onClick: jest.fn()
  } as any;

  return <ReferralScheme {...Object.assign({}, props, params)} />;
};

describe('ReferralScheme', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
