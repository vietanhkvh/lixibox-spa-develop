import { reduxRender } from '../../../../utils/test-utils';
import { render, screen } from '@testing-library/react';
import Tooltip from '..';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));

const component = (params: any = {}) => {
  const props = {
    children: params?.children || <div>Test child node</div>,
    position: params?.position || ('bottom' as const),
    tip: params?.tip || 'Test tip',
    classes: params?.classes
  };

  return <Tooltip {...Object.assign({}, props, params)} />;
};

describe('Tooltip', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });

  test(`renders with children`, () => {
    const textChild = 'Test child node';
    render(component({ children: <div>{textChild}</div> }));
    const e = screen.getByText(textChild);
    expect(e).toBeInTheDocument();
  });

  const position = 'top';
  test(`renders with postion ${position}`, () => {
    render(component({ position: position }));
    const e = document.getElementsByClassName('tooltip');
    expect(e[0].classList).toContain(position);
  });

  test(`renders inner tooltip text`, () => {
    const tip = 'Test tip';
    render(component({ tip: tip }));
    const e = screen.getByText(tip);
    expect(e).toBeInTheDocument();
  });

  test(`renders with classes`, () => {
    const classes = {
      container: 'containerTest',
      tooltip: 'tooltipTest',
      text: 'textTest'
    };
    const dataTest = [
      {
        id: 'container',
        name: 'containerTest'
      },
      {
        id: 'tooltip',
        name: 'tooltipTest'
      },
      {
        id: 'text',
        name: 'textTest'
      }
    ];
    render(component({ classes: classes }));
    const e = document.getElementsByClassName('container')[0];
    expect(e).toBeInTheDocument();
    dataTest.forEach((d) => {
      const child = document.getElementsByClassName(d.id)[0];
      expect(child.classList).toContain(d.name);
    });
  });

  // test(`hover then display tooltip`, () => {
  //   const textChild = 'Test child node';
  //   render(component());
  //   const container = document.getElementsByClassName('container')[0];
  //   const tooltip = container.getElementsByClassName('tooltip')[0];
  //   const e = screen.getByText(textChild);
  //   UserEvent.hover(container);
  //   expect(tooltip).not.toBeVisible();
  // });
});
