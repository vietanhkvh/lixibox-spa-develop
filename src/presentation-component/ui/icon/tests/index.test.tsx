import { screen, render } from '@testing-library/react';
import { reduxRender } from '../../../../utils/test-utils';
import Icon from '../index';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
const testId = { name: 'icon', id: 'test' };
const testIdStr = `${testId.name}-${testId.id}`;
const link = 'https://www.lixibox.com/';
const component = (params: any = {}) => {
  const props = {
    id: 'icon-id-test',
    name: 'add',
    className: params?.className,
    testId: testId,
    onClick: jest.fn(),
    type: params?.type,
    link: link
  };
  return <Icon {...Object.assign({}, props, params)} />;
};
describe('Icon', () => {
  test(`Renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });

  test('renders as type link ', () => {
    reduxRender(component({ type: 'link' }), { initialState: {} });

    const e = screen.getByTestId(testIdStr);
    expect(e).toBeInTheDocument();
    expect(e).toHaveAttribute('href', `/${link}`);
  });

  test('renders as type icon ', () => {
    render(component());

    const e = screen.getByTestId(testIdStr);
    expect(e).toBeInTheDocument();
    expect(e).toBeVisible();
  });

  test('renders with className', () => {
    const className = 'icon-classname-test';

    reduxRender(component({ className: className, type: 'link' }), { initialState: {} });
    const e = screen.getAllByTestId(testIdStr);
    e.forEach((element) => {
      expect(element).toHaveClass(className);
    });
  });

  // test('renders with click function', () => {
  //   const handleClick = jest.fn();
  //   render(component({ testId: 'iconTestId', name: 'add', onclick: handleClick, type: 'normal' }));
  //   const e = screen.getByTestId(testIdStr + 1);
  //   user.click(e);
  //   expect(handleClick).toBeCalledTimes(1);
  // });
  // test('renders as link with click function', () => {
  //   const handleClick = jest.fn();
  //   render(<Routers>{component({ handleClick: handleClick, type: 'link' })}</Routers>);
  //   const e = screen.getByTestId(testIdStr);
  //   user.click(e);
  //   expect(handleClick).toBeCalledTimes(1);
  // });
  // test('render svg', () => {
  //   render(
  //     <svg
  //       data-testid="svg-test"
  //       viewBox="0 0 50 50"
  //       version="1.1"
  //       xmlns="http://www.w3.org/2000/svg"
  //       xmlnsXlink="http://www.w3.org/1999/xlink"
  //     >
  //       <path
  //         d="M14.5841911,26.4117842 L32.5587969,44.3804149 C33.3475106,45.1671369 34.6253529,45.1671369 35.4160583,44.3804149 C36.204772,43.5936929 36.204772,42.3158506 35.4160583,41.5291286 L18.8671787,24.9862241 L35.4140666,8.4433195 C36.2027803,7.65659751 36.2027803,6.37875519 35.4140666,5.59004149 C34.6253529,4.8033195 33.3455189,4.8033195 32.5568052,5.59004149 L14.5821994,23.5585062 C13.8056019,24.3370954 13.8056019,25.6350207 14.5841911,26.4117842 Z"
  //         id=""
  //       ></path>
  //     </svg>
  //   );
  //   const e = screen.getByTestId('svg-test');
  //   expect(e).toHaveAttribute('fdsf');
  // });
});
