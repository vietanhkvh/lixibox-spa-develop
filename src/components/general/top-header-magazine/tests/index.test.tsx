import { withRouter } from 'react-router-dom';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import TopHeaderMagazine from '../component';
import { ROUTING_MAGAZINE } from '../../../../routings/path';

const component = (params = {}) => {
  const props = {
    param: ROUTING_MAGAZINE,
    categoryList: [],
    showHideMagazineSearch: jest.fn()
  };

  return withRouter((routerProps) => <TopHeaderMagazine {...Object.assign({}, props, routerProps, params)} />);
};

describe('TopHeaderMagazine', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
