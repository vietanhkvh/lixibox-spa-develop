jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import NRowListDynamicSize from '../component';

const entries = [
  { name: 'test1' },
  { name: 'test2' },
  { name: 'test3' },
  { name: 'test4' },
  { name: 'test5' },
  { name: 'test6' },
  { name: 'test7' },
  { name: 'test8' },
  { name: 'test9' }
];
const Template = ({ name }) => <div>{name}</div>;

const component = (params = {}) => {
  const props = {
    maxRowCount: 2,
    entries,
    data: {},
    contentTemplate: Template,
    moreWidth: 40,
    onMoreClick: jest.fn()
  };

  return <NRowListDynamicSize {...Object.assign({}, props, params)} />;
};

describe('NRowListDynamicSize', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
