"use client";
import { Container } from "@/components/global/container";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const HeroSection = () => {
    const [api, setApi] = React.useState<CarouselApi>();

    // const scrollToIndex = (index: number) => {
    //     api?.scrollTo(index);
    // };

    console.log(api);
    return (
        <Carousel className="w-full full" setApi={setApi}>
            <CarouselContent>
                <CarouselItem className="relative">
                    <div className="w-full h-[calc(100vh-12rem)]">
                        <Image
                            className="w-full h-full object-cover"
                            src="/images/hero.jpg"
                            alt="Hero Section"
                            width={1280}
                            height={1080}
                        />
                    </div>
                    <div className="absolute inset-0 flex items-center z-20 bg-gradient-to-r from-black/40 to-transparent">
                        <Container>
                            <div className="max-w-md">
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase leading-tight">
                                    Heading 1
                                </h1>

                                <p className="text-white text-base md:text-lg mb-6">
                                    Lorem Ipsum
                                </p>

                                <Link
                                    href={"#"}
                                    className="rounded-full inline-block bg-white text-black font-medium py-3 px-8 uppercase text-sm hover:bg-gray-100 transition-colors"
                                >
                                    Shop Now
                                </Link>
                            </div>
                        </Container>
                    </div>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    );
};
