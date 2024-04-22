import { reduxRender } from 'utils/test-utils';
import ContextMenu from '..';

const component = (params = {}) => {
  const props = {
    entries: [
      {
        id: 1,
        type: 'add',
        name: 'Test name 1',
        icon: 'lixibox'
      },
      {
        id: 2,
        type: 'edit',
        name: 'Test name 2',
        icon: 'lixibox'
      }
    ],
    onSelect: jest.fn(),
    onRequestClose: jest.fn()
  };

  return <ContextMenu {...Object.assign({}, props, params)} />;
};

describe('ContextMenu', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
