import { reduxRender } from 'utils/test-utils';
import FadedInSlider from '../component';

const component = (params = {}) => {
  const Item = ({ item, onClick }) => <div onClick={onClick}>{`item ${item?.value}`}</div>;
  const props = {
    templateProps: { key: 'test-faded-in-item' },
    template: Item,
    listItems: [...Array(10)].map((_, index) => ({ value: index }))
  };
  return <FadedInSlider {...Object.assign({}, props, params)} />;
};
describe(`FadedInSlider`, () => {
  test(`render`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
