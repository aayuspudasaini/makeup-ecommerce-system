import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
export const ProductCard = () => {
    return (
        <div className="group cursor-pointer">
            <div className="relative">
                <div className="w-full h-72 overflow-hidden">
                    <Image
                        className="object-cover h-full w-full group-hover:scale-110 transition-all duration-300"
                        src="/images/kosas.png"
                        alt="Product"
                        width={1200}
                        height={1080}
                    />
                </div>
                <div className="w-full h-full bg-black absolute top-0 opacity-8" />
                <Badge
                    className="absolute font-semibold text-sm rounded-sm left-2.5 bottom-2.5"
                    variant="secondary"
                >
                    New
                </Badge>

                <div className="absolute z-10 top-2.5 right-2.5">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="w-8 h-8 rounded-full cursor-pointer"
                        title="Save to Wishlist"
                    >
                        <FaRegHeart className="size-4 text-muted-foreground" />
                    </Button>
                </div>
            </div>
            <div className="py-2 space-y-1">
                <div className="flex items-center justify-between">
                    <h5 className="text-lg font-semibold">
                        Note Lash Code Mascara
                    </h5>
                    <div className="flex items-center gap-1">
                        <FaStar className="size-3" />
                        <p className="font-semibold text-sm">3.5</p>
                    </div>
                </div>
                <p className="text-muted-foreground">250ml</p>
                <p className="text-md font-medium">Rs. 350</p>
                <p className="text-sm">
                    <span className="line-through text-muted-foreground">
                        Rs. 450
                    </span>
                    <span className="ml-2">-20%</span>
                </p>
            </div>
        </div>
    );
};
