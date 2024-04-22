import { withRouter } from 'react-router-dom';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import { APP_VERSION } from '../../../../constants/application/global';
import ProductPrice from '..';

const component = (params = {}) => {
  const props = {
    currentPrice: 600,
    oldPrice: 605,
    coinsPrice: 500,
    currencyFormatType: 'currency',
    version: APP_VERSION.MOBILE
  };

  return withRouter((routerProps) => <ProductPrice {...Object.assign({}, props, routerProps, params)} />);
};

describe('ProductPrice', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
