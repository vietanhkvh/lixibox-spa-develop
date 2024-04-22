import { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import { tripHtmlTag } from '../../../utils/format';
import { isEmptyObject } from '../../../utils/validate';
import { initFacebookComment } from '../../../utils/facebook-comments';

import { DEFAULT_PROPS, INITITAL_STATE } from './initialize';
import { IProps, IState } from './model';
import renderView from './view';
import { generateBoxImage } from './box-image.handler';
import './style.css';

class BlogDetail extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  constructor(props: IProps) {
    super(props);

    this.state = INITITAL_STATE;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.idPost !== nextProps.idPost) {
      this.setState({ isFormatContent: false });
      initFacebookComment(`magazine-${(nextProps.magazine && nextProps.magazine.id) || 0}`);
    }
  }

  componentDidUpdate(nextProps) {
    try {
      const { isFormatContent } = this.state;
      if (!isEmptyObject(nextProps.magazine) && !isFormatContent) {
        this.setState({ isFormatContent: true }, () => this.handleFormatContent(nextProps.magazine));

        initFacebookComment(`magazine-${(nextProps.magazine && nextProps.magazine.id) || 0}`);
      }
    } catch (e) {
      return false;
    }
  }

  handleFormatContent(magazine) {
    try {
      const titleMagazineDetail = magazine.title;
      const imgList = document.querySelectorAll('#magazine-content img');

      imgList.forEach((image, $index) => {
        /** AUTO GENERATE ALT */
        this.generateAltContent(image, $index, titleMagazineDetail);

        /** ADD CAPTION */
        this.generateCaptionContent(image);
      });

      this.handleOnClickLinkImageBox();
    } catch (e) {
      return false;
    }

    /** PRODUCT LINK */
    generateBoxImage({ magazine });
  }

  generateAltContent(image, $index, titleMagazineDetail) {
    const alt = image.getAttribute('alt');
    const generatedAlt =
      !alt || !alt.length ? this.generateAltContentForImage(image, $index, titleMagazineDetail) : alt;
    image.setAttribute('alt', generatedAlt);
  }

  generateCaptionContent(image) {
    const title = image.getAttribute('title');
    if (!!title && !!title.length) {
      image.classList && image.classList.add('image-with-caption');
      let captionElement = document.createElement('span');
      captionElement.setAttribute('class', 'caption-image');
      captionElement.textContent = title;
      image.parentNode.insertBefore(captionElement, image.nextSibling);
    }
  }

  handleOnClickLinkImageBox() {
    /** Prevent click on container */
    const imageBoxListElement: any = document.getElementsByClassName('image-box');
    for (let i = 0; i < imageBoxListElement.length; i++) {
      imageBoxListElement[i].addEventListener(
        'click',
        (e) => {
          // e.preventDefault();
          return false;
        },
        false
      );
    }

    const imageBoxItemElement: any = document.getElementsByClassName('image-box-item');
    for (let i = 0; i < imageBoxItemElement.length; i++) {
      imageBoxItemElement[i].addEventListener(
        'click',
        (e) => {
          // const slug = imageBoxItemElement[i].getAttribute('data-slug');
          // this.props.history.push(`${ROUTING_PRODUCT_DETAIL_PATH}/${slug}`);
          // e.preventDefault();
          return false;
        },
        false
      );
    }
  }

  generateAltContentForImage(image, index, titleMagazineDetail) {
    try {
      const formatedText: any = tripHtmlTag(image.nextSibling);
      const finalText =
        !formatedText || !formatedText.length ? `Hình ảnh ${index} | ${titleMagazineDetail} | Lixibox` : formatedText;

      return finalText.slice(0, 256);
    } catch (e) {
      return `Hình ảnh ${index} | ${titleMagazineDetail} | Lixibox`;
    }
  }

  render() {
    return renderView(this.props);
  }
}

export default withRouter(BlogDetail as any);
