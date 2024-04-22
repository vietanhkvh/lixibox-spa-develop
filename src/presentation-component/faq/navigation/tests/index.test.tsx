jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { INITIAL_STATE_FAQ } from '../../../../flows/faq/reducer';
import { reduxRender } from '../../../../utils/test-utils';
import PricingBreakdown from '..';

const component = (params = {}) => {
  const props = {
    list: INITIAL_STATE_FAQ.topicList,
    isWithNumberOrdering: false,
    isWithoutBorder: false,
    isBoldTitle: false,
    isBigTitle: false,
    selectedSlug: '',
    onClick: jest.fn(),
    urlPath: ''
  };

  return <PricingBreakdown {...Object.assign({}, props, params)} />;
};

describe('PricingBreakdown', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
