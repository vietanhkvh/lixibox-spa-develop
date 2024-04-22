jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import Clock from '../component';

const day = 1;
const hour = 1;
const minute = 1;
const second = 1;
const size = 'normal';

const component = (params = {}) => {
  const props = { day, hour, minute, second, size };

  return <Clock {...Object.assign({}, props, params)} />;
};

describe('Clock', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
