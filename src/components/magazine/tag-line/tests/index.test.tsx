jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import MagazineTagLine from '..';

const component = (params = {}) => {
  const props = {
    title: 'Test title'
  };

  return <MagazineTagLine {...Object.assign({}, props, params)} />;
};

describe('MagazineTagLine', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
