import { preLoadImage, isPathConvertibleToWebP } from '../image';

describe('preLoadImage', () => {
  const imageLink1 = 'https://upload.example.com/system/pictures/files/000/036/963/large/1543377494.png';
  const imageLink2 = 'https://upload.example.com/system/pictures/files/000/036/963/large/154337749x.png';

  describe(`when 'source' is a string`, () => {
    test(`returns corresponding 'Image' object`, () => {
      const processedImageList = preLoadImage(imageLink1);
      expect(processedImageList.length).toEqual(1);
      expect(processedImageList[0].src).toEqual(imageLink1);
    });
  });

  describe(`when 'source' is an array`, () => {
    test(`returns corresponding 'Image' objects`, () => {
      const processedImageList = preLoadImage([imageLink1, imageLink2]);
      expect(processedImageList.length).toEqual(2);
      expect(processedImageList[0].src).toEqual(imageLink1);
      expect(processedImageList[1].src).toEqual(imageLink2);
    });
  });
});

describe('isPathConvertibleToWebP', () => {
  const imageLink1 = 'https://upload.example.com/system/pictures/files/000/036/963/large/1543377494.png';
  const imageLink2 = 'https://upload.example.com/system/pictures/files/000/036/963/large/154337749x.webp';

  describe(`when 'path' is a string`, () => {
    test(`returns true if path is convertible to WebP`, () => {
      expect(isPathConvertibleToWebP(imageLink1)).toEqual(true);
    });

    test(`returns false if path is not convertible to WebP`, () => {
      expect(isPathConvertibleToWebP(imageLink2)).toEqual(false);
    });
  });
});
