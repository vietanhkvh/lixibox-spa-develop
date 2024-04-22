jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import VerticalCarousel from '..';

const component = (params = {}) => {
  const Template = ({ name }) => <div>{name}</div>;
  const props = {
    data: [
      {
        id: 'carousel-1',
        name: 'Carousel 1'
      },
      {
        id: 'carousel-2',
        name: 'Carousel 2'
      },
      {
        id: 'carousel-3',
        name: 'Carousel 3'
      }
    ],
    height: 500,
    template: Template,
    interval: 10
  };

  return <VerticalCarousel {...Object.assign({}, props, params)} />;
};

describe('VerticalCarousel', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
