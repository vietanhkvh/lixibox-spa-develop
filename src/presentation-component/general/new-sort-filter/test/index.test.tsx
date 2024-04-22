import { reduxRender } from 'utils/test-utils';
import SortPanel from '../index';
import UserEvent from '@testing-library/user-event';
import { defaultSortList } from 'constants/application/sorting';

jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));

const Component: React.FC<any> = (params = {}) => {
  const props = { defaultList: defaultSortList };
  return <SortPanel {...props} />;
};
const user = UserEvent.setup();
describe('SortPanel', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(<Component />, { initialState: {} });
    }).not.toThrow();
  });
  test(`click sort`, () => {
    reduxRender(<Component />, { initialState: {} });
    const title = document.getElementsByClassName('headingPanel')[0];
    user.click(title);
    const sort = document.getElementsByClassName('sortFilter')[0];
    expect(sort).toBeInTheDocument();
  });
});
