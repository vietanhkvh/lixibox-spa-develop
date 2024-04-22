jest.mock('../../../../app/init-react-app', () => ({
  store: {
    getState: jest.fn(),
    dispatch: jest.fn(),
    subscribe: jest.fn()
  }
}));
import { render, fireEvent } from '@testing-library/react';
import DiscountBlock from '..';

const className = 'discount-block';
const size = 3;
const style = {};
const innerStyle = {};
const dottedColor = 'red';
const backgroundColor = 'white';
const component = (params = {}) => {
  const props = {
    className,
    size,
    style,
    innerStyle,
    dottedColor,
    backgroundColor
  };

  return <DiscountBlock {...Object.assign({}, props, params)} />;
};

describe(`DiscountBlock`, () => {
  describe(`children prop`, () => {
    describe(`when 'children' present`, () => {
      test(`renders with children`, () => {
        const { getByText } = render(component({ children: 'Text' }));
        expect(getByText('Text')).toBeVisible();
      });
    });

    describe(`when 'children' is absent`, () => {
      test(`renders without error`, () => {
        expect(() => {
          render(component());
        }).not.toThrow();
      });
    });
  });

  describe(`'onClick' prop`, () => {
    describe(`when provided`, () => {
      test(`click on component triggers 'onClick'`, () => {
        const onClick = jest.fn();
        const { getByText } = render(component({ children: 'Text', onClick }));
        fireEvent.click(getByText('Text'));
        expect(onClick).toHaveBeenCalledTimes(1);
      });
    });

    describe(`when not provided`, () => {
      test(`click on component triggers 'onClick'`, () => {
        expect(() => {
          const { getByText } = render(component({ children: 'Text' }));
          fireEvent.click(getByText('Text'));
        }).not.toThrow();
      });
    });
  });
});
