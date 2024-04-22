jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import MagazineViewMore from '..';

const component = (params = {}) => {
  const props = {
    url: 'https://example.com/url'
  };

  return <MagazineViewMore {...Object.assign({}, props, params)} />;
};

describe('MagazineViewMore', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
