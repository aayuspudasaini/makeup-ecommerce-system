import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

export const ImageCarousel = () => {
    return (
        <div className="flex flex-row gap-2.5">
            <div className="flex flex-col gap-2.5">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="w-24 h-24 aspect-square border cursor-pointer group overflow-hidden p-2"
                    >
                        <Image
                            className="overflow-hidden object-cover h-full w-full group-hover:scale-110 transition-all duration-300"
                            src="/images/kosas.png"
                            alt="Product"
                            width={1200}
                            height={1080}
                        />
                    </div>
                ))}
            </div>
            <Carousel className="h-full">
                <CarouselContent>
                    <CarouselItem className="h-full">
                        <Image
                            className="object-cover h-full w-full"
                            src="/images/kosas.png"
                            alt="Product"
                            width={1200}
                            height={1080}
                        />
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </div>
    );
};
