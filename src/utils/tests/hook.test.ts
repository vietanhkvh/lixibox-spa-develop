import { renderHook } from '@testing-library/react-hooks';
import { useLocation } from 'react-router-dom';
jest.mock('../../app/init-react-app', () => ({
  store: { getState: jest.fn().mockReturnValue({}) }
}));
import { useCombinedRefs, usePrevious, useSearchParamsChangeEffect } from '../hook';

describe('usePrevious', () => {
  describe(`when fetched for the first time`, () => {
    test(`'null' is returned`, () => {
      let testVal = 'old';
      const { result } = renderHook(() => usePrevious(testVal));
      expect(result.current).toEqual(undefined);
    });
  });

  describe(`when fetched after an state update`, () => {
    test(`previous state value is returned`, () => {
      let testVal = 'old';
      const { result, rerender } = renderHook(() => usePrevious(testVal));
      expect(result.current).toEqual(undefined);

      testVal = 'new';
      rerender();
      expect(result.current).toEqual('old');

      testVal = 'latest';
      rerender();
      expect(result.current).toEqual('new');
    });
  });
});

describe('useCombinedRef', () => {
  describe(`for a single 'ref'`, () => {
    describe(`on initial render`, () => {
      describe(`when the 'ref' is 'null'`, () => {
        test(`arg 'ref' remains unchanged`, () => {
          let testVal = undefined;
          const { result } = renderHook(() => useCombinedRefs(testVal));
          expect(testVal).toEqual(undefined);
          expect(result.current.current).toEqual(null);
        });
      });

      describe(`when the 'ref' is not empty`, () => {
        test(`[Empty internal ref] arg 'ref' is assigned internal ref`, () => {
          let testVal = { current: 'val' };
          const { result } = renderHook(() => useCombinedRefs(testVal));
          expect(testVal).toEqual({ current: null });
          expect(result.current.current).toEqual(null);
        });

        test(`[Non-empty internal ref] arg 'ref' is assigned internal ref`, () => {
          let testVal = { current: 'val' };
          const { result, rerender } = renderHook(() => useCombinedRefs(testVal));
          result.current.current = 'internalRefVal';
          rerender();
          expect(testVal).toEqual({ current: 'internalRefVal' });
          expect(result.current.current).toEqual('internalRefVal');
        });
      });

      describe(`when the 'ref' is a function`, () => {
        test(`arg 'ref' is invoked with internal ref`, () => {
          let testVal = jest.fn();
          const { result, rerender } = renderHook(() => useCombinedRefs(testVal));
          expect(testVal).toHaveBeenCalledWith(null);

          result.current.current = 'internalRefVal';
          rerender();
          expect(testVal).toHaveBeenCalledWith('internalRefVal');
        });
      });
    });

    describe(`on subsequent render`, () => {
      describe(`if arg 'ref' remains unchanged`, () => {
        test(`arg 'ref' is not updated`, () => {
          let testVal = { current: 'val' };
          const { result, rerender } = renderHook(() => useCombinedRefs(testVal));
          expect(testVal).toEqual({ current: null });
          expect(result.current.current).toEqual(null);

          rerender();
          expect(testVal).toEqual({ current: null });
          expect(result.current.current).toEqual(null);
        });
      });

      describe(`if arg 'ref' is changed, and is 'null'`, () => {
        test(`arg 'ref' remains unchanged`, () => {
          let testVal = { current: 'val' };
          const { result, rerender } = renderHook(() => useCombinedRefs(testVal));
          expect(testVal).toEqual({ current: null });
          expect(result.current.current).toEqual(null);

          testVal = null;
          rerender();
          expect(testVal).toEqual(null);
          expect(result.current.current).toEqual(null);
        });
      });

      describe(`if arg 'ref' is changed, and is not empty`, () => {
        test(`arg 'ref' is assigned internal ref`, () => {
          let testVal = undefined;
          const { result, rerender } = renderHook(() => useCombinedRefs(testVal));
          expect(testVal).toEqual(undefined);
          expect(result.current.current).toEqual(null);

          testVal = { current: 'val' };
          result.current.current = 'internalRefVal';
          rerender();
          expect(testVal).toEqual({ current: 'internalRefVal' });
          expect(result.current.current).toEqual('internalRefVal');
        });
      });
    });
  });

  describe(`for a single 'ref'`, () => {
    test(`TODO`, () => {});
  });
});

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn()
}));

describe('useSearchParamsChangeEffect', () => {
  const callback = jest.fn();
  const search = '?foo=bar';
  const prevSearch = '?baz=qux';

  beforeEach(() => {
    jest.clearAllMocks();
    (useLocation as jest.Mock).mockReturnValue({ search });
  });

  it('should not call the callback if prevSearch is undefined', () => {
    renderHook(() => useSearchParamsChangeEffect(callback));
    expect(callback).not.toHaveBeenCalled();
  });

  it('should not call the callback if prevSearch is equal to search', () => {
    (useLocation as jest.Mock).mockReturnValueOnce({ search: prevSearch });
    renderHook(() => useSearchParamsChangeEffect(callback));
    expect(callback).not.toHaveBeenCalled();
  });
});
