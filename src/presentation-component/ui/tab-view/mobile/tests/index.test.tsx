import { render, fireEvent } from '@testing-library/react';
jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import TabView from '..';

const entries = [
  {
    id: 'id1',
    name: 'Tab 1',
    data: {},
    active: false
  },
  {
    id: 'id2',
    name: 'Tab 2',
    data: {},
    active: true
  }
];
const component = (params = {}) => {
  const props = {
    entries,
    children: <div />,
    onChange: jest.fn()
  };

  return <TabView {...Object.assign({}, props, params)} />;
};

describe(`TabView`, () => {
  describe(`children prop`, () => {
    describe(`when 'children' present`, () => {
      test(`renders with children`, () => {
        const { getByText } = render(component({ children: (props) => <div>Text</div> }));
        expect(getByText('Text')).toBeVisible();
      });
    });

    describe(`when 'children' is absent`, () => {
      test(`renders without error`, () => {
        expect(() => {
          render(component({ children: undefined }));
        }).not.toThrow();
      });
    });
  });

  describe(`'onChange' prop`, () => {
    describe(`when provided`, () => {
      test(`click on component triggers 'onChange'`, () => {
        const onChange = jest.fn();
        const { getByText } = render(component({ children: (props) => <div>Text</div>, onChange }));
        fireEvent.click(getByText(entries[0].name));
        expect(onChange).toHaveBeenCalledTimes(1);
      });
    });

    describe(`when not provided`, () => {
      test(`click on component triggers 'onChange'`, () => {
        expect(() => {
          const { getByText } = render(component({ children: (props) => <div>Text</div> }));
          fireEvent.click(getByText(entries[0].name));
        }).not.toThrow();
      });
    });
  });

  describe('Classes prop', () => {
    const classes = [
      { id: 'container', name: 'containerClass', data: { container: 'containerClass' } },
      { id: 'header', name: 'headerClass', data: { header: 'headerClass' } },
      { id: 'body', name: 'bodyClass', data: { body: 'bodyClass' } },
      { id: 'headerEntry', name: 'headerEntry', data: { headerEntry: 'headerEntry' } }
    ];
    classes.forEach((i, index) =>
      test(`${i.id} is provided`, () => {
        render(component({ children: (props) => <div>Text</div>, classes: i.data }));
        const e = document.getElementsByClassName(i?.name);
        expect(e[0]).toBeInTheDocument();
      })
    );
  });
});
