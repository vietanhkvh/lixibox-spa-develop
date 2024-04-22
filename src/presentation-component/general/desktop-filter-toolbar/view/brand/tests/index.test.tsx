jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import { SearchBrand, SelectList, SelectListItem, BrandPanel } from '..';

const brands = [
  {
    brand_id: 824,
    brand_slug: 'le-coon',
    brand_name: 'LE COON',
    brand_logo: 'https://upload.lixibox.com/system/brands/brand_images/000/000/824/original/download.png',
    count: 22
  },
  {
    brand_id: 816,
    brand_slug: 'lullaby',
    brand_name: 'Lullaby',
    brand_logo: 'https://upload.lixibox.com/system/brands/brand_images/000/000/816/original/logo.png',
    count: 11
  },
  {
    brand_id: 808,
    brand_slug: 'lion-bear',
    brand_name: 'Lion Bear',
    brand_logo: '/images/original/missing.png',
    count: 1
  }
];

const searchBrandComponent = (params = {}) => {
  const props = {
    onChange: jest.fn()
  };

  return <SearchBrand {...Object.assign({}, props, params)} />;
};

describe('SearchBrand', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(searchBrandComponent(), { initialState: {} });
    }).not.toThrow();
  });
});

const selectListComponent = (params = {}) => {
  const props = {
    selectedBrand: [brands[0].brand_slug],
    list: brands,
    type: 'row',
    onClick: jest.fn(),
    onSubmit: jest.fn(),
    onReset: jest.fn()
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
  const item = brands[0];
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
    brandList: brands,
    isOpenBrand: true,
    onClickOverlay: jest.fn(),
    onSelectBrand: jest.fn(),
    searchBrandValue: brands[0].brand_name,
    selectedBrand: [brands[0].brand_slug],
    onSearchBrand: jest.fn(),
    onSubmit: jest.fn(),
    onReset: jest.fn()
  };

  return <BrandPanel {...Object.assign({}, props, params)} />;
};

describe('BrandPanel', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(brandPanelComponent(), { initialState: {} });
    }).not.toThrow();
  });
});
