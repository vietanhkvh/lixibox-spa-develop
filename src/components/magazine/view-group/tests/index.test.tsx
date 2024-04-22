jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import MagazineViewGroup from '..';

const component = (params = {}) => {
  const props = {
    txtView: 'Test text',
    txtTime: '01/01/2021'
  };

  return <MagazineViewGroup {...Object.assign({}, props, params)} />;
};

describe('MagazineViewGroup', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
