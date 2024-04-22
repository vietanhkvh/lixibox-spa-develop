import { render as rtlRender } from '@testing-library/react';
jest.mock('../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { generateHighlightedFragment } from '../highlight';
import '../../utils/jest/expectations';

const component = (params = {}) => {
  const props = {
    segmentToHighlight: '',
    text: ''
  };

  return <div>{generateHighlightedFragment(Object.assign({}, props, params))}</div>;
};

afterEach(() => {
  jest.resetAllMocks();
});

describe('generateHighlightedFragment', () => {
  test('renders', () => {
    expect(() => {
      rtlRender(component());
    }).not.toThrow();
  });

  describe('when text does not contain the search string', () => {
    test('no substring is highlighted', () => {
      const { queryByTestId } = rtlRender(
        component({
          segmentToHighlight: 'jkl',
          text: 'abc def ghi'
        })
      );
      const highlighted = queryByTestId('highlighted-1');
      expect(highlighted).toBeNull();
    });
  });

  describe('when text contains the search string', () => {
    test('no substring is highlighted', () => {
      const { queryByTestId } = rtlRender(
        component({
          segmentToHighlight: 'def',
          text: 'abc def ghi'
        })
      );
      const highlighted = queryByTestId('highlighted-1');
      expect(highlighted).not.toBeNull();
    });
  });

  describe('when text contains the search string multiple times', () => {
    test('all substrings are highlighted', () => {
      const { queryAllByTestId } = rtlRender(
        component({
          segmentToHighlight: 'def',
          text: 'abc def ghi defg'
        })
      );
      const highlighted = queryAllByTestId(/highlighted-\d/);
      expect(highlighted.length).toBe(2);
    });
  });
});
