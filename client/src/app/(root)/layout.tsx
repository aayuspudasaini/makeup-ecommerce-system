import React from "react";
import { NavigationBar } from "./_components/navbar/navigation-bar";
import { Footer } from "./_components/footer";
import { WhatsAppContact } from "./_components/whatsapp-contact";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <div className="h-8 w-full border-b bg-gray-100/90" />
            <NavigationBar />
            <div className="h-8 w-full border-b bg-gray-100/90 dark:bg-inherit" />

            {children}
            <WhatsAppContact />
            <Footer />
        </main>
    );
}
