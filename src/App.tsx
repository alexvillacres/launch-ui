import Carousel from "./components/carousel/carousel";
import { ComponentContainer } from "./components/component-container";


export function App() {
  return (
    <div className="bg-background w-full">
      <div className="max-w-[1192px] mx-auto p-8 space-y-4">
        <ComponentContainer>
            <Carousel>
            </Carousel>
        </ComponentContainer>
      </div>
    </div>
  );
}

export default App;
