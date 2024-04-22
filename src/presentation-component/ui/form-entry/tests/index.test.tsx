jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import FormEntry from '..';

const component = (params = {}) => {
  const props = {
    name: 'testField',
    id: '123',
    title: 'Test title',
    error: '',
    select: true,
    focus: true,
    required: true,
    autoFocus: true,
    visibilityDelay: 0,
    theme: 'rounded' as const
  };

  return <FormEntry {...Object.assign({}, props, params)} />;
};

describe('FormEntry', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
