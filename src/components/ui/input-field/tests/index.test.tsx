jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import { VALIDATION } from '../../../../constants/application/global';
import InputField from '../component';

const component = (params = {}) => {
  const props = {
    title: 'Test Field Title',
    placeholder: 'Test Field Placeholder',
    readonly: false,
    type: 'text',
    name: 'test-field',
    id: 'test-field-id',
    value: 'Test Field Value',
    valueCompare: 'Test Field Value',
    errorMessage: 'Test error message',
    icon: 'bell',
    minLen: 1,
    maxLen: 100,
    validate: [VALIDATION.REQUIRED],
    testId: 'input-field',
    isRoundedStyle: true,
    isBigRoundedStyle: false,
    className: '',
    onChange: jest.fn(),
    onFocus: jest.fn(),
    onBlur: jest.fn(),
    onSubmit: jest.fn(),
    isUpperCase: true,
    textAlign: 'center' as const,
    autoFocus: true,
    autoComplete: true,
    isShowError: true
  } as any;

  return <InputField {...Object.assign({}, props, params)} />;
};

describe('InputField', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
