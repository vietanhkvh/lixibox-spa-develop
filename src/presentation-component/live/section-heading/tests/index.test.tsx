jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import LiveSectionHeading from '..';

const component = (params = {}) => {
  const props = {
    title: 'Test section heading',
    actionTitle: 'Test Action',
    onClickActionTitle: jest.fn(),
    iconName: 'lixibox',
    onClickIcon: jest.fn()
  };

  return <LiveSectionHeading {...Object.assign({}, props, params)} />;
};

describe('LiveSectionHeading', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
