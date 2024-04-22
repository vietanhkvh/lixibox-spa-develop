import { CDN_ASSETS_PREFIX } from '../../../utils/uri';
import { isMobileVersion } from '../../../utils/responsive';
const cartIcon = CDN_ASSETS_PREFIX('/icons/shop/black.png');
const angleDownIcon = CDN_ASSETS_PREFIX('/icons/angle-down/black.png');

export const generateBoxImage = ({ magazine }) => {
  if (!magazine) return null;

  const imgList = document.querySelectorAll('#magazine-content img');
  imgList.forEach((image, index) => {
    boxImageItem({ image, index, magazine });
  });
};

function boxImageItem({ image, magazine, index }) {
  /** Check null magazine */
  if (!magazine) return null;

  /** Check null link */
  const link = image.getAttribute('longdesc');
  if (!link || !link.length) return null;

  /** Check null filteredBox */
  const filteredBox = boxFilter({ link, magazine });
  if (!filteredBox || !filteredBox.length) return null;

  image.classList && image.classList.add('image-with-box');

  /** Render container */
  let imageBoxElement = document.createElement('div');
  imageBoxElement.setAttribute('class', `image-box-wrap ${!isMobileVersion() && 'desktop'}`);

  /** Render list of item */
  const imageBoxList = filteredBox.map(boxItemHtml).join('');
  imageBoxElement.innerHTML = boxWrapHtml({ index, imageBoxList });

  /** Inject html */
  image.parentNode.insertBefore(imageBoxElement, image.nextSibling);
}

const boxFilter = ({ link, magazine }) => {
  const formatedLink = link.split(' ').join('').split('https://www.lixibox.com/shop/').join('').split(',');

  return magazine.related_boxes.filter((box) => formatedLink.indexOf(box.slug) >= 0);
};

const boxItemHtml = (item) =>
  `<a target="_blank" rel="noreferrer" href="https://lixibox.com/shop/${item.slug}" class="image-box-item"><img src=${
    !!item.primary_picture && item.primary_picture.medium_url
  } alt=${item.name}/></a>`;

const boxWrapHtml = ({ index, imageBoxList }) =>
  `<input type="checkbox" name="toggle-image-box-${index}" id="toggle-image-box-${index}" /><label class="toggle-icon" for="toggle-image-box-${index}"><img alt="" class="cart-icon" src="${cartIcon}" /><img alt="" class="angle-icon" src="${angleDownIcon}" /></label><div class="image-box-panel"><div class="image-box-heading">Sản phẩm trong hình</div><div class="image-box-list">${imageBoxList}<div></div>`;
