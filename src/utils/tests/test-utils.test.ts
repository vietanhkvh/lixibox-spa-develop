jest.mock('../../app/init-react-app', () => ({
  store: { getState: jest.fn().mockReturnValue({}) }
}));
import { generateTestId } from '../test-utils';

describe('generateTestId', () => {
  describe(`when no arguments are provided`, () => {
    test(`generates no prop`, () => {
      expect(generateTestId()).toEqual({});
    });
  });

  describe(`when 'name' or 'id' is empty`, () => {
    test(`generates no prop`, () => {
      expect(generateTestId({ name: '' })).toEqual({});
      expect(generateTestId({ name: '', id: '' })).toEqual({});
    });
  });

  describe(`when 'name' or 'id' is not empty`, () => {
    test(`generates test ID prop`, () => {
      expect(generateTestId({ name: 'data' })).toEqual({ 'data-testid': 'data' });
      expect(generateTestId({ name: 'data', id: 'id1' })).toEqual({ 'data-testid': 'data-id1' });
    });
  });

  describe(`when 'name' or 'id' contains uppercase letter(s)`, () => {
    test(`generates test ID prop with value converted to lowercase`, () => {
      expect(generateTestId({ name: 'DATA' })).toEqual({ 'data-testid': 'data' });
      expect(generateTestId({ name: 'DATA', id: 'ID1' })).toEqual({ 'data-testid': 'data-id1' });
    });
  });
});
