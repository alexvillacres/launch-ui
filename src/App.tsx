import { Carousel } from "./components/carousel/carousel";
import { CarouselSlide } from "./components/carousel/carousel-slide";
import { ComponentContainer } from "./components/component-container";

const images = [
  { src: "https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Image 1" },
  { src: "https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Image 2" },
  { src: "https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Image 3" },
]

export function App() {
  return (
    <div className="bg-background w-full">
      <div className="max-w-[1192px] mx-auto p-8 space-y-4">
        <ComponentContainer>
          <Carousel>
            <CarouselSlide image={images[0].src} />
            <CarouselSlide image={images[1].src} />
            <CarouselSlide image={images[2].src} />
          </Carousel>
        </ComponentContainer>
      </div>
    </div>
  );
}

export default App;
