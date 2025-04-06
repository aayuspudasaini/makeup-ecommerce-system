"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
import { VideoCard } from "@/app/(root)/_components/video-card";

export const VideoCarousel = () => {
    const [total, setTotal] = React.useState<number>(8);
    const [api, setApi] = React.useState<CarouselApi>();

    React.useEffect(() => {
        if (!api) {
            return;
        }
    }, [api]);

    const scrollToIndex = (index: number) => {
        api?.scrollTo(index);
    };

    const prevButton = () => {
        setTotal((prev) => prev - 1);
        scrollToIndex(total);
    };

    const nextButton = () => {
        setTotal((prev) => prev + 1);
        scrollToIndex(total);
    };

    return (
        <React.Fragment>
            <div className="flex items-center justify-between py-1.5">
                <h2 className="text-xl font-bold leading-6 tracking-tight text-center">
                    See it in action
                </h2>

                <div className="flex gap-2.5">
                    <Button
                        className="rounded-full w-6 h-6 cursor-pointer"
                        variant={total === 0 ? "ghost" : "default"}
                        disabled={total === 0}
                        onClick={prevButton}
                    >
                        <ChevronLeft className="size-4" />
                    </Button>
                    <Button
                        onClick={nextButton}
                        disabled={total === 8}
                        variant={total === 8 ? "ghost" : "default"}
                        className="rounded-full w-6 h-6 cursor-pointer"
                    >
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            </div>

            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                    {Array.from({ length: total }).map((_, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-1/2 md:basis-1/4"
                        >
                            <VideoCard
                                url="/videos/makeup-tutorial.mp4"
                                width={600}
                                height={800}
                                className="w-32 h-48 md:h-48"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </React.Fragment>
    );
};
