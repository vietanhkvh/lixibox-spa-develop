import { reduxRender } from 'utils/test-utils';
import { PriceItem, PriceFilter, priceDefault } from '..';

jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));

const PriceItemComp = () => {
  return <PriceItem item={priceDefault(0, 5000, 0, 0)[0]} />;
};
describe('PriceItem', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(PriceItemComp(), { initialState: {} });
    }).not.toThrow();
  });
});

const PriceFilterComp = () => {
  const props = {
    prices: priceDefault(0, 5000, 0, 0),
    onSubmit: jest.fn(),
    history: window.history
  };
  return <PriceFilter {...props} />;
};
describe('PriceFilter', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(PriceFilterComp(), { initialState: {} });
    }).not.toThrow();
  });
});
