import { reduxRender } from '../../../../utils/test-utils';
import { VALIDATION } from '../../../../constants/application/global';
import InputField from '../component';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));

const testId = { name: 'input-field-', id: 'test' };
const testIdStr = testId.name + testId.id;
const component = (params: any = {}) => {
  const props = {
    title: params?.title,
    placeholder: 'Test Field Placeholder',
    readOnly: params?.readOnly,
    type: params?.type,
    name: 'test-field',
    id: 'test-field-id',
    value: params?.value,
    error: { message: 'Test error message' },
    icon: params?.icon,
    minLength: 1,
    maxLength: 100,
    validate: [VALIDATION.REQUIRED],
    testId: testId,
    isRoundedStyle: params?.isRoundedStyle,
    isBigRoundedStyle: false,
    className: '',
    onChange: params?.onChange,
    onFocus: params?.onFocus,
    onBlur: params?.onBlur,
    onSubmit: jest.fn(),
    isUpperCase: true,
    textAlign: 'center' as const,
    autoFocus: true,
    autoComplete: 'true'
  };

  return <InputField {...Object.assign({}, props, params)} />;
};

describe('InputField', () => {
  const user = userEvent.setup();
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });

  test('renders as number type', () => {
    render(component({ type: 'number', value: 5 }));
    const input = screen.getByTestId(testIdStr);
    expect(input).toHaveValue(5);
  });

  test('renders as text type', () => {
    const str = 'text';
    render(component({ type: 'text', value: str }));
    const input = screen.getByTestId(testIdStr);
    expect(input).toHaveValue(str);
  });

  test('renders with title', () => {
    const title = 'Title Test';
    render(component({ type: 'text', title: title, isRoudedStyle: false }));
    const element = screen.getByText('Title Test');
    expect(element).toBeInTheDocument();
    expect(element.classList).toContain('title');
    expect(element.classList).toContain('titleError');
  });

  test('renders with icon', () => {
    const { container } = render(component({ type: 'text', icon: 'bell' }));
    const element = container.querySelector('.icon-bell') as HTMLElement;
    expect(element).toBeInTheDocument();
  });

  test('renders with error message', () => {
    render(component({ type: 'text' }));
    const element = screen.getByText('Test error message');
    expect(element).toBeInTheDocument();
    expect(element.classList).toContain('errorVisible');
  });

  test('renders with readOnly attribute', async () => {
    render(component({ type: 'text', readOnly: true }));
    const element = screen.getByTestId(testIdStr);
    await user.type(element, 'should not allow editing');
    expect(element).toHaveValue('');
  });

  //-------------------------------event
  test('onChange function is fired', async () => {
    const valExpected = 'changed';
    const onChange = jest.fn();
    render(component({ type: 'text', onChange: onChange }));
    const input = screen.getByTestId(testIdStr);

    await user.type(input, valExpected);

    expect(input).toHaveValue(valExpected);
    expect(onChange).toBeCalledTimes(valExpected.length);
  });
  test('onForcus function is fired', async () => {
    const onFocus = jest.fn();
    const { container } = render(component({ type: 'text', onFocus: onFocus, isRoundedStyle: false }));
    const lineFocusedE = container.querySelector('.lineFocused') as HTMLElement;
    expect(lineFocusedE).toBeInTheDocument();

    const input = screen.getByTestId(testIdStr);

    await user.hover(input);
    expect(onFocus).toBeCalled();

    await input.focus();
    expect(input).toHaveFocus();
  });
  test('onBlur function is fired', async () => {
    const onBlur = jest.fn();
    const { container } = render(
      component({ type: 'text', title: 'Test Title', onBlur: onBlur, isRoundedStyle: false })
    );
    const input = screen.getByTestId(testIdStr);

    input.blur();
    expect(input).not.toHaveFocus();

    await user.click(input);
    await user.click(document.body);
    expect(onBlur).toBeCalled();

    const titleDivE = container.querySelector('.title');
    expect(titleDivE).toBeInTheDocument();
    expect(titleDivE).toHaveClass('titleOnInput');
  });
});
