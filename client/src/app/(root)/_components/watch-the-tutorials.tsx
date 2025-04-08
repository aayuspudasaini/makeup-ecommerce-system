import { Container } from "@/components/global/container";
import { VideoCard } from "./video-card";

export const WatchTheTutorials = () => {
    return (
        <Container className="flex flex-col gap-y-12 py-6 md:py-12">
            <div className="flex flex-col gap-6 items-center">
                <h2 className="text-xl md:text-2xl font-bold leading-6 tracking-tight text-center">
                    Watch the Tutorials
                </h2>
                <p className="text-center max-w-3xl text-md font-normal text-muted-foreground mx-auto">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Animi quam officia dolor ratione molestiae, perferendis
                    dolore nam natus porro facilis voluptatibus tempore eos,
                    atque hic nemo recusandae! Porro, iusto repudiandae?
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <VideoCard url="/videos/makeup-tutorial.mp4" />
                <VideoCard url="/videos/makeup-tutorial.mp4" />
                <VideoCard url="/videos/makeup-tutorial.mp4" />
                <VideoCard url="/videos/makeup-tutorial.mp4" />
            </div>
        </Container>
    );
};
