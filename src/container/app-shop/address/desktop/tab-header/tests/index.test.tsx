import { withRouter } from 'react-router';
jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import TabHeader from '..';

const tabs = [
  {
    id: 'tab1',
    title: 'Tab 1',
    component: <div>Tab1 component</div>,
    selected: false
  },
  {
    id: 'tab2',
    title: 'Tab 2',
    component: <div>Tab2 component</div>,
    selected: true
  }
];

const component = (params = {}) => {
  const props = {
    tabs,
    currentTab: tabs.find((tab) => tab.selected),
    onChange: jest.fn()
  };

  return withRouter<any, any>(<TabHeader {...Object.assign({}, props, params)} />);
};

describe('TabHeader', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
