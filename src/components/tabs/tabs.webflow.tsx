import Tabs from "./tabs";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

const TabsComponent = declareComponent(Tabs, {
  name: "Tabs",
  description:
    "Tabbed carousel with icon, title, description, and top progress indicator",
  group: "Content",
  props: {
    // Slide 1
    image1: props.Image({
      name: "Image 1",
      group: "Slide 1",
      tooltip: "First slide image",
    }),
    title1: props.Text({
      name: "Title 1",
      group: "Slide 1",
      tooltip: "Tab title for first slide (defaults to alt text)",
      defaultValue: "",
    }),
    description1: props.Text({
      name: "Description 1",
      group: "Slide 1",
      tooltip: "Tab description under the title (optional)",
      defaultValue: "",
    }),
    icon1: props.Slot({
      name: "Icon 1",
      group: "Slide 1",
      tooltip: "Icon for first slide",
    }),
    color1: props.Text({
      name: "Tab Color",
      group: "Slide 1",
      tooltip:
        "Color for this tab's progress bar and icon (hex, rgb, or CSS color)",
      defaultValue: "#3472D5",
    }),
    // Slide 2
    image2: props.Image({
      name: "Image 2",
      group: "Slide 2",
      tooltip: "Second slide image",
    }),
    title2: props.Text({
      name: "Title 2",
      group: "Slide 2",
      tooltip: "Tab title for second slide (defaults to alt text)",
      defaultValue: "",
    }),
    description2: props.Text({
      name: "Description 2",
      group: "Slide 2",
      tooltip: "Tab description under the title (optional)",
      defaultValue: "",
    }),
    icon2: props.Slot({
      name: "Icon 2",
      group: "Slide 2",
      tooltip: "Icon for second slide",
    }),
    color2: props.Text({
      name: "Tab Color",
      group: "Slide 2",
      tooltip:
        "Color for this tab's progress bar and icon (hex, rgb, or CSS color)",
      defaultValue: "#3472D5",
    }),

    // Slide 3
    image3: props.Image({
      name: "Image 3",
      group: "Slide 3",
      tooltip: "Third slide image",
    }),
    title3: props.Text({
      name: "Title 3",
      group: "Slide 3",
      tooltip: "Tab title for third slide (defaults to alt text)",
      defaultValue: "",
    }),
    description3: props.Text({
      name: "Description 3",
      group: "Slide 3",
      tooltip: "Tab description under the title (optional)",
      defaultValue: "",
    }),
    icon3: props.Slot({
      name: "Icon 3",
      group: "Slide 3",
      tooltip: "Icon for third slide",
    }),
    color3: props.Text({
      name: "Tab Color",
      group: "Slide 3",
      tooltip:
        "Color for this tab's progress bar and icon (hex, rgb, or CSS color)",
      defaultValue: "#3472D5",
    }),

    // Slide 4
    image4: props.Image({
      name: "Image 4",
      group: "Slide 4",
      tooltip: "Fourth slide image",
    }),
    title4: props.Text({
      name: "Title 4",
      group: "Slide 4",
      tooltip: "Tab title for fourth slide (defaults to alt text)",
      defaultValue: "",
    }),
    description4: props.Text({
      name: "Description 4",
      group: "Slide 4",
      tooltip: "Tab description under the title (optional)",
      defaultValue: "",
    }),
    icon4: props.Slot({
      name: "Icon 4",
      group: "Slide 4",
      tooltip: "Icon for fourth slide",
    }),
    color4: props.Text({
      name: "Tab Color",
      group: "Slide 4",
      tooltip:
        "Color for this tab's progress bar and icon (hex, rgb, or CSS color)",
      defaultValue: "#3472D5",
    }),

    // Slide 5
    image5: props.Image({
      name: "Image 5",
      group: "Slide 5",
      tooltip: "Fifth slide image",
    }),
    title5: props.Text({
      name: "Title 5",
      group: "Slide 5",
      tooltip: "Tab title for fifth slide (defaults to alt text)",
      defaultValue: "",
    }),
    description5: props.Text({
      name: "Description 5",
      group: "Slide 5",
      tooltip: "Tab description under the title (optional)",
      defaultValue: "",
    }),
    icon5: props.Slot({
      name: "Icon 5",
      group: "Slide 5",
      tooltip: "Icon for fifth slide",
    }),
    color5: props.Text({
      name: "Tab Color",
      group: "Slide 5",
      tooltip:
        "Color for this tab's progress bar and icon (hex, rgb, or CSS color)",
      defaultValue: "#3472D5",
    }),
    // Configuration
    numberOfSlides: props.Number({
      name: "Number of Slides",
      group: "Settings",
      tooltip:
        "Override the number of slides (optional - auto-detects by default)",
      min: 1,
      max: 5,
    }),

    spaceBetween: props.Number({
      name: "Space Between",
      group: "Settings",
      tooltip: "Space between slides in pixels",
      defaultValue: 24,
      min: 0,
      max: 100,
    }),

    autoplay: props.Boolean({
      name: "Autoplay",
      group: "Settings",
      tooltip: "Automatically advance slides",
      defaultValue: true,
    }),

    autoplayDelay: props.Number({
      name: "Autoplay Delay",
      group: "Settings",
      tooltip: "Time between slides in milliseconds",
      defaultValue: 5000,
      min: 1000,
      max: 20000,
    }),
  },
});

export default TabsComponent;
