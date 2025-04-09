import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/modal-provider";

const font = Manrope({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
            <body className={`${font.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Toaster
                        toastOptions={{ duration: 1000 }}
                        closeButton
                        richColors
                        position="top-right"
                    />
                    <TailwindIndicator position="bottomLeft" />

                    <QueryProvider>
                        {children}
                        <ModalProvider />
                    </QueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
