import React from "react";
import { ProductForm } from "../_components/product-form";

export default async function CategoryCreatePage() {
    return (
        <React.Fragment>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-xl font-bold">Product</h3>
                    <p className="text-muted-foreground text-md font-normal">
                        Create a new Product
                    </p>
                </div>
            </div>
            <ProductForm type="create" />
        </React.Fragment>
    );
}
