import styled from 'styled-components';
import SwiperCore, { Autoplay, Mousewheel, Navigation, SwiperOptions } from 'swiper';
import { Swiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

interface SlideContainerProps {
  children: React.ReactNode | React.ReactNode[];
  options?: Options;
  className?: string;
  loop?: boolean;
  style?: object;
  onSlideChange?: (swiper: SwiperCore) => void;
}

interface Options extends SwiperOptions {
  onSwiper?: (sw: SwiperCore) => void;
}

SwiperCore.use([Navigation]);

export const SlideContainer = ({
  children,
  className,
  options,
  loop = true,
  style,
  onSlideChange,
}: SlideContainerProps) => {
  return (
    <CustomSwiper
      modules={[Navigation, Autoplay, Mousewheel]}
      className={className}
      loop={loop}
      style={style}
      observer
      observeParents
      onSlideChange={onSlideChange}
      {...options}>
      {children}
    </CustomSwiper>
  );
};

export default SlideContainer;

const CustomSwiper = styled(Swiper)`
  .swiper-button-next,
  .swiper-button-prev {
    place-items: center;
    top: 1.7rem;
    width: 2rem;
    height: 2rem;
    background: rgba(226, 226, 226, 0.7);
    border-radius: 100%;
  }
  .swiper-button-prev {
    left: 0;
    content: ${`/images/left-arrow.png`};
  }
  .swiper-button-next {
    right: 0;
    content: ${`/images/right-arrow.png`};
  }
  .swiper-button-prev:after,
  .swiper-button-next:after {
    height: 0;
  }
  .swiper-button-next.swiper-button-disabled,
  .swiper-button-prev.swiper-button-disabled {
    opacity: 0;
  }
`;
