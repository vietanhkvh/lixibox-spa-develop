import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import InstagramModal from '..';
import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';

Modal.setAppElement(document.body.appendChild(document.createElement('div')));

const instagramItem = {
  link: 'https://www.instagram.com/p/BonhEs_FQlb/embed',
  img: CDN_ASSETS_PREFIX('/landing-page/lustre-makeup/instagram01.jpg')
};
const component = (params = {}) => {
  const props = {
    data: {
      data: instagramItem
    }
  };

  return withRouter((routerProps) => <InstagramModal {...Object.assign({}, props, routerProps, params)} />);
};

describe('InstagramModal', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
