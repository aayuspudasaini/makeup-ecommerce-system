import { HeroSection } from "./_components/hero-section";
import { NewProducts } from "./_components/product-carousel";
import { ShopByCategory } from "./_components/shop-by-category";
import { WatchTheTutorials } from "./_components/watch-the-tutorials";

export default function Home() {
    return (
        <div className="">
            <HeroSection />
            <NewProducts />
            <ShopByCategory />
            <WatchTheTutorials />
        </div>
    );
}
