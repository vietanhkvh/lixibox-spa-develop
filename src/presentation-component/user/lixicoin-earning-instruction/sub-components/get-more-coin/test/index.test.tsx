import { reduxRender } from 'utils/test-utils';
import GetMoreCoin from '..';

const component = (params = {}) => {
  const props = {
    coinSavingStep: [
      {
        link: '/',
        icon: 'lixibox',
        iconWidth: 24,
        title: 'Step 1',
        content: [
          {
            text: 'Step 1 content',
            isBold: false
          },
          {
            text: 'Step 2 content',
            isBold: true
          }
        ]
      }
    ]
  };

  return <GetMoreCoin {...Object.assign({}, props, params)} />;
};

describe('GetMoreCoin', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
