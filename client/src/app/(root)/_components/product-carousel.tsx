"use client";
import { Container } from "@/components/global/container";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { ProductCard } from "./product-card";
import React from "react";

export const NewProducts = () => {
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
        <Container className="flex flex-col gap-y-6 py-6 md:py-12">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <h2 className="text-xl md:text-2xl font-bold leading-6 tracking-tight text-center">
                        New Products
                    </h2>

                    <Link
                        className="text-muted-foreground hover:text-secondary-foreground hover:underline font-medium text-md"
                        href="/collections/shop"
                    >
                        View All
                    </Link>
                </div>
                <div className="flex gap-2.5">
                    <Button
                        className="rounded-full w-8 h-8 cursor-pointer"
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
                        className="rounded-full w-8 h-8 cursor-pointer"
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
                            <ProductCard />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </Container>
    );
};
