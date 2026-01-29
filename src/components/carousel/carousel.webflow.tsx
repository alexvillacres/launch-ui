import Carousel from './carousel';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

const CarouselComponent = declareComponent(Carousel, {
    name: 'Carousel',
    description: 'A carousel with images',
    group: 'Content',
    props: {
        images: props.Slot({
            name: 'Images',
            group: 'Content',
            tooltip: 'Add images to the carousel',
        }),
    },
});

export default CarouselComponent;
