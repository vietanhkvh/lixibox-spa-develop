import { capitalize, getInitial, SLUG_MAP, slugify } from '../string';

describe('capitalize', () => {
  test('should capitalize string', () => {
    expect(capitalize('abc')).toEqual('Abc');
    expect(capitalize('abc def')).toEqual('Abc def');
    expect(capitalize('ăbc')).toEqual('Ăbc');
    expect(capitalize('')).toEqual('');
  });
});

describe('getInitial', () => {
  test('generates initial', () => {
    expect(getInitial('')).toEqual('');
    expect(getInitial()).toEqual('');
    expect(getInitial('Data')).toEqual('D');
    expect(getInitial('Hanoi')).toEqual('H');
    expect(getInitial('Hà Nội')).toEqual('HN');
    expect(getInitial('Hà Nam')).toEqual('HN');
    expect(getInitial('Hồ Chí Minh')).toEqual('HCM');
    expect(getInitial('Bà Rịa - Vũng Tàu')).toEqual('BRVT');
    expect(getInitial('da nang')).toEqual('DN');
  });
});

describe('SLUG_MAP', () => {
  describe('.getAll', () => {
    test('string is returned', () => {
      expect(typeof SLUG_MAP.getAll()).toBe('string');
    });
  });
  describe('.getAllSlugified', () => {
    test('string is returned', () => {
      expect(typeof SLUG_MAP.getAllSlugified()).toBe('string');
    });
  });
  describe('.getAllSpaced', () => {
    test('string is returned', () => {
      expect(typeof SLUG_MAP.getAllSpaced()).toBe('string');
    });
  });
  describe('.normalizeAll', () => {
    describe(`when special characters are replaced with 'dash'`, () => {
      test(`string is slugified`, () => {
        expect(
          SLUG_MAP.normalizeAll({
            str: 'àáạảãâầấậẩẫăằắặẳẵäèéẹẻẽêềếệểễëìíịỉĩïîòóọỏõôồốộổỗơờớợởỡöùúụủũưừứựửữüûỳýỵỷỹđñç!@%^()+=<>?/,.:;\'"&#[]~$_`-{}|\\·*',
            replaceSpecialCharWith: 'dash'
          })
        ).toBe(
          'aaaaaaaaaaaaaaaaaaeeeeeeeeeeeeiiiiiiioooooooooooooooooouuuuuuuuuuuuuyyyyydnc---------------------------------'
        );
      });
    });
    describe(`when special characters are replaced with 'space'`, () => {
      test(`string is normalized where special characters are replaced with space`, () => {
        expect(
          SLUG_MAP.normalizeAll({
            str: 'àáạảãâầấậẩẫăằắặẳẵäèéẹẻẽêềếệểễëìíịỉĩïîòóọỏõôồốộổỗơờớợởỡöùúụủũưừứựửữüûỳýỵỷỹđñç!@%^()+=<>?/,.:;\'"&#[]~$_`-{}|\\·*',
            replaceSpecialCharWith: 'space'
          })
        ).toBe(
          'aaaaaaaaaaaaaaaaaaeeeeeeeeeeeeiiiiiiioooooooooooooooooouuuuuuuuuuuuuyyyyydnc                                 '
        );
      });
    });
  });
  describe('.normalizeAlphabets', () => {
    test(`only alphabets are normalized`, () => {
      expect(
        SLUG_MAP.normalizeAlphabets({
          str: 'àáạảãâầấậẩẫăằắặẳẵäèéẹẻẽêềếệểễëìíịỉĩïîòóọỏõôồốộổỗơờớợởỡöùúụủũưừứựửữüûỳýỵỷỹđñç!@%^()+=<>?/,.:;\'"&#[]~$_`-{}|\\·*'
        })
      ).toBe(
        'aaaaaaaaaaaaaaaaaaeeeeeeeeeeeeiiiiiiioooooooooooooooooouuuuuuuuuuuuuyyyyydnc!@%^()+=<>?/,.:;\'"&#[]~$_`-{}|\\·*'
      );
    });
  });
  describe('.normalizeSpecialChars', () => {
    describe(`when special characters are replaced with 'dash'`, () => {
      test(`appropriate normalization is applied`, () => {
        expect(
          SLUG_MAP.normalizeSpecialChars({
            str: 'àáạảãâầấậẩẫăằắặẳẵäèéẹẻẽêềếệểễëìíịỉĩïîòóọỏõôồốộổỗơờớợởỡöùúụủũưừứựửữüûỳýỵỷỹđñç!@%^()+=<>?/,.:;\'"&#[]~$_`-{}|\\·*',
            replaceWith: 'dash'
          })
        ).toBe(
          'àáạảãâầấậẩẫăằắặẳẵäèéẹẻẽêềếệểễëìíịỉĩïîòóọỏõôồốộổỗơờớợởỡöùúụủũưừứựửữüûỳýỵỷỹđñç---------------------------------'
        );
      });
    });
    describe(`when special characters are replaced with 'space'`, () => {
      test(`appropriate normalization is applied`, () => {
        expect(
          SLUG_MAP.normalizeSpecialChars({
            str: 'àáạảãâầấậẩẫăằắặẳẵäèéẹẻẽêềếệểễëìíịỉĩïîòóọỏõôồốộổỗơờớợởỡöùúụủũưừứựửữüûỳýỵỷỹđñç!@%^()+=<>?/,.:;\'"&#[]~$_`-{}|\\·*',
            replaceWith: 'space'
          })
        ).toBe(
          'àáạảãâầấậẩẫăằắặẳẵäèéẹẻẽêềếệểễëìíịỉĩïîòóọỏõôồốộổỗơờớợởỡöùúụủũưừứựửữüûỳýỵỷỹđñç                                 '
        );
      });
    });
  });
});

describe(`slugify`, () => {
  test('slugifies strings', () => {
    expect(
      slugify(
        'àáạảãâầấậẩẫăằắặẳẵäèéẹẻẽêềếệểễëìíịỉĩïîòóọỏõôồốộổỗơờớợởỡöùúụủũưừứựửữüûỳýỵỷỹđñç!@%^()+=<>?/,.:;\'"&#[]~$_`-{}|\\·*'
      )
    ).toBe('aaaaaaaaaaaaaaaaaaeeeeeeeeeeeeiiiiiiioooooooooooooooooouuuuuuuuuuuuuyyyyydnc-');
    expect(
      slugify(
        'àáạảãâầấậẩẫăằắặẳẵä!@%èéẹẻẽêềếệểễëìíịỉĩïî^()òóọỏõôồốộổỗơờớợởỡöùúụủũưừứựửữüûỳýỵỷỹ+đñç=<>?/,.:;\'"&#[]~$_`-{}|\\·*'
      )
    ).toBe('aaaaaaaaaaaaaaaaaa-eeeeeeeeeeeeiiiiiii-oooooooooooooooooouuuuuuuuuuuuuyyyyy-dnc-');
  });
});
