import { reduxRender } from 'utils/test-utils';
import StockStatus, { ItemStatus } from '../index';
import { STOCK_FILTER_OPTIONS } from 'constants/application/filter';
import UserEvent from '@testing-library/user-event';

jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
const user = UserEvent.setup();
const ItemStatusComp = (params?: {}) => {
  const props = {
    item: STOCK_FILTER_OPTIONS[0],
    handleClick: jest.fn(),
    onClickItem: jest.fn()
  };
  return <ItemStatus {...Object.assign({}, props, params)} />;
};
describe('ItemStatus', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(ItemStatusComp(), { initialState: {} });
    }).not.toThrow();
  });

  test(`click`, async () => {
    const handleClickFn = jest.fn();
    const onClickFn = jest.fn();
    reduxRender(ItemStatusComp({ handleClick: handleClickFn, onClickItem: onClickFn }), { initialState: {} });
    const item = document.getElementsByClassName('item')[0];
    await user.click(item);
    expect(handleClickFn).toBeCalledTimes(1);
    expect(onClickFn).toBeCalledTimes(1);
  });
});

const StockStatusComp = () => {
  const props = {
    listStatus: STOCK_FILTER_OPTIONS,
    history: window.history
  };
  return <StockStatus {...props} />;
};
describe('StockStatus', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(StockStatusComp(), { initialState: {} });
    }).not.toThrow();
  });
});
