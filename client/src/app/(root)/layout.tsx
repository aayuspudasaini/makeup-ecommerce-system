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
            <NavigationBar />
            {children}
            <WhatsAppContact />
            <Footer />
        </main>
    );
}
