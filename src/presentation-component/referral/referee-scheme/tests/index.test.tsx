jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import RefereeScheme from '..';

const component = (params = {}) => {
  const props = {
    scheme: {
      code: 'CODEABCDE',
      description: 'Some description',
      guideline: 'Some guideline',
      progress: 0.75,
      expiry: Math.floor(new Date('2021/01/01 01:01').getTime() / 1000),
      isApplied: true
    },
    isApplied: false,
    isApplying: false,
    action: { text: 'ActionText', withIcon: true },
    onBodyClick: jest.fn(),
    onApplyClick: jest.fn()
  } as any;

  return <RefereeScheme {...Object.assign({}, props, params)} />;
};

describe('RefereeScheme', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
