jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import DescriptionInfo from '../view';

const color = 'black';
const description = 'description';

const component = (params = {}) => {
  const props = { color, description };

  return <DescriptionInfo {...Object.assign({}, props, params)} />;
};

describe('DescriptionInfo', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });

  describe(`when 'description' is empty`, () => {
    test(`renders null`, () => {
      expect(() => {
        reduxRender(component({ description: '' }), { initialState: {} });
      }).not.toThrow();
    });
  });

  describe(`when 'dottedColor' is provided`, () => {
    test(`renders`, () => {
      expect(() => {
        reduxRender(component({ dottedColor: 'red' }), { initialState: {} });
      }).not.toThrow();
    });
  });

  describe(`when 'backgroundColor' is provided`, () => {
    test(`renders`, () => {
      expect(() => {
        reduxRender(component({ backgroundColor: 'black' }), { initialState: {} });
      }).not.toThrow();
    });
  });
});
