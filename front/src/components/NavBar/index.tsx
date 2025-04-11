import React from "react";
import { Link } from "react-router-dom";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
    List,
    ListItem,
} from "@material-tailwind/react";
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
        href: "#"
    },
    {
        title: "Eventos",
        href: "#"
    },
    {
        title: "Mapas",
        href: "#"
    }
];

function NavListMenu() {
    return (
        <div className="flex items-center gap-6">
            {menuItems.map(({ title, href }, key) => (
                <Typography as="div" variant="small" className="font-medium" key={key}>
                    <ListItem
                        className="flex items-center gap-2 py-2 px-4 font-medium hover:bg-purple-800 rounded-lg transition-colors cursor-pointer"
                    >
                        <Link to={href} style={{color: "white"}}>{title}</Link>
                    </ListItem>
                </Typography>
            ))}
        </div>
    );
}

function NavList() {
    return (
        <List className="flex items-center gap-6 p-0">
            <NavListMenu />
        </List>
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
        <Navbar 
            className="sticky top-0 z-50 w-full max-w-none rounded-none px-4 py-2 bg-purple-900" 
            placeholder={undefined}
        >
            <div className="container mx-auto flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                    <img src="/src/assets/favicon.png" alt="BrawlerHUB" className="h-8 w-8 object-contain" />
                    <Link to="/">
                        <Typography
                            as="span"
                            variant="h6"
                            className="mr-4 cursor-pointer py-1.5 text-3xl font-extrabold tracking-tight !text-yellow-400 hover:!text-yellow-300 transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
                            placeholder={undefined}
                        >
                            BrawlerHUB
                        </Typography>
                    </Link>
                </div>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <IconButton
                    variant="text"
                    className="lg:hidden text-white"
                    onClick={() => setOpenNav(!openNav)}
                    placeholder={undefined}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav} className="lg:hidden">
                <NavList />
            </Collapse>
        </Navbar>
    );
}