import { reduxRender } from 'utils/test-utils';
import AuthBlock from '..';

const component = (params = {}) => {
  const props = {
    title: 'Title',
    description: 'Description',
    descriptionVisibility: { mobile: true, desktop: true },
    secondDescription: 'Second description',
    subContainer: () => <div>Sub container</div>,
    mainContainer: () => <div>Main container</div>,
    customMobileTopContainer: () => <div>Custom mobile top container</div>,
    mobileBottomLink: { text: 'Mobile bottom link', link: 'https://www.lixibox.com', linkTitle: 'Link title' },
    referrer: '/',
    isShowMobileTop: false,
    withMobileDescription: true,
    withoutSocialButtons: false,
    socialButtonHint: 'Social button hint'
  };

  return <AuthBlock {...Object.assign({}, props, params)} />;
};

describe('AuthBlock', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
