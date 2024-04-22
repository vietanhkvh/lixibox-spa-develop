import { reduxRender } from '../../../../utils/test-utils';
import Image from '..';

const component = (params: any = {}) => {
  const props = {
    alt: 'test',
    src: 'test'
  };
  return <Image {...Object.assign({}, props, params)} />;
};
describe('Image', () => {
  test(`Renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
