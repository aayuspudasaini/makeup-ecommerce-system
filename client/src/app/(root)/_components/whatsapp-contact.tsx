import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { AiOutlineWhatsApp } from "react-icons/ai";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const WhatsAppContact: React.FC = () => {
    return (
        <Link
            href={"https://api.whatsapp.com/send/?phone=977980000000"}
            className={cn(
                "fixed bottom-6 right-6 drop-shadow-md",
                buttonVariants({
                    size: "icon",
                    className:
                        "rounded-full h-12 w-12 bg-[#075E54] hover:bg-[#075E54]/90",
                })
            )}
            target="_blank"
        >
            <AiOutlineWhatsApp className="size-6 text-gray-50" />
        </Link>
    );
};
