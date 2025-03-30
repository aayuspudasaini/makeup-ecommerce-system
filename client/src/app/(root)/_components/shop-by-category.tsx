import Image from "next/image";
import { Container } from "@/components/global/container";
import Link from "next/link";

export const ShopByCategory = () => {
    return (
        <Container className="flex flex-col gap-y-6 py-6 md:py-12">
            <div className="flex items-center justify-between gap-6">
                <h2 className="text-xl md:text-2xl font-bold leading-6 tracking-tight text-center">
                    Shop By Category
                </h2>

                <Link
                    className="text-muted-foreground hover:text-secondary-foreground hover:underline font-medium text-md"
                    href="/collections/category"
                >
                    View All
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
            </div>
        </Container>
    );
};

const CategoryCard: React.FC = () => {
    return (
        <div className="group cursor-pointer relative w-full">
            <div className="aspect-auto w-full sm:h-72 overflow-hidden">
                <Image
                    className="object-cover w-full h-full group-hover:scale-110 transition-all duration-700"
                    src="/images/kosas.png"
                    alt="Category Image"
                    width={1200}
                    height={1200}
                    priority
                />
            </div>
            <div className="w-full h-full bg-black absolute top-0 opacity-25" />
            <p className="w-full text-center absolute bottom-8 text-xl font-bold text-white z-50">
                Eyes
            </p>
        </div>
    );
};
