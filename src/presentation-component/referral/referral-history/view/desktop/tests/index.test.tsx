jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import ReferralHistory from '..';

const component = (params = {}) => {
  const props = {
    referee: 'Firstname Lastname',
    time: new Date('2021/01/01 01:01'),
    title: 'Some title text',
    benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3']
  };

  return <ReferralHistory {...Object.assign({}, props, params)} />;
};

describe('ReferralHistory', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
