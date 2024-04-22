import Navigations from '../index';
import { reduxRender } from '../../../../utils/test-utils';

import styles from '../style.module.scss';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
const component = (params = {}) => {
  const props = {};

  return <Navigations {...Object.assign({}, props, params)} />;
};

describe('Navigations', () => {
  const user = userEvent.setup();
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });

  test(`renders display cate popup`, () => {
    reduxRender(component(), { initialState: {} });
    const wrapper = document.getElementsByClassName(styles.wrapper)[0];

    user.click(wrapper);
    const popup = document.getElementsByClassName('popupCategory')[0];
    expect(popup).toBeInTheDocument();
  });

  test(`renders display modal`, async () => {
    reduxRender(component(), { initialState: {} });
    const itemModal = document.getElementsByClassName('iconDropdown')[0];

    await user.click(itemModal);
    const popup = document.getElementsByClassName('modal show')[0];
    expect(popup).toBeInTheDocument();
  });

  test(`renders action hidden modal`, async () => {
    reduxRender(component(), { initialState: {} });

    const itemModal = document.getElementsByClassName('iconDropdown')[0];
    await user.click(itemModal);

    const popup = document.getElementsByClassName('modal show')[0];
    expect(popup).toBeInTheDocument();

    // NOTE: Test is commented out as the associated element is temporarily removed
    // const itemOther = screen.getByText('Quà tặng');
    // await user.hover(itemOther);

    // const popupH = document.getElementsByClassName('modal')[0];
    // expect(popupH).not.toHaveClass('show', { exact: true });
  });

  test(`renders action remove selected`, async () => {
    reduxRender(component());
    const eleCates = document.getElementsByClassName('categories')[0];
    await user.click(eleCates);
    const ele = document.getElementsByClassName('.categoryItem .active')[0];
    expect(ele).not.toBeDefined();
  });

  test(`renders navigation title with dynamic data in store`, () => {
    const titleStr = 'Test title';
    reduxRender(component(), { initialState: { cart: { constants: { top_bar_navigation_text: titleStr } } } });
    const hotdealEle = screen.getByText(titleStr);
    expect(hotdealEle).toBeInTheDocument();
  });
});
