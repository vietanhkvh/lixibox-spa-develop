import React from 'react';
import { reduxRender } from '../../../../utils/test-utils';
import DesktopFilterAside from '..';
import PriceFilter from '../price';
import BrandFilter from '../brand';
import BrandScroll from '../brand-scroll';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));

const Component: React.FC<any> = (params = {}) => {
  const brandList = [
    {
      id: 'pricefilter',
      template: PriceFilter,
      propsTemplate: { history: window.history, pl: 0, ph: 0, minLimit: 0, maxLimit: 5000 }
    },
    {
      id: 'brandfilter',
      template: BrandFilter,
      propsTemplate: { history: window.history, bids: [], brandList: [] }
    },
    {
      id: 'brandscroll',
      template: BrandScroll,
      propsTemplate: {}
    }
  ];
  const props = {
    list: brandList
  };
  return <DesktopFilterAside {...props} />;
};

describe('DesktopFilterAside', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(<Component />, { initialState: {} });
    }).not.toThrow();
  });
});
