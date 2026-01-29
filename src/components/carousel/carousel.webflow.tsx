import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { Carousel } from './carousel';

interface CarouselWebflowAdapterProps {
    slides: React.ReactNode[];
    autoplayDelay?: number;
}

function CarouselWebflowAdapter({ slides, autoplayDelay }: CarouselWebflowAdapterProps) {
    return (
        <Carousel autoplayDelay={autoplayDelay}>
            {slides}
        </Carousel>
    );
}

const CarouselComponent = declareComponent(CarouselWebflowAdapter, {
    name: "Carousel",
    description: "A carousel component with autoplay and dot navigation",
    props: {
        slides: props.Slot({
            name: "Slides",
            group: "Content"
        }),
        autoplayDelay: props.Number({
            name: "Autoplay Delay",
            defaultValue: 5000
        })
    },
});

export default CarouselComponent;
