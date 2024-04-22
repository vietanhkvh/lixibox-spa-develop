import { withRouter } from 'react-router';
jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import AddressEntry from '..';

const component = (params = {}) => {
  const props = {
    id: 1,
    title: 'Test title',
    description: 'Test description',
    selectable: true,
    selected: true,
    primary: true,
    actions: [
      {
        type: 'edit',
        name: 'Edit',
        icon: 'lixibox'
      },
      {
        type: 'Delete',
        name: 'Delete',
        icon: 'lixibox',
        confirmation: { message: 'Confirmation message' }
      }
    ],
    onAction: jest.fn()
  };

  return withRouter<any, any>(<AddressEntry {...Object.assign({}, props, params)} />);
};

describe('AddressEntry', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
