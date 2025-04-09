import React from "react";
import { CarouselForm } from "../_components/carousel-form";

export default async function CarouselCreatePage() {
    return (
        <React.Fragment>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-xl font-bold">Carousel</h3>
                    <p className="text-muted-foreground text-md font-normal">
                        Add a new carousel
                    </p>
                </div>
            </div>
            <CarouselForm type="create" />
        </React.Fragment>
    );
}
