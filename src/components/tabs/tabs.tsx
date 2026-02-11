import { useState, useRef, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

// @ts-expect-error - CSS imports don't have type declarations
import "swiper/css";

// Webflow Image type (matches what props.Image() returns)
interface WebflowImage {
  src: string;
  alt?: string;
}

interface TabsProps {
  image1?: WebflowImage;
  image2?: WebflowImage;
  image3?: WebflowImage;
  image4?: WebflowImage;
  image5?: WebflowImage;
  title1?: string;
  title2?: string;
  title3?: string;
  title4?: string;
  title5?: string;
  description1?: string;
  description2?: string;
  description3?: string;
  description4?: string;
  description5?: string;
  icon1?: React.ReactNode;
  icon2?: React.ReactNode;
  icon3?: React.ReactNode;
  icon4?: React.ReactNode;
  icon5?: React.ReactNode;
  numberOfSlides?: number;
  spaceBetween?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
}

interface SlideData {
  image: WebflowImage;
  title: string;
  description?: string;
  icon: React.ReactNode;
}

// Get slide title with fallback: explicit title -> alt text -> "Slide N"
function getSlideTitle(
  explicitTitle: string | undefined,
  altText: string | undefined,
  slideNumber: number
): string {
  if (explicitTitle && explicitTitle.trim() !== "") {
    return explicitTitle;
  }
  if (altText && altText.trim() !== "") {
    return altText;
  }
  return `Slide ${slideNumber}`;
}

function getSlideDescription(
  explicitDescription: string | undefined
): string | undefined {
  if (explicitDescription && explicitDescription.trim() !== "") {
    return explicitDescription;
  }
  return undefined;
}

// Build array of active slides from props
function getActiveSlides(props: TabsProps): SlideData[] {
  const imageProps = [
    {
      image: props.image1,
      title: props.title1,
      description: props.description1,
      icon: props.icon1,
    },
    {
      image: props.image2,
      title: props.title2,
      description: props.description2,
      icon: props.icon2,
    },
    {
      image: props.image3,
      title: props.title3,
      description: props.description3,
      icon: props.icon3,
    },
    {
      image: props.image4,
      title: props.title4,
      description: props.description4,
      icon: props.icon4,
    },
    {
      image: props.image5,
      title: props.title5,
      description: props.description5,
      icon: props.icon5,
    },
  ];

  const validSlides: SlideData[] = [];

  imageProps.forEach((slide) => {
    if (slide.image && slide.image.src && slide.image.src.trim() !== "") {
      validSlides.push({
        image: slide.image,
        title: getSlideTitle(
          slide.title,
          slide.image.alt,
          validSlides.length + 1
        ),
        description: getSlideDescription(slide.description),
        icon: slide.icon,
      });
    }
  });

  if (props.numberOfSlides && props.numberOfSlides > 0) {
    return validSlides.slice(
      0,
      Math.min(props.numberOfSlides, validSlides.length)
    );
  }

  return validSlides;
}

export default function Tabs(props: TabsProps) {
  const { spaceBetween = 24, autoplay = true, autoplayDelay = 5000 } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplayActive, setIsAutoplayActive] = useState(autoplay);
  const [isInView, setIsInView] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const slides = getActiveSlides(props);
  const slideCount = slides.length;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    setIsAutoplayActive(false);
  }, []);

  const advanceSlide = useCallback(() => {
    if (!swiperRef.current || slideCount === 0) return;
    const nextIndex = (activeIndex + 1) % slideCount;
    swiperRef.current.slideTo(nextIndex);
  }, [activeIndex, slideCount]);

  useEffect(() => {
    if (!isAutoplayActive || !isInView || slideCount <= 1) return;

    autoplayTimerRef.current = setTimeout(() => {
      advanceSlide();
    }, autoplayDelay);

    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [
    isAutoplayActive,
    isInView,
    activeIndex,
    autoplayDelay,
    slideCount,
    advanceSlide,
  ]);

  const handleTabClick = (index: number) => {
    stopAutoplay();
    swiperRef.current?.slideTo(index);
    setActiveIndex(index);
  };

  const renderSlide = (slide: SlideData) => {
    return (
      <div className="w-full rounded-lg overflow-hidden">
        <img
          src={slide.image.src}
          alt={slide.image.alt || slide.title}
          className="w-full h-full object-cover"
          width={804}
        />
      </div>
    );
  };

  if (slideCount === 0) {
    return (
      <div className="w-full p-8 text-center text-muted-foreground border border-dashed border-muted rounded-lg">
        No images configured. Add images in the component properties.
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full flex flex-col max-w-full">
      <div className="hidden md:flex items-center gap-4 bg-white border-solid border-t-[0.5px] border-l-[0.5px] border-r-[0.5px] border-border mx-2 rounded-tl-sm rounded-tr-sm overflow-hidden">
        {slideCount > 0 && (
          <div className="flex flex-grow divide-x-1 divide-border">
            {slides.map((slide, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => handleTabClick(index)}
                  type="button"
                  className="relative flex flex-col flex-1 basis-0 min-w-0 items-start text-left text-[15px] leading-none gap-2 transition-opacity cursor-pointer p-3"
                  style={{
                    opacity: isActive ? 1 : 0.5,
                    ["--progress-opacity" as string]: isActive ? "1" : "0",
                    ["--progress-color" as string]: "#3472D5",
                    ["--progress-transform" as string]:
                      isActive && !(isAutoplayActive && isInView)
                        ? "scaleX(1)"
                        : "scaleX(0)",
                    ["--progress-animation" as string]:
                      isActive && isAutoplayActive && isInView
                        ? "carousel-progress linear forwards"
                        : "none",
                    ["--progress-duration" as string]:
                      isActive && isAutoplayActive && isInView
                        ? `${autoplayDelay}ms`
                        : "0ms",
                  }}
                >
                  {/* Gray background bar */}
                  <div className="absolute left-0 top-0 h-[1.5px] w-full bg-gray-300 z-0" />
                  {/* Blue progress bar */}
                  <div
                    className="absolute left-0 top-0 h-[1.5px] w-full origin-left z-10"
                    style={{
                      backgroundColor: "var(--progress-color)",
                      opacity: "var(--progress-opacity)",
                      transform: "var(--progress-transform)",
                      animation: "var(--progress-animation)",
                      animationDuration: "var(--progress-duration)",
                    }}
                  />
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 [&>svg]:fill-current [&>svg]:stroke-current">
                      {slide.icon}
                    </div>
                    <span className="text-[15px] font-medium leading-none whitespace-nowrap">
                      {slide.title}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 w-full min-w-0">
                    {slide.description && (
                      <span className="text-[13px] leading-snug break-words">
                        {slide.description}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
      <div className="w-full bg-surface p-3 border-[0.5px] border-border border-solid rounded-md">
        <Swiper
          spaceBetween={spaceBetween}
          slidesPerView={1}
          speed={500}
          allowTouchMove={true}
          grabCursor={true}
          onTouchStart={() => stopAutoplay()}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide className="w-full lg:aspect-[1084/642]" key={index}>
              {renderSlide(slide)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
