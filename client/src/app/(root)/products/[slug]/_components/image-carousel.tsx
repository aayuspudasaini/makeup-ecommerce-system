import {
    Carousel,
    CarouselMainContainer,
    CarouselThumbsContainer,
    SliderMainItem,
    SliderThumbItem,
} from "@/components/extensions/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";

const ImageCarousel = () => {
    return (
        <Carousel
            orientation="vertical"
            className="flex md:flex-row flex-col-reverse items-center gap-2.5 w-full"
        >
            <CarouselThumbsContainer className="h-60 w-48 md:w-24 flex flex-row md:block">
                {Array.from({ length: 10 }).map((_, index) => (
                    <SliderThumbItem
                        key={index}
                        index={index}
                        className="rounded-md bg-transparent"
                    >
                        <span className="border border-muted flex items-center justify-center h-full w-full rounded-md cursor-pointer bg-background">
                            <Image
                                className="h-full w-full rounded-sm"
                                src={"/images/hero.jpg"}
                                alt="product image"
                                width={1200}
                                height={800}
                            />
                        </span>
                    </SliderThumbItem>
                ))}
            </CarouselThumbsContainer>
            <div className="relative flex-1 w-full">
                <CarouselMainContainer className="h-[400px]">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <SliderMainItem
                            key={index}
                            className=" border border-muted flex items-center justify-center h-52 rounded-md p-0"
                        >
                            <Image
                                className="h-full w-full rounded-sm"
                                src={"/images/hero.jpg"}
                                alt="product image"
                                width={1200}
                                height={800}
                            />
                        </SliderMainItem>
                    ))}
                </CarouselMainContainer>
            </div>
        </Carousel>
    );
};

export default ImageCarousel;
