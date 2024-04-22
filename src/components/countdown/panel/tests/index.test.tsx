jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import Panel from '../component';

const data = { title: 'Test Title', linked_url: 'http://example.com/link' };
const type = 'type';
const size = 'normal';

const component = (params = {}) => {
  const props = { data, type, size };
  return <Panel {...Object.assign({}, props, params)} />;
};

describe('Panel', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
