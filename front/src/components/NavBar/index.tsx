import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

interface MenuItem {
    title: string;
    href: string;
}

const menuItems: MenuItem[] = [
    {
        title: "Brawlers",
        href: "/brawlers"
    },
    {
        title: "Modos de Jogo",
        href: "/modos"
    },
    {
        title: "Eventos",
        href: "/eventos"
    },
    {
        title: "Mapas",
        href: "/mapas"
    },
    {
        title: "Icones",
        href: "/icones"
    }
];

function NavListMenu() {
    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-3">
            {menuItems.map(({ title, href }) => (
                <NavLink
                    key={href}
                    to={href}
                    className={({ isActive }) =>
                        `py-2 px-4 rounded-lg font-medium transition-colors ${
                            isActive
                                ? "bg-yellow-400 text-purple-950"
                                : "text-white hover:bg-purple-800"
                        }`
                    }
                >
                    {title}
                </NavLink>
            ))}
        </div>
    );
}

export function NavigationbarWithDropdownMultilevelMenu() {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    return (
        <nav className="sticky top-0 z-50 w-full px-4 py-2 bg-purple-900/95 backdrop-blur border-b border-purple-700">
            <div className="container mx-auto flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                    <img src="/src/assets/favicon.png" alt="BrawlerHUB" className="h-8 w-8 object-contain" />
                    <Link to="/">
                        <span className="mr-4 cursor-pointer py-1.5 text-3xl font-extrabold tracking-tight text-yellow-400 hover:text-yellow-300 transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                            BrawlerHUB
                        </span>
                    </Link>
                </div>
                <div className="hidden lg:block">
                    <NavListMenu />
                </div>
                <button
                    type="button"
                    className="lg:hidden text-white p-2 rounded-md hover:bg-purple-800"
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </button>
            </div>

            {openNav && (
                <div className="lg:hidden pt-3 pb-1 container mx-auto">
                    <NavListMenu />
                </div>
            )}
        </nav>
    );
}