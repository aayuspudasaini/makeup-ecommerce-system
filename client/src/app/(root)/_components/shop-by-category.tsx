import { Container } from "@/components/global/container";
import Link from "next/link";
import { CategoryCard } from "./category-card";
import { iCategoryProps } from "@/types/category";

export const ShopByCategory = ({
    categories,
}: {
    categories: iCategoryProps[];
}) => {
    return (
        <Container className="flex flex-col gap-y-6 py-6 md:py-12">
            <div className="flex items-center justify-between gap-6">
                <h2 className="text-xl md:text-2xl font-bold leading-6 tracking-tight text-center">
                    Shop By Category
                </h2>

                <Link
                    className="text-muted-foreground hover:text-secondary-foreground hover:underline font-medium text-md"
                    href="/collections"
                >
                    View All
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categories.slice(0, 6).map((category: any, i: number) => (
                    <CategoryCard {...category} key={i} />
                ))}
            </div>
        </Container>
    );
};
