jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import MobileScreenHeader from '..';

const component = (params = {}) => {
  const props = {
    title: 'Test title',
    subTitle: 'Test subtitle',
    isShowIcon: true,
    onClick: jest.fn()
  };

  return <MobileScreenHeader {...Object.assign({}, props, params)} />;
};

describe('MobileScreenHeader', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
