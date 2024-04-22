jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import { PriceRange, SelectList, SelectListItem, PricePanel } from '..';

const priceRange = [
  { ph: 100, pl: 0, title: '0 - 100k' },
  { ph: 500, pl: 100, title: '100k - 500k' },
  { ph: 1000, pl: 500, title: '500k - 1tr' },
  { ph: 2000, pl: 1000, title: '1tr - 2tr' },
  { ph: 5000, pl: 2000, title: '2tr - 5tr' }
];

const priceRangeComponent = (params = {}) => {
  const props = {
    inputMinPrice: 0,
    inputMaxPrice: 100,
    handleInputOnChange: jest.fn(),
    validationValue: '',
    setValidationValue: jest.fn()
  };

  return <PriceRange {...Object.assign({}, props, params)} />;
};

describe('PriceRange', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(priceRangeComponent(), { initialState: {} });
    }).not.toThrow();
  });
});

const selectListComponent = (params = {}) => {
  const props = {
    list: priceRange,
    type: 'row',
    onClick: jest.fn()
  };

  return <SelectList {...Object.assign({}, props, params)} />;
};

describe('SelectList', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(selectListComponent(), { initialState: {} });
    }).not.toThrow();
  });
});

const selectListItemComponent = (params = [], thisContext = {}) => {
  const item = priceRange[0];
  const index = 0;
  const props = [item, index];
  const _thisContext = {
    onClick: jest.fn()
  };

  return SelectListItem.call(Object.assign({}, _thisContext, thisContext), ...props, ...params);
};

describe('SelectListItem', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(selectListItemComponent(), { initialState: {} });
    }).not.toThrow();
  });
});

const brandPanelComponent = (params = {}) => {
  const props = {
    isOpenPrice: true,
    onClickOverlay: jest.fn(),
    minPrice: 0,
    maxPrice: 5000,
    inputMinPrice: 0,
    inputMaxPrice: 5000,
    handleInputOnChange: jest.fn(),
    handleSelectPriceRange: jest.fn(),
    onReset: jest.fn(),
    onSubmit: jest.fn(),
    isShowBrandsFilter: true
  };

  return <PricePanel {...Object.assign({}, props, params)} />;
};

describe('PricePanel', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(brandPanelComponent(), { initialState: {} });
    }).not.toThrow();
  });
});
