"use client";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getAllCarousel } from "@/lib/api";
import { cn } from "@/lib/utils";
import { FaPause, FaPlay } from "react-icons/fa6";

export const HeroSection = () => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [playing, setPlaying] = React.useState<boolean>(false);
    const videoRef = React.useRef<HTMLVideoElement | null>(null);

    React.useEffect(() => {
        if (!api) {
            return;
        }
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    const scrollToIndex = (index: number) => {
        api?.scrollTo(index);
    };

    const { data, isLoading } = useQuery({
        queryKey: ["carousel"],
        queryFn: async () => {
            const res = await getAllCarousel();
            return res.data;
        },
    });

    const videoHandler = (control: "play" | "pause") => {
        if (videoRef.current) {
            if (control === "play") {
                videoRef.current.play();
                setPlaying(true);
            } else {
                videoRef.current.pause();
                setPlaying(false);
            }
        }
    };

    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <Carousel className="w-full full" setApi={setApi}>
            <CarouselContent>
                {data &&
                    data.data.map((item: any, i: number) => (
                        <CarouselItem className="relative" key={i}>
                            <div className="w-full h-[calc(100vh-12rem)]">
                                {item.type === "image" ? (
                                    <Image
                                        className="w-full h-full object-cover"
                                        src={`http://localhost:8000/${item.content}`}
                                        alt={item.title}
                                        width={1280}
                                        height={1080}
                                        priority
                                    />
                                ) : (
                                    <video
                                        ref={videoRef}
                                        className="h-auto w-full object-cover"
                                        src={`http://localhost:8000/${item.content}`}
                                        width={1200}
                                        height={800}
                                        autoPlay
                                        loop
                                        muted
                                    />
                                )}
                            </div>
                            <div className="absolute z-10 inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                            <div className="absolute z-20 left-30 bottom-24">
                                <div className="max-w-lg">
                                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase leading-tight">
                                        {item.title}
                                    </h1>

                                    <p className="text-white text-base md:text-lg mb-6">
                                        {item.description}
                                    </p>

                                    <Link
                                        href={"/products"}
                                        className={cn(
                                            buttonVariants({
                                                variant: "secondary",
                                                size: "lg",
                                                className:
                                                    "rounded-full font-semibold",
                                            })
                                        )}
                                    >
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                            {item.type === "video" && (
                                <div className="absolute z-20 top-4 right-4">
                                    <Button
                                        className="absolute top-2.5 right-2.5 cursor-pointer w-8 h-8 rounded-full"
                                        variant="secondary"
                                        onClick={() =>
                                            videoHandler(
                                                playing ? "pause" : "play"
                                            )
                                        }
                                    >
                                        {playing ? (
                                            <FaPause className="size-4" />
                                        ) : (
                                            <FaPlay className="size-4" />
                                        )}
                                    </Button>
                                </div>
                            )}
                            <div className="absolute flex gap-2.5 items-center left-1/2 bottom-4 z-10">
                                {data.data.map((_: any, i: number) => (
                                    <div
                                        onClick={() => api?.scrollTo(i)}
                                        key={i}
                                        className={cn(
                                            "size-2 rounded-full bg-secondary",
                                            {
                                                "w-6": current === i + 1,
                                            }
                                        )}
                                    />
                                ))}
                            </div>
                            <div className="absolute right-4 bottom-4 z-20 space-x-2.5">
                                <Button
                                    className="cursor-pointer aspect-square size-8 rounded-full"
                                    variant="secondary"
                                    onClick={() => scrollToIndex(i - 1)}
                                    disabled={i === 0}
                                >
                                    <ChevronLeft className="size-4" />
                                </Button>
                                <Button
                                    className="cursor-pointer aspect-square size-8 rounded-full"
                                    variant="secondary"
                                    onClick={() => scrollToIndex(i + 1)}
                                    disabled={i === data.data.length - 1}
                                >
                                    <ChevronRight className="size-4" />
                                </Button>
                            </div>
                        </CarouselItem>
                    ))}
            </CarouselContent>
        </Carousel>
    );
};
