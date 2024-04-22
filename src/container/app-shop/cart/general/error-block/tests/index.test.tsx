import { withRouter } from 'react-router-dom';
jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import ErrorBlock from '../';

const component = (params = {}) => {
  const props = {
    children: <div>Test child node</div>,
    interactive: true,
    onClick: jest.fn()
  };

  return withRouter((routerProps) => <ErrorBlock {...Object.assign({}, props, routerProps, params)} />);
};

describe('ErrorBlock', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
