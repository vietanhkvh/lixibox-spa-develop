jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../utils/test-utils';
import NoContentPlaceholder, { NO_CONTENT_LOGO } from '..';

const component = (params = {}) => {
  const props = {
    className: '',
    logo: NO_CONTENT_LOGO.MISC,
    title: 'Test Title',
    info: 'Test info',
    action: { text: 'Retry' },
    onClick: jest.fn()
  };

  return <NoContentPlaceholder {...Object.assign({}, props, params)} />;
};

describe(`NoContentPlaceholder`, () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
