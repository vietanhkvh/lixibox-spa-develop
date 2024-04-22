jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import GeneralItemHeading from '..';

const component = (params = {}) => {
  const props = {
    title: 'Test title',
    viewMoreLink: '#',
    viewMore: '',
    onViewMoreClick: jest.fn()
  };

  return <GeneralItemHeading {...Object.assign({}, props, params)} />;
};

describe('GeneralItemHeading', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
