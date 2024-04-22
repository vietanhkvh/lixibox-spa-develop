import { ElementType, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import style from './style.module.scss';

interface IProps {
  data: Array<any>;
  height: number;
  template: ElementType;
  interval: number;
  classes?: { container?: string };
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const VerticalCarousel = ({ data, template: Template, interval, height, onClick, classes }: IProps) => {
  let schedulerId: NodeJS.Timeout = null;
  const carouselRef: any = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const localData = data?.map((item) => item);
  const nextSlideAvailable = currentSlideIndex + 1 < data.length;

  useEffect(() => {
    if (data.length < 2) return;

    clearInterval(schedulerId);
    schedulerId = setInterval(() => {
      if (nextSlideAvailable) {
        setCurrentSlideIndex((prevIndex) => {
          const nextSlideId = prevIndex + 1;
          carouselRef.current.scrollTo({ left: 0, top: height * nextSlideId, behavior: 'smooth' });
          return nextSlideId;
        });
      } else {
        setCurrentSlideIndex(() => {
          const nextSlideId = 0;
          carouselRef.current.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
          return nextSlideId;
        });
      }
    }, interval);
    return () => clearInterval(schedulerId);
  }, [localData]);

  return !data.length ? null : (
    <div
      style={{ height }}
      ref={carouselRef}
      className={classNames(style.verticalCarousel, classes?.container)}
      onClick={onClick}
    >
      {data.map((itemData, index) => (
        <Template key={index} {...itemData} />
      ))}
    </div>
  );
};
VerticalCarousel.defaultProps = {
  interval: 5000
};

export default VerticalCarousel;
