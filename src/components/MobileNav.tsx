import Link from 'next/link';
import { PiDroneBold } from 'react-icons/pi';
import {
    Home,
    Menu
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from './ui/button';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiOutlineBellAlert } from "react-icons/hi2";
const MobileNav = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold"
                    >
                        <PiDroneBold className="h-6 w-6" />
                        <span className="sr-only">WEB-MONITOR</span>
                    </Link>
                    <Link
                        href="/overview"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                        <Home className="h-5 w-5" />
                        Overview
                    </Link>
                    <Link
                        href="/dashboard"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                        <MdOutlineSpaceDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        href="/alert"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl  px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                        < HiOutlineBellAlert className="h-5 w-5" />
                        Alert
                        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                            2
                        </Badge>
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
