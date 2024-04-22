import {
  pathWithoutQuery,
  getFilenameFromPath,
  getExtensionFromPath,
  replacePathExtension,
  getPathnameWithoutQuery
} from '../path';

describe('pathWithoutQuery', () => {
  describe(`when 'path' is not provided`, () => {
    test(`an empty string is returned`, () => {
      expect(pathWithoutQuery('')).toEqual('');
    });
  });

  describe(`when 'path' is provided`, () => {
    test(`path without query is returned`, () => {
      expect(pathWithoutQuery('./path/to/someFile.png?query=string')).toEqual('./path/to/someFile.png');
    });
  });
});

describe('getFilenameFromPath', () => {
  describe(`when 'path' is not provided`, () => {
    test(`an empty string is returned`, () => {
      expect(getFilenameFromPath('')).toEqual('');
    });
  });

  describe(`when 'path' is provided`, () => {
    test(`filename is returned`, () => {
      expect(getFilenameFromPath('./path/to/someFile.png')).toEqual('someFile.png');
    });
  });

  describe(`when a filename is provided`, () => {
    test(`filename is returned`, () => {
      expect(getFilenameFromPath('someFile.png')).toEqual('someFile.png');
    });
  });

  describe(`when a path with a trailing slash is provided`, () => {
    test(`an empty string is returned`, () => {
      expect(getFilenameFromPath('./path/to/someFile.png/')).toEqual('');
    });
  });

  describe(`when a HTTP URL for a file name with query string is provided`, () => {
    test(`filename is returned`, () => {
      expect(getFilenameFromPath('https://example.com/someFile.png?query=string')).toEqual('someFile.png');
    });
  });
});

describe('getExtensionFromPath', () => {
  describe(`when 'path' is not provided`, () => {
    test(`an empty string is returned`, () => {
      expect(getExtensionFromPath('')).toEqual('');
    });
  });

  describe(`when 'path' is provided`, () => {
    test(`extension is returned`, () => {
      expect(getExtensionFromPath('./path/to/someFile.png')).toEqual('png');
    });
  });

  describe(`when a filename is provided`, () => {
    test(`extension is returned`, () => {
      expect(getExtensionFromPath('someFile.png')).toEqual('png');
    });
  });
});

describe('replacePathExtension', () => {
  describe(`when 'path' is not provided`, () => {
    test(`an empty string is returned`, () => {
      expect(replacePathExtension('', 'jpg')).toEqual('');
    });
  });

  describe(`when 'path' is provided`, () => {
    test(`extension is replaced`, () => {
      expect(replacePathExtension('./path/to/someFile.png', 'jpg')).toEqual('./path/to/someFile.jpg');
      expect(replacePathExtension('./path/someFile.png/to/someFile.png', 'jpg')).toEqual(
        './path/someFile.png/to/someFile.jpg'
      );
    });
  });

  describe(`when a 'path' with trailing query string is provided`, () => {
    test(`extension is replaced and query string is preserved`, () => {
      expect(replacePathExtension('https://example.com/path/to/someFile.png?query=string', 'jpg')).toEqual(
        'https://example.com/path/to/someFile.jpg?query=string'
      );
    });
  });

  describe(`when a filename is provided`, () => {
    test(`extension is replaced`, () => {
      expect(replacePathExtension('someFile.png', 'jpg')).toEqual('someFile.jpg');
    });
  });
});

describe('getPathnameWithoutQuery', () => {
  test('should return the pathname without query string for URL', () => {
    const path = 'https://template/pathname?query=string';
    const result = getPathnameWithoutQuery(path);
    expect(result).toEqual('/pathname');
  });

  test('should return the pathname without query string for path segment', () => {
    const path = '/pathname?query=string';
    const result = getPathnameWithoutQuery(path);
    expect(result).toEqual('/pathname');
  });

  test('should return the root pathname if no path is provided for URL', () => {
    const path = 'https://template';
    const result = getPathnameWithoutQuery(path);
    expect(result).toEqual('/');
  });

  test('should return the root pathname if no path is provided for path segment', () => {
    const path = '';
    const result = getPathnameWithoutQuery(path);
    expect(result).toEqual('/');
  });

  test('should return the pathname if no query string is provided for URL', () => {
    const path = 'https://template/pathname';
    const result = getPathnameWithoutQuery(path);
    expect(result).toEqual('/pathname');
  });

  test('should return the pathname if no query string is provided for path segment', () => {
    const path = '/pathname';
    const result = getPathnameWithoutQuery(path);
    expect(result).toEqual('/pathname');
  });

  test('should return the pathname converted to lowercase for URL', () => {
    const path = 'https://template/patHName';
    const result = getPathnameWithoutQuery(path);
    expect(result).toEqual('/pathname');
  });

  test('should return the pathname converted to lowercase for path segment', () => {
    const path = '/patHName';
    const result = getPathnameWithoutQuery(path);
    expect(result).toEqual('/pathname');
  });
});
