jest.mock('../../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../../../utils/test-utils';
import TabView from '..';

const tabEntries = [
  {
    id: 1,
    name: 'Tab name 1',
    component: <div>Tab component 1</div>
  },
  {
    id: 2,
    name: 'Tab name 2',
    component: <div>Tab component 2</div>
  }
];

const component = (params = {}) => {
  const props = {
    entries: tabEntries,
    initialEntryId: 1
  };

  return <TabView {...Object.assign({}, props, params)} />;
};

describe('TabView', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
