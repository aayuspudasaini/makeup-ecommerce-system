import React from "react";
import { getCategoryById } from "@/lib/api";
import Loading from "@/app/(backend)/loading";
import { ProductForm } from "../../_components/product-form";

type Params = { params: Promise<{ id: string }> };

export default async function CategoryEditPage({ params }: Params) {
    const { id } = await params;

    const { data } = await getCategoryById(id);

    if (!data) {
        return <Loading />;
    }

    return (
        <React.Fragment>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-xl font-bold">Category</h3>
                    <p className="text-muted-foreground text-md font-normal">
                        Create a new category
                    </p>
                </div>
            </div>
            <ProductForm type="edit" res={data?.data} id={id} />
        </React.Fragment>
    );
}
