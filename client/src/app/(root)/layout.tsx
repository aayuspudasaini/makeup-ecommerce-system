import React from "react";
import { NavigationBar } from "./_components/navbar/navigation-bar";
import { Footer } from "./_components/footer";
import { WhatsAppContact } from "./_components/whatsapp-contact";
import Link from "next/link";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="">
            <div className="h-8 w-full border-b bg-gray-100/90 dark:bg-inherit" />
            <NavigationBar />
            <div className="h-10 w-full border-b bg-gray-100/90 dark:bg-inherit flex items-center justify-center">
                <Link
                    href={"/products"}
                    className="text-md font-semibold hover:underline underline-offset-1 capitalize"
                >
                    Get 20% off on your first product
                </Link>
            </div>

            {children}
            <WhatsAppContact />
            <Footer />
        </main>
    );
}
