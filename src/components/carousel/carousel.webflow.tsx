import Carousel from './carousel';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

const CarouselComponent = declareComponent(Carousel, {
  name: 'Carousel',
  description: 'A carousel with up to 5 images and labeled navigation tabs',
  group: 'Content',
  props: {
    // Slide 1
    image1: props.Image({
      name: 'Image 1',
      group: 'Slide 1',
      tooltip: 'First slide image',
    }),
    label1: props.Text({
      name: 'Label 1',
      group: 'Slide 1',
      tooltip: 'Tab label for first slide (defaults to alt text)',
      defaultValue: '',
    }),
    icon1: props.Slot({
      name: 'Icon 1',
      group: 'Slide 1',
      tooltip: 'Icon for first slide',
    }),
    // Slide 2
    image2: props.Image({
      name: 'Image 2',
      group: 'Slide 2',
      tooltip: 'Second slide image',
    }),
    label2: props.Text({
      name: 'Label 2',
      group: 'Slide 2',
      tooltip: 'Tab label for second slide (defaults to alt text)',
      defaultValue: '',
    }),
    icon2: props.Slot({
      name: 'Icon 2',
      group: 'Slide 2',
      tooltip: 'Icon for second slide',
    }),

    // Slide 3
    image3: props.Image({
      name: 'Image 3',
      group: 'Slide 3',
      tooltip: 'Third slide image',
    }),
    label3: props.Text({
      name: 'Label 3',
      group: 'Slide 3',
      tooltip: 'Tab label for third slide (defaults to alt text)',
      defaultValue: '',
    }),
    icon3: props.Slot({
      name: 'Icon 3',
      group: 'Slide 3',
      tooltip: 'Icon for third slide',
    }),

    // Slide 4
    image4: props.Image({
      name: 'Image 4',
      group: 'Slide 4',
      tooltip: 'Fourth slide image',
    }),
    label4: props.Text({
      name: 'Label 4',
      group: 'Slide 4',
      tooltip: 'Tab label for fourth slide (defaults to alt text)',
      defaultValue: '',
    }),
    icon4: props.Slot({
      name: 'Icon 4',
      group: 'Slide 4',
      tooltip: 'Icon for fourth slide',
    }),

    // Slide 5
    image5: props.Image({
      name: 'Image 5',
      group: 'Slide 5',
      tooltip: 'Fifth slide image',
    }),
    label5: props.Text({
      name: 'Label 5',
      group: 'Slide 5',
      tooltip: 'Tab label for fifth slide (defaults to alt text)',
      defaultValue: '',
    }),
    icon5: props.Slot({
      name: 'Icon 5',
      group: 'Slide 5',
      tooltip: 'Icon for fifth slide',
    }),
    // Configuration
    numberOfSlides: props.Number({
      name: 'Number of Slides',
      group: 'Settings',
      tooltip: 'Override the number of slides (optional - auto-detects by default)',
      min: 1,
      max: 5,
    }),

    spaceBetween: props.Number({
      name: 'Space Between',
      group: 'Settings',
      tooltip: 'Space between slides in pixels',
      defaultValue: 24,
      min: 0,
      max: 100,
    }),

    autoplay: props.Boolean({
      name: 'Autoplay',
      group: 'Settings',
      tooltip: 'Automatically advance slides',
      defaultValue: true,
    }),

    autoplayDelay: props.Number({
      name: 'Autoplay Delay',
      group: 'Settings',
      tooltip: 'Time between slides in milliseconds',
      defaultValue: 5000,
      min: 1000,
      max: 20000,
    }),
  },
});

export default CarouselComponent;
