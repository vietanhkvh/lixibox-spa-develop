jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import NRowList from '../component';

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
    columnWidth: 40,
    maxRowCount: 2,
    entries,
    data: {},
    contentTemplate: Template,
    onMoreClick: jest.fn()
  };

  return <NRowList {...Object.assign({}, props, params)} />;
};

describe('NRowList', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
