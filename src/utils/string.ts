import { changeAlias } from './format';

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const SLUG_MAP = Object.freeze({
  alphabetsWithAccent: 'àáạảãâầấậẩẫăằắặẳẵäèéẹẻẽêềếệểễëìíịỉĩïîòóọỏõôồốộổỗơờớợởỡöùúụủũưừứựửữüûỳýỵỷỹđñç',
  alphabetsWithoutAccent: 'aaaaaaaaaaaaaaaaaaeeeeeeeeeeeeiiiiiiioooooooooooooooooouuuuuuuuuuuuuyyyyydnc',
  specialChars: '!@%^()+=<>?/,.:;\'"&#[]~$_`-{}|\\·*',
  specialCharsToDash: '---------------------------------',
  specialCharsToSpace: '                                 ',
  // Alphabets with accent and special characters
  getAll(): string {
    return this.alphabetsWithAccent + this.specialChars;
  },
  // Slugified replacement for getAll()
  getAllSlugified(): string {
    return this.alphabetsWithoutAccent + this.specialCharsToDash;
  },
  // Spaced replacement for getAll()
  getAllSpaced(): string {
    return this.alphabetsWithoutAccent + this.specialCharsToSpace;
  },
  // Removes accent from alphabets and replaces special characters with preferred replacement
  normalizeAll({ str, replaceSpecialCharWith }: { str: string; replaceSpecialCharWith: 'dash' | 'space' }): string {
    str = this.normalizeAlphabets({ str });
    str = this.normalizeSpecialChars({ str, replaceWith: replaceSpecialCharWith });
    return str;
  },
  // Removes accent from alphabets
  normalizeAlphabets({ str }: { str: string }): string {
    for (var i = 0, l = this.alphabetsWithAccent.length; i < l; i++) {
      str = str.replace(new RegExp(this.alphabetsWithAccent.charAt(i), 'g'), this.alphabetsWithoutAccent.charAt(i));
    }
    return str;
  },
  // Replace special characters with preferred replacement
  normalizeSpecialChars({ str, replaceWith }: { str: string; replaceWith: 'dash' | 'space' }): string {
    for (var i = 0, l = this.specialChars.length; i < l; i++) {
      str = str.replace(
        new RegExp(`\\${this.specialChars.charAt(i)}`, 'g'),
        replaceWith === 'dash' ? this.specialCharsToDash.charAt(i) : this.specialCharsToSpace.charAt(i)
      );
    }
    return str;
  }
});

// Source: https://gist.github.com/codeguy/6684588
export const slugify = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();
  // remove accents, swap ñ for n, etc
  str = SLUG_MAP.normalizeAll({ str, replaceSpecialCharWith: 'dash' });
  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};

export const getInitial = (str: string = ''): string => {
  return changeAlias(str)
    .split(' ')
    .filter((word) => word)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};

//Json parse for array or object nested
export const parseObject = (sourceObj) => {
  let res;
  try {
    res = JSON.parse(JSON.stringify(sourceObj));
  } catch (err) {
    res = [...sourceObj];
  }
  return res;
};
