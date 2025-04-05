import { getAllCarousel, getAllCategory } from "@/lib/api";
import { HeroSection } from "./_components/hero-section";
import { NewProducts } from "./_components/product-carousel";
import { ShopByCategory } from "./_components/shop-by-category";
import { WatchTheTutorials } from "./_components/watch-the-tutorials";

export default async function Home() {
    const { data: catData } = await getAllCategory();
    return (
        <div className="">
            <HeroSection />
            <NewProducts />
            {catData && <ShopByCategory categories={catData.data} />}
            <WatchTheTutorials />
        </div>
    );
}
