import React from "react";
import { NavigationBar } from "./_components/navbar/navigation-bar";
import { Footer } from "./_components/footer";
import { WhatsAppContact } from "./_components/whatsapp-contact";
import Link from "next/link";
import { Container } from "@/components/global/container";
import { cn } from "@/lib/utils";

const links = [
    {
        title: "Help",
        href: "#",
    },
    {
        title: "Signup",
        href: "/signup",
    },
    {
        title: "Join our class",
        href: "/class-booking",
    },
];

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="">
            <div className="h-8 flex flex-col justify-center w-full border-b bg-gray-100/60 dark:bg-inherit">
                <Container>
                    <ul className="flex items-center justify-end gap-2.5 mr-auto">
                        {links.map((item, i) => (
                            <li
                                className="text-sm text-muted-foreground flex items-center gap-x-2.5"
                                key={i}
                            >
                                <Link
                                    className="flex items-center gap-x-2.5 hover:underline hover:text-secondary-foreground"
                                    href={item.href}
                                >
                                    {item.title}
                                </Link>
                                <hr
                                    className={cn(
                                        "h-4  w-px bg-muted-foreground",
                                        {
                                            hidden: i === 2,
                                        }
                                    )}
                                />
                            </li>
                        ))}
                    </ul>
                </Container>
            </div>
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
