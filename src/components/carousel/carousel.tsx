import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

// @ts-expect-error - CSS imports don't have type declarations
import 'swiper/css';

const images = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop',
];

const tabLabels = ['Nature', 'Landscape', 'Forest', 'Mountain', 'Beach'];

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleTabClick = (index: number) => {
    swiperRef.current?.slideTo(index);
    setActiveIndex(index);
  };

  const handleDotClick = (index: number) => {
    swiperRef.current?.slideTo(index);
    setActiveIndex(index);
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="w-full mb-6"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full rounded-lg overflow-hidden aspect-[804/532]">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div className="flex items-center gap-4">
        <div className="flex gap-2 flex-grow">
          {tabLabels.map((label, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              type="button"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeIndex === index
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center flex-shrink-0">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-300 rounded-full ${
                activeIndex === index
                  ? 'w-8 h-2 bg-primary'
                  : 'w-2 h-2 bg-muted-foreground/40 hover:bg-muted-foreground/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}