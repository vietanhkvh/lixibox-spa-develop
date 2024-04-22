import { withRouter } from 'react-router-dom';
jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import View from '..';

const component = (params = {}) => {
  const props = {
    code: 'CODEABC',
    balance: 123456,
    lixicoin: 200,
    benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'],
    notes: ['Note 1', 'Note 2', 'Note 3'],
    genericNote: 'Generic note',
    onCopy: jest.fn(),
    onButtonSubmit: jest.fn()
  } as any;

  return withRouter((routerProps) => <View {...Object.assign({}, props, routerProps, params)} />);
};

describe('View', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
