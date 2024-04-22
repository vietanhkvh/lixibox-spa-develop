import AnimationClock from '../index';
import { reduxRender } from '../../../../utils/test-utils';

jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
const propDefault = {
  size: 'small',
  icon: { position: 'left', name: { main: 'flash', divide: 'divide' } },
  enable: {
    day: {
      block: true,
      text: false
    },
    hour: {
      block: true,
      text: false
    },
    minute: {
      block: true,
      text: false
    },
    second: {
      block: true,
      text: false
    }
  },
  data: { title: 'Test Title', linked_url: 'http://example.com/link', start_at: 0, end_at: 10443933059 }
};
const component = (params = {}) => {
  const props = { ...propDefault };
  return <AnimationClock {...Object.assign({}, props, params)} />;
};

describe('AnimationClock', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });

  test(`exist url`, () => {
    reduxRender(component(), { initialState: {} });
    const wrapper = document.getElementsByClassName('wrapper')[0];
    expect(wrapper).toHaveAttribute('href', `/${propDefault.data.linked_url}`);
  });
});
