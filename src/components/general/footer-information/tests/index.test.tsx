jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import FooterInformation from '../component';

const referalCode = 'RJ30RNNR0';
const phone = '0341011001';
const openModal = jest.fn();

const component = (params = {}) => {
  const props = {
    referalCode,
    phone,
    openModal
  };

  return <FooterInformation {...Object.assign({}, props, params)} />;
};

describe('FooterInformation', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
