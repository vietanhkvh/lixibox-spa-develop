import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { reduxRender } from '../../../../utils/test-utils';
import List from '../component';
jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
const listData = [
  { id: 'edit', testId: { name: 'edit-test-id' }, title: 'Edit', icon: 'edit', data: { entry1: 'entry1 val' } },
  { id: 'delete', testId: { name: 'detele-test-id' }, title: 'Delete', icon: 'trash', data: { entry2: 'entry2 val' } }
];
const component = (params: any = {}) => {
  const props = {
    list: params?.list,
    data: { entryx: 'entryx val' },
    onClick: params?.hanldeOnClick
  };

  return <List {...Object.assign({}, props, params)} />;
};

describe('List', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component({ list: listData }), { initialState: {} });
    }).not.toThrow();
  });
  test('renders with data list', () => {
    render(component({ list: listData }));
    listData.forEach((l) => {
      const e = screen.getByTestId(l.testId.name);
      expect(e).toBeInTheDocument();
    });
  });
  test('renders with handle click', async () => {
    const hanldeOnClick = jest.fn();
    render(component({ list: listData, hanldeOnClick: hanldeOnClick }));
    listData.forEach(async (l, index) => {
      const e = screen.getByTestId(l.testId.name);
      await UserEvent.click(e);
      expect(hanldeOnClick).toBeCalledTimes(index + 1);
    });
  });
});
