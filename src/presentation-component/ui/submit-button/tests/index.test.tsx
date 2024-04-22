import { render, screen } from '@testing-library/react';
import { reduxRender } from '../../../../utils/test-utils';
import SubmitButton from '../component';
import userEvent from '@testing-library/user-event';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
const testId = { name: 'submit-btn-', id: 'test' };
const testIdStr = `${testId.name}${testId.id}`;
const component = (params: any = {}) => {
  const props = {
    title: 'Submit test btn',
    icon: { name: 'check', position: 'left' as const },
    color: 'red',
    size: params?.size,
    disabled: params?.disabled,
    loading: params?.loading,
    type: params?.type,
    id: params?.id,
    classes: params?.classes,
    testId: testId,
    link: { to: 'https://www.lixibox.com', target: 'https://www.lixibox.com' },
    onSubmit: params?.handleSubmit
  };

  return <SubmitButton {...Object.assign({}, props, params)} />;
};

describe('SubmitButton', () => {
  const user = userEvent;
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });

  test('renders with title', () => {
    render(component());
    const btn = screen.getByTestId(testIdStr);
    expect(btn).toBeInTheDocument();
  });

  // test('renders with icon', () => {
  //   render(component({ loading: false }));
  //   const btn = screen.getByTestId(testIdStr + 1);
  //   expect(btn).toBeInTheDocument();
  // });

  test('renders as color red', () => {
    render(component());
    const btn = screen.getByTestId(testIdStr);
    expect(btn.classList).toContain('color-red');
  });

  test('renders as size normal', () => {
    render(component({ size: 'normal' }));
    const btn = screen.getByTestId(testIdStr);
    expect(btn.classList).toContain('buttonNormal');
  });

  test('renders as be disabled', async () => {
    const handleSubmit = jest.fn();
    render(component({ disabled: true, onSubmit: handleSubmit }));
    const btn = screen.getByTestId(testIdStr);
    expect(btn.classList).toContain('isDisabled');

    await user.click(btn);
    expect(handleSubmit).toBeCalledTimes(0);
  });

  test('render as be loading', async () => {
    const handleSubmit = jest.fn();
    render(component({ loading: true, onSubmit: handleSubmit }));
    const btn = screen.getByTestId(testIdStr);
    expect(btn.classList).toContain('isLoading');

    await user.click(btn);
    expect(handleSubmit).toBeCalledTimes(0);
  });

  test('renders as force-link', () => {
    render(component({ type: 'force-link' }));
    const btn = screen.getByTestId(testIdStr);
    expect(btn).toHaveAttribute('to');
    expect(btn).toHaveAttribute('target');
  });

  test('renders as link', () => {
    reduxRender(component({ type: 'link' }), { initialState: {} });
    const btn = screen.getByTestId(testIdStr);
    expect(btn).toHaveAttribute('href');
    expect(btn).toHaveAttribute('target');
  });

  test('renders as submit btn', async () => {
    const handleSubmit = jest.fn();
    render(component({ type: 'submit', onSubmit: handleSubmit, loading: false, disabled: false }));
    const btn = screen.getByTestId(testIdStr);
    expect(btn.classList).toContain('submitButton');

    await user.click(btn);
    expect(handleSubmit).toBeCalledTimes(1);
  });

  test('renders with classes', () => {
    const classes = { container: 'container-classes-test' };
    render(component({ classes: classes }));
    const btn = screen.getByTestId(testIdStr);
    expect(btn.classList).toContain(classes.container);
  });
});
