import { Container } from "@/components/global/container";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ProductCard } from "../../_components/product-card";

export default function AllProductPage() {
    return (
        <Container>
            <section className="py-16 flex flex-col items-center gap-y-4 justify-center">
                <p className="font-semibold text-md text-secondary-foreground/80">
                    EYES
                </p>
                <h1 className="text-2xl md:text-4xl tracking-wide uppercase font-extrabold">
                    All Products
                </h1>
                <p className="text-medium text-muted-foreground text-lg max-w-2xl text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequuntur, illum explicabo natus perspiciatis incidunt
                    obcaecati.
                </p>
                <div className="mt-2.5 max-w-2xl mx-auto flex flex-wrap items-center  justify-center gap-2.5">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Link
                            key={i}
                            className={cn(
                                buttonVariants({
                                    size: "lg",
                                    variant: "outline",
                                    className: "rounded-none",
                                })
                            )}
                            href={'/collections/all-products?category="eyes"'}
                        >
                            Category{i}
                        </Link>
                    ))}
                </div>
            </section>
            {/* Filter Section */}
            <section className="py-12 w-full ">
                <div className="">
                    <p className="text-lg font-semibold uppercase">
                        All Products
                        <span className="text-sm font-medium text-muted-foreground ml-2">
                            108 products
                        </span>
                    </p>
                </div>
                <div className="grid grid-flow-col grid-cols-12 gap-2.5">
                    <aside className="col-span-3">Left</aside>
                    <main className="col-span-9 grid grid-cols-3 gap-4">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <ProductCard key={i} />
                        ))}
                    </main>
                </div>
            </section>
        </Container>
    );
}
