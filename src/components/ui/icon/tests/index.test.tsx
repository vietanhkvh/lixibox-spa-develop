jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import Icon from '../component';

const component = (params = {}) => {
  const props = {
    name: 'logo-line',
    onClick: jest.fn(),
    onEnter: jest.fn(),
    onLeave: jest.fn()
  };

  return <Icon {...Object.assign({}, props, params)} />;
};

describe('Icon', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
