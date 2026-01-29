import type { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState, useRef, Children } from "react";
import { cn } from "@/lib/utils";

interface CarouselProps {
    children?: React.ReactNode;
    autoplayDelay?: number; // milliseconds between slides, default 5000
    className?: string;
}

export function Carousel({ children, autoplayDelay = 5000, className }: CarouselProps) {
    // Normalize children into an array of slide nodes
    const slideNodes = Children.toArray(children);
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true },
        [Autoplay({ delay: autoplayDelay })]
    )
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
    const [selectedSnap, setSelectedSnap] = useState<number>(0)
    const [progress, setProgress] = useState<number>(0)
    const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const goTo = (index: number) => {
        emblaApi?.scrollTo(index)
        // Stop autoplay when user manually navigates
        emblaApi?.plugins().autoplay?.stop()
        // Reset progress when autoplay stops
        setProgress(0)
    }
    const onReInit = (embla: EmblaCarouselType) => {
        setScrollSnaps(embla.scrollSnapList())
        setSelectedSnap(embla.selectedScrollSnap())
    }
    const onSelect = (embla: EmblaCarouselType) => {
        setSelectedSnap(embla.selectedScrollSnap())
    }

    useEffect(() => {
        if (!emblaApi) return
    
        // Initialize state after Embla is ready (async to avoid sync setState-in-effect lint).
        requestAnimationFrame(() => onReInit(emblaApi))

        emblaApi.on('reInit', onReInit)
        emblaApi.on('select', onSelect)

        // Reset progress when autoplay selects a new slide
        const onAutoplaySelect = () => {
            setProgress(0)
        }
        emblaApi.on('autoplay:select', onAutoplaySelect)

        // Start autoplay
        emblaApi.plugins().autoplay?.play()

        return () => {
            emblaApi.off('reInit', onReInit)
            emblaApi.off('select', onSelect)
            emblaApi.off('autoplay:select', onAutoplaySelect)
        }
      }, [emblaApi])

    // Track autoplay progress
    useEffect(() => {
        if (!emblaApi) return

        const updateProgress = () => {
            const timeUntilNext = emblaApi.plugins().autoplay?.timeUntilNext()
            if (timeUntilNext !== null && timeUntilNext !== undefined) {
                const progressValue = ((autoplayDelay - timeUntilNext) / autoplayDelay) * 100
                setProgress(Math.max(0, Math.min(100, progressValue)))
            } else {
                setProgress(0)
            }
        }

        // Update progress every frame for smooth animation
        progressIntervalRef.current = setInterval(updateProgress, 16) // ~60fps

        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current)
                progressIntervalRef.current = null
            }
        }
    }, [emblaApi, autoplayDelay])

    return (
        <>
        <div className={cn("flex flex-col gap-2 w-full md:gap-4 max-w-[804px]", className)}>
            <div className="max-md:-mx-4 embla [--slide-spacing:16px]">
                <div className="embla__viewport overflow-hidden w-full h-full aspect-[804/532]" ref={emblaRef}>
                    <div className="embla__container flex touch-pan-y h-full" style={{ marginLeft: `calc(var(--slide-spacing) * -1)` }}>
                        {slideNodes.map((slide, index) => (
                            <div
                                key={index}
                                className="embla__slide grow-0 shrink-0 basis-full min-w-0"
                                style={{ paddingLeft: `var(--slide-spacing)` }}
                            >
                                <div className="w-full h-full rounded-sm overflow-hidden">
                                    {slide}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="flex">
                    {scrollSnaps.map((_, index) => (
                    <button
                        type="button"
                        className="block p-1 cursor-pointer"
                        key={index}
                        onClick={() => goTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={selectedSnap === index ? "true" : "false"}
                    >
                        <div
                            className={cn(
                                "size-2 rounded-full relative bg-gray-300 overflow-hidden",
                                selectedSnap === index && "w-8 transition-width duration-200 before:absolute before:inset-0 before:rounded-full before:bg-blue-500 before:w-[var(--progress)]"
                            )}
                            style={selectedSnap === index ? { '--progress': `${progress}%` } as React.CSSProperties & { '--progress': string } : undefined}
                        />
                    </button>
                ))}
                </div>
            </div>
        </div>
        </>
    )
}