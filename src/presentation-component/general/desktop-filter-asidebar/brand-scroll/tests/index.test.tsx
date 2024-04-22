import React, { useRef } from 'react';
import { reduxRender } from 'utils/test-utils';
import BrandScroll, { BrandList, brandRaw, IndexAlphabet } from '..';
jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
const IndexAlphabetComp = () => {
  const props = {
    list: [],
    handleScrollView: jest.fn()
  };
  return <IndexAlphabet {...props} />;
};
describe('IndexAlphabet', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(IndexAlphabetComp(), { initialState: {} });
    }).not.toThrow();
  });
});

const BrandListComp: React.FC<any> = () => {
  const brandRef = useRef<any>([]);
  const combinedBrands =
    brandRaw.length &&
    brandRaw.map((item, index) => {
      const key = Object.keys(item)[0];
      return {
        id: key,
        title: key,
        content: item[key]
      };
    });
  const props = {
    brands: combinedBrands,
    height: 500,
    setHoverID: jest.fn(),
    hoverID: '#',
    ref: brandRef
  };

  return <BrandList {...props} />;
};
describe('BrandList', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(<BrandListComp />, { initialState: {} });
    }).not.toThrow();
  });
});

const BrandScrollComp = () => {
  const props = {
    brandsList: brandRaw
  };
  return <BrandScroll {...props} />;
};

describe('BrandScroll', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(BrandScrollComp(), { initialState: {} });
    }).not.toThrow();
  });
});
