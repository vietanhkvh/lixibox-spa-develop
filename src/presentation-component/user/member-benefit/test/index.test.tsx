import { reduxRender } from 'utils/test-utils';
import { MemberBenefits } from 'constants/application/user';
import { MembershipLevels } from 'test/sample/api/user';
import MemberBenefit from '..';

const component = (params = {}) => {
  const props = {
    membershipInfo: MembershipLevels,
    benefitList: MemberBenefits
  };

  return <MemberBenefit {...Object.assign({}, props, params)} />;
};

describe('MemberBenefit', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
