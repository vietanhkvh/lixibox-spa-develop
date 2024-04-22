jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import SubmitButton from '../component';

const component = (params = {}) => {
  const props = {
    title: 'Submit',
    size: 'normal',
    color: '#000000',
    icon: 'check',
    iconPosition: 'center',
    align: 'center',
    className: 'submit-button',
    testId: 'submitButton',
    loading: false,
    disabled: false,
    onSubmit: jest.fn(),
    titleClass: 'title',
    type: 'submit'
  } as any;

  return <SubmitButton {...Object.assign({}, props, params)} />;
};

describe('SubmitButton', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
