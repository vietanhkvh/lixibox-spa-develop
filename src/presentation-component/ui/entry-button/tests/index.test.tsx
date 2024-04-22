jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import EntryButton from '..';

const component = (params = {}) => {
  const props = {
    title: 'Test title',
    value: '',
    placeholder: 'Test placeholder',
    disabled: false,
    loading: false,
    upperCaseOnly: true,
    onChange: jest.fn(),
    onSubmit: jest.fn()
  };

  return <EntryButton {...Object.assign({}, props, params)} />;
};

describe('EntryButton', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
