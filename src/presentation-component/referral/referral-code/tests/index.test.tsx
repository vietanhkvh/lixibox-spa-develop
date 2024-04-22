jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import ReferralCode from '..';

const component = (params = {}) => {
  const props = {
    code: 'CODEABCDE',
    title: 'Title',
    button: { title: 'Button1', disabled: false, onClick: jest.fn() },
    onCopy: jest.fn()
  };

  return <ReferralCode {...Object.assign({}, props, params)} />;
};

describe('ReferralCode', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
