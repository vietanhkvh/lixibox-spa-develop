import { forwardRef, useEffect } from 'react';
import Image from '../../image';
import styles from './style.module.scss';
import Content from '../../content';

const ImageCarouselMob = forwardRef((props: any, ref: any) => {
  const {
    displaylist,
    handleOnScroll = () => {
      console.log('scrolled');
    },
    container,
    isDisplaySelectedContent,
    selectedContent,
    idCenterChild,
    idContainerCarousel
  } = props;
  useEffect(() => {
    if (idContainerCarousel) {
      const imgCarouselContainer = document.getElementById(idContainerCarousel);
      imgCarouselContainer.scrollLeft = Math.ceil(
        (idCenterChild + 1 - 0.5) * ref.current[0].clientWidth + (idCenterChild + 1 * 16) - window.innerWidth / 2
      );
    }
  }, []);
  return (
    <>
      <div className={container}>
        <div className={styles.imgsContainer} id={idContainerCarousel} onScroll={handleOnScroll}>
          {displaylist.map((i, index) => (
            <div key={i.src + i} className={styles.imgItem} ref={(e) => (ref.current[index] = e)}>
              <Image {...i} />
            </div>
          ))}
        </div>
      </div>
      {!!isDisplaySelectedContent && !!selectedContent.length && (
        <div className={styles.selectedContent}>
          <Content text={selectedContent} />
        </div>
      )}
    </>
  );
});
export default ImageCarouselMob;
