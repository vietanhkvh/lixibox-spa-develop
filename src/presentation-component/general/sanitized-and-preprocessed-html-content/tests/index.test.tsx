jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import SanitizedAndPreprocessedHTMLContent from '..';

const component = (params = {}) => {
  const props = {
    content: '',
    className: '',
    style: {},
    isDetectLink: false,
    detectLinkTarget: '',
    isReplaceVideoEmbed: false,
    isSantitizeHtml: true,
    onError: jest.fn()
  };

  return <SanitizedAndPreprocessedHTMLContent {...Object.assign({}, props, params)} />;
};

describe('SanitizedAndPreprocessedHTMLContent', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
