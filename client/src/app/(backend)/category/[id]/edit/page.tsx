import React from "react";
import { CategoryForm } from "../../_components/category-form";

export default async function CategoryEditPage() {
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
            <CategoryForm type="edit" />
        </React.Fragment>
    );
}
