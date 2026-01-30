import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

// @ts-expect-error - CSS imports don't have type declarations
import "swiper/css";

// Webflow Image type (matches what props.Image() returns)
interface WebflowImage {
  src: string;
  alt?: string;
}

interface CarouselProps {
  image1?: WebflowImage;
  image2?: WebflowImage;
  image3?: WebflowImage;
  image4?: WebflowImage;
  image5?: WebflowImage;
  label1?: string;
  label2?: string;
  label3?: string;
  label4?: string;
  label5?: string;
  icon1?: React.ReactNode;
  icon2?: React.ReactNode;
  icon3?: React.ReactNode;
  icon4?: React.ReactNode;
  icon5?: React.ReactNode;
  numberOfSlides?: number;
  spaceBetween?: number;
}

interface SlideData {
  image: WebflowImage;
  label: string;
  icon: React.ReactNode;
}

// Get slide label with fallback: explicit label -> alt text -> "Slide N"
function getSlideLabel(
  explicitLabel: string | undefined,
  altText: string | undefined,
  slideNumber: number,
): string {
  if (explicitLabel && explicitLabel.trim() !== "") {
    return explicitLabel;
  }
  if (altText && altText.trim() !== "") {
    return altText;
  }
  return `Slide ${slideNumber}`;
}

// Build array of active slides from props
function getActiveSlides(props: CarouselProps): SlideData[] {
  const imageProps = [
    { image: props.image1, label: props.label1, icon: props.icon1 },
    { image: props.image2, label: props.label2, icon: props.icon2 },
    { image: props.image3, label: props.label3, icon: props.icon3 },
    { image: props.image4, label: props.label4, icon: props.icon4 },
    { image: props.image5, label: props.label5, icon: props.icon5 },
  ];

  // Filter to only slides with valid images
  const validSlides: SlideData[] = [];

  imageProps.forEach((slide) => {
    if (slide.image && slide.image.src && slide.image.src.trim() !== "") {
      validSlides.push({
        image: slide.image,
        label: getSlideLabel(
          slide.label,
          slide.image.alt,
          validSlides.length + 1,
        ),
        icon: slide.icon,
      });
    }
  });

  // Apply numberOfSlides override if specified and valid
  if (props.numberOfSlides && props.numberOfSlides > 0) {
    return validSlides.slice(
      0,
      Math.min(props.numberOfSlides, validSlides.length),
    );
  }

  return validSlides;
}

export default function Carousel(props: CarouselProps) {
  const { spaceBetween = 24 } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  // Build active slides array
  const slides = getActiveSlides(props);
  const slideCount = slides.length;

  const handleTabClick = (index: number) => {
    swiperRef.current?.slideTo(index);
    setActiveIndex(index);
  };

  const handleDotClick = (index: number) => {
    swiperRef.current?.slideTo(index);
    setActiveIndex(index);
  };

  // Render a slide image
  const renderSlide = (slide: SlideData) => {
    return (
      <div className="w-full rounded-lg overflow-hidden aspect-[804/532]">
        <img
          src={slide.image.src}
          alt={slide.image.alt || slide.label}
          className="w-full h-full object-cover"
          width={804}
        />
      </div>
    );
  };

  // Empty state when no images configured
  if (slideCount === 0) {
    return (
      <div className="w-full p-8 text-center text-muted-foreground border border-dashed border-muted rounded-lg">
        No images configured. Add images in the component properties.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 max-w-full overflow-hidden">
      <div className="hidden md:flex items-center gap-4 h-[22px]">
        {slideCount > 0 && (
          <div className="flex gap-4 flex-grow">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                type="button"
                className={`flex items-center text-[15px] font-medium leading-none gap-1 transition-colors whitespace-nowrap cursor-pointer ${
                  activeIndex === index
                    ? "text-[#3472D5]"
                    : "text-[#1F1D19]/40 hover:text-[#1F1D19]/80"
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center text-current">
                  {slide.icon}
                </div>
                <span>{slide.label}</span>
              </button>
            ))}
          </div>
        )}
        <div className="flex gap-2 items-center flex-shrink-0">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeIndex === index
                  ? "w-8 h-2 bg-[#3472D5]"
                  : "w-2 h-2 bg-[#1F1D19]/20 hover:bg-[#1F1D19]/40"
              }`}
            />
          ))}
        </div>
      </div>
      <Swiper
        spaceBetween={spaceBetween}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="w-full bg-[#F0EEEA] rounded-md overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>{renderSlide(slide)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
