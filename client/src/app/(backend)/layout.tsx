import { AppSidebar } from "@/app/(backend)/_components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppBreadCrumb } from "./_components/app-breadcrumb";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { NavUser } from "./_components/app-user-profile";

export default function BackendLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-[3.6rem] border-b shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[3.6rem]  dark:bg-black">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <AppBreadCrumb />
                    </div>
                    <div className="ml-auto flex items-center gap-2 pr-4">
                        <ThemeSwitcher />
                        <NavUser
                            user={{
                                name: "Biraj Kc",
                                email: "biraj.kcr7@gmail.com",
                            }}
                        />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 bg-gray-200/40 dark:bg-black/70">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
