import { Container } from "@/components/global/container";
import { ImageCarousel } from "./_components/image-carousel";
import { ProductDetails } from "./_components/product-details";
import { ProductCard } from "../../_components/product-card";
export default function ProductItemPage() {
    return (
        <Container>
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
                <div className="sticky top-16">
                    <ImageCarousel />
                </div>
                <div>
                    <ProductDetails />
                </div>
            </div>

            <div className="col-span-full flex flex-col justify-between gap-8 py-16">
                <div className="flex flex-col gap-y-2">
                    <h2 className="uppercase text-xl md:text-2xl font-bold leading-6 tracking-tight">
                        Products you might like
                    </h2>
                    <p className="text-muted-foreground">
                        Lorem ipsum dolor sit amet
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <ProductCard key={i} />
                    ))}
                </div>
            </div>
        </Container>
    );
}
