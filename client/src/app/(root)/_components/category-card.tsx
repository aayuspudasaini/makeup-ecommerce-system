import Image from "next/image";
import Link from "next/link";

interface iCategoryProps {
    name: string;
    image: string;
    slug: string;
}

export const CategoryCard: React.FC<iCategoryProps> = ({
    name,
    image,
    slug,
}) => {
    return (
        <Link
            href={`/collections/${slug}`}
            className="group cursor-pointer relative w-full"
        >
            <div className="aspect-auto w-full sm:h-72 overflow-hidden">
                <Image
                    className="object-cover w-full h-full group-hover:scale-110 transition-all duration-700"
                    src={
                        image
                            ? `${process.env.NEXT_PUBLIC_BACKEND_ORIGIN_URL}/${image}`
                            : "/kosas.png"
                    }
                    alt={name}
                    width={1200}
                    height={1200}
                    priority
                />
            </div>
            <div className="w-full h-full bg-black absolute top-0 opacity-25" />
            <p className="w-full text-center absolute bottom-8 text-xl font-bold text-white z-10">
                {name}
            </p>
        </Link>
    );
};
