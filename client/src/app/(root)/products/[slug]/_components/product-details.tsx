import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaRegHeart } from "react-icons/fa";
import { VideoCarousel } from "./video-carousel";
import { CgShoppingBag } from "react-icons/cg";
import { MdPayments } from "react-icons/md";
export const ProductDetails = () => {
    return (
        <div className="py-2.5 space-y-4">
            <div className="space-y-2.5">
                {/* <Badge
                    className="font-semibold text-sm rounded-sm left-2.5 bottom-2.5"
                    variant="secondary"
                >
                    New
                </Badge> */}
                <h1 className="text-xl font-bold md:text-2xl">
                    Cosmetic Products
                </h1>
                <p className="text-md text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Amet illum fugit ab iure culpa commodi libero voluptatum
                    quidem. Odit labore dignissimos accusamus modi? Ab, facilis
                    eveniet soluta est quibusdam ad.
                </p>
                {/* <div className="flex items-center gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                    <FaStar key={i} className="size-3" />
                ))}
                <p className="font-semibold text-sm">3.5</p>
            </div> */}
                <div className="space-y-0.5">
                    <p className="text-lg font-semibold">Rs. 350</p>
                    <p className="text-sm">
                        <span className="line-through text-muted-foreground">
                            Rs. 450
                        </span>
                        <span className="ml-2">-20%</span>
                    </p>
                </div>
            </div>
            <div className="flex flex-row gap-x-2.5 ">
                <Button
                    variant="outline"
                    size="icon"
                    className="size-10 cursor-pointer"
                    title="Save to Wishlist"
                >
                    <FaRegHeart className="size-4 text-muted-foreground" />
                </Button>
                <div className="flex-1 grid grid-cols-2 gap-2.5">
                    <Button
                        variant="default"
                        size="lg"
                        className="cursor-pointer"
                        title="Add to cart"
                    >
                        <MdPayments className="size-4" />
                        Buy Now
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="cursor-pointer"
                        title="Add to cart"
                    >
                        <CgShoppingBag className="size-4" />
                        Add to Cart
                    </Button>
                </div>
            </div>
            <VideoCarousel />
        </div>
    );
};
