import MiniCategory from '../index';
import { reduxRender } from '../../../../utils/test-utils';
import { testData } from '../component';
import { render } from '@testing-library/react';
import { BrowserRouter, withRouter } from 'react-router-dom';

jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
const component = (params = {}) => {
  const props = {
    menu: testData
  };

  return withRouter((routerProps) => <MiniCategory {...Object.assign({}, props, params, routerProps)} />);
};

describe('MiniCategory', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
  test(`renders sub cate`, () => {
    render(
      <BrowserRouter>
        <MiniCategory menu={testData} />
      </BrowserRouter>
    );
    const sub = document.getElementsByClassName('categoryList')[0];
    expect(sub).toBeInTheDocument();
  });
});
