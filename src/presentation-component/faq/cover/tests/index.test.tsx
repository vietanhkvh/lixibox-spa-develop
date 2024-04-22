jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import FAQCover from '..';

const component = (params = {}) => {
  const props = {};

  return <FAQCover {...Object.assign({}, props, params)} />;
};

describe('FAQCover', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
