
const cartIcon = `https://js.lixibox.com/image-assets/icons/shop/black.png`;
const angleDownIcon = `https://js.lixibox.com/image-assets/icons/angle-down/black.png`;

const generateBoxImage = (magazine) => {
  if (!magazine) return null;

  const imgList = document.querySelectorAll('#magazine-content img');
  imgList.forEach((image, index) => {
    boxImageItem({ image, index, magazine });
  });
};

const boxImageItem = ({ image, magazine, index }) => {
  /** Check null magazine */
  if (!magazine) return null;

  /** Check null link */
  const link = image.getAttribute('longdesc');
  if (!link || !link.length) return null;

  /** Check null filteredBox */
  const filteredBox = boxFilter({ link, magazine });
  if (!filteredBox && !filteredBox.length) return null;
  image.classList && image.classList.add('image-with-box');

  /** Render container */
  const imageBoxElement = document.createElement('div');
  imageBoxElement.setAttribute('class', 'image-box-wrap');

  /** Render list of item */
  const imageBoxList = filteredBox.map(boxItemHtml).join('');
  imageBoxElement.innerHTML = boxWrapHtml({ index, imageBoxList });

  /** Inject html */
  image.parentNode.insertBefore(imageBoxElement, image.nextSibling);
};

const boxFilter = ({ link, magazine }) => {
  const formatedLink = link
    .split(' ')
    .join('')
    .split('https://www.lixibox.com/shop/')
    .join('')
    .split(',');
  return magazine.related_boxes.filter(box => formatedLink.indexOf(box.slug) >= 0);
};

const boxItemHtml = item => `
  <a href="https://lixibox.com/shop/${item.slug}" class="image-box-item">
    <img src=${item.primary_picture_medium_url} alt=${item.name}/>
  </a>
`;

const boxWrapHtml = ({ index, imageBoxList }) => `
  <input type="checkbox" name="toggle-image-box-${index}" id="toggle-image-box-${index}" />
  <label class="toggle-icon" for="toggle-image-box-${index}">
    <img class="cart-icon" src="${cartIcon}" />
    <img class="angle-icon" src="${angleDownIcon}" />
  </label>
  <div class="image-box-panel">
    <div class="image-box-heading">Sản phẩm trong hình</div>
    <div class="image-box-list">
      ${imageBoxList}
    <div>
  </div>
`;

window.generateBoxImage = generateBoxImage;
export { generateBoxImage };
