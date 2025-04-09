"use client";
import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { UserAvatar } from "@/components/reusable/user-avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const TestomonialCarousel = () => {
    const [api, setApi] = React.useState<CarouselApi>();

    React.useEffect(() => {
        if (!api) {
            return;
        }
    }, [api]);

    const scrollToIndex = (index: number) => {
        api?.scrollTo(index);
    };

    const testimonials = [
        {
            name: "Jessica Taylor",
            rating: 5,
            review: "I absolutely loved the convenience of having a professional makeup artist come to my home! The service was top-notch, and I felt pampered throughout the entire experience. My makeup looked flawless for my special event. Highly recommend this service!",
            image: "/images/customer1.jpg",
        },
        {
            name: "Olivia Martin",
            rating: 5,
            review: "As a wedding planner, I am always looking for reliable and skilled makeup artists for my clients. This service exceeded my expectations! The artist was on time, professional, and created the perfect look for my bride. The convenience of having someone come to the house is a game-changer.",
            image: "/images/customer2.jpg",
        },
        {
            name: "Lily Johnson",
            rating: 4,
            review: "I've tried a lot of makeup services, but this one really stands out. The stylist was very knowledgeable and gave me tips on how to improve my makeup routine. The only reason I'm not giving 5 stars is that the appointment was slightly delayed, but the makeup was worth the wait!",
            image: "/images/customer3.jpg",
        },
        {
            name: "Sophie Williams",
            rating: 5,
            review: "I had an amazing experience with this service. Having a makeup artist come to my home before an important meeting saved me so much time, and I felt confident and ready. The quality of the makeup was superb, and I felt like I was treated like a VIP. I'll definitely book again.",
            image: "/images/customer4.jpg",
        },
        {
            name: "Ava Brown",
            rating: 4,
            review: "Being a fitness coach, I don't often get the time to visit a salon, so I loved how this service came to me. The makeup artist understood my style and created a look that felt fresh and natural. The service was great, and I would book again for sure!",
            image: "/images/customer5.jpg",
        },
    ];

    const RenderStar = ({ rating }: { rating: number }) => {
        return (
            <div className="flex flex-row gap-1">
                {[...Array(rating)].map((_, i) => (
                    <FaStar key={i} className="size-4 text-yellow-400" />
                ))}
            </div>
        );
    };

    return (
        <div className="w-full h-full">
            <Carousel
                opts={{
                    loop: false,
                }}
                setApi={setApi}
                className="w-full h-full"
            >
                <CarouselContent>
                    {testimonials.map((item, i) => (
                        <CarouselItem className="relative h-[800px]" key={i}>
                            <div className="w-full h-[800px]">
                                <Image
                                    className="w-full h-full overflow-hidden object-cover"
                                    src={item.image}
                                    alt={item.name}
                                    width={1200}
                                    height={200}
                                    priority
                                />
                            </div>
                            <div className="absolute w-full z-50 bottom-0 p-6 bg-gray-900/80 backdrop-filter backdrop-blur-2xl  bg-opacity-30">
                                <div className="space-y-4">
                                    {/* Rating */}
                                    <RenderStar rating={item.rating} />
                                    {/* User Review */}
                                    <p className="text-lg text-gray-100">
                                        &quot; {item.review} &quot;
                                    </p>

                                    {/* User Info */}
                                    <div>
                                        <div className="flex flex-row gap-2.5 items-center">
                                            <UserAvatar
                                                src={item.image}
                                                className="size-8"
                                                name={item.name}
                                            />
                                            <div className="flex flex-col">
                                                <p className="font-medium text-gray-50 text-sm">
                                                    {item.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-6 right-12 flex flex-row justify-end gap-4">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="cursor-pointer text-gray-100 rounded-full border border-gray-100/40"
                                                onClick={() =>
                                                    scrollToIndex(i - 1)
                                                }
                                                disabled={i === 0}
                                            >
                                                <ChevronLeft className="size-6 aspect-square" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="cursor-pointer text-gray-100 rounded-full border border-gray-100/40"
                                                onClick={() =>
                                                    scrollToIndex(i + 1)
                                                }
                                                disabled={
                                                    i ===
                                                    testimonials.length - 1
                                                }
                                            >
                                                <ChevronRight className="size-6 aspect-square" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};
