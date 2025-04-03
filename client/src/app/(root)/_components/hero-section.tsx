"use client";
import React from "react";
import { Container } from "@/components/global/container";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
    const [api, setApi] = React.useState<CarouselApi>();
    return (
        <Carousel className="w-full full" setApi={setApi}>
            <CarouselContent>
                {Array.from({ length: 3 }).map((_, i) => (
                    <CarouselItem className="relative" key={i}>
                        <div className="w-full h-[calc(100vh-12rem)]">
                            <Image
                                className="w-full h-full object-cover"
                                src="/images/hero.jpg"
                                alt="Hero Section"
                                width={1280}
                                height={1080}
                            />
                        </div>
                        <div className="absolute z-10 inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                        <div className="absolute z-20 left-4 bottom-0">
                            <Container>
                                <div className="max-w-md">
                                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase leading-tight">
                                        Heading {i}
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
                ))}
                <div className="absolute right-4 bottom-4 z-20">
                    <Button
                        className="cursor-pointer aspect-square size-8 rounded-full"
                        variant="secondary"
                        disabled={!!api?.canScrollPrev}
                        onClick={() => api?.scrollTo(2)}
                    >
                        <ChevronLeft className="size-4" />
                    </Button>
                    <Button
                        className="cursor-pointer aspect-square size-8 rounded-full"
                        variant="secondary"
                        onClick={() => api?.scrollTo(2)}
                    >
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            </CarouselContent>
        </Carousel>
    );
};
