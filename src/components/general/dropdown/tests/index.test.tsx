jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import Dropdown from '../component';

const visible = true;
const section = 'left' as const;
const _component = <div />;

const component = (params = {}) => {
  const props = {
    visible,
    section,
    compact: _component
  };

  return <Dropdown {...Object.assign({}, props, params)} />;
};

describe('Dropdown', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
