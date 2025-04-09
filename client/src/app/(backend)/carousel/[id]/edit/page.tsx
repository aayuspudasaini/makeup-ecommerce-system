import React from "react";
import { CarouselForm } from "../../_components/carousel-form";
import { getCarouselById } from "@/lib/api";

type Params = { params: Promise<{ id: string }> };

export default async function CarouselEditPage({ params }: Params) {
    const { id } = await params;

    const { data } = await getCarouselById(id);

    return (
        <React.Fragment>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-xl font-bold">Carousel</h3>
                    <p className="text-muted-foreground text-md font-normal">
                        Edit a carousel
                    </p>
                </div>
            </div>
            <CarouselForm type="edit" res={data.data} id={id} />
        </React.Fragment>
    );
}
