jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import FAQHeading from '..';

const component = (params = {}) => {
  const props = {
    title: 'Test title',
    description: 'Test description'
  };

  return <FAQHeading {...Object.assign({}, props, params)} />;
};

describe('FAQHeading', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
