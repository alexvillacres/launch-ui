import Carousel from "./components/carousel/carousel";
import { ComponentContainer } from "./components/component-container";
import { Trees, Mountain, Waves } from "lucide-react";

export function App() {
  return (
    <div className="bg-background w-full">
      <div className="max-w-[1192px] mx-auto p-8 space-y-4">
        <div className="w-full h-[200svh]"></div>
        <ComponentContainer className="flex flex-row gap-4">
          <Carousel
            image1={{
              src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
              alt: "Forest",
            }}
            label1="Forest"
            icon1={<Trees />}
            image2={{
              src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",
              alt: "Mountain",
            }}
            label2="Mountain"
            icon2={<Mountain />}
            image3={{
              src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop",
              alt: "Beach",
            }}
            label3="Beach"
            icon3={<Waves />}
            spaceBetween={24}
          />
          <aside className="text-white bg-primary p-6 overflow-hidden rounded-md relative hidden lg:block md:w-1/3 mt-[36px] bg-content-primary">
            <div className="h-full flex flex-col justify-between relative z-2">
              <span className="text-sm font-medium">SpotOn</span>
              <blockquote className="text-sm content-end grow">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
              </blockquote>
              <div className="text-sm flex items-center gap-2">
                <p>Mark Moldarmov</p>
                <p>CEO, SpotOn</p>
              </div>
            </div>
            <span className="overflow-hidden block align-top absolute inset-0 object-cover">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop"
                alt="Mark Moldarmov"
              />
            </span>
          </aside>
        </ComponentContainer>
      </div>
    </div>
  );
}

export default App;
