import Expander from '..';

const component = (params = {}) => {
  const props = {
    children: <div>Dummy Data</div>,
    height: 100
  };

  return <Expander {...Object.assign({}, props, params)} />;
};

describe('Expander', () => {
  test(`renders`, () => {
    expect(() => {
      component();
    }).not.toThrow();
  });
});
