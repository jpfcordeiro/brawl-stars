import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

interface MenuItem {
    title: string;
    subItems: string[];
}

const menuItems: MenuItem[] = [
    {
        title: "Brawlers",
        subItems: [
            "Todos os Brawlers",
            "Por Raridade",
            "Por Classe",
        ]
    },
    {
        title: "Modos de Jogo",
        subItems: [
            "Modos Ativos",
            "Modos Rotativos",
            "Modos Especiais",
        ]
    },
    {
        title: "Eventos",
        subItems: [
            "Eventos Atuais",
            "Próximos Eventos",
            "Histórico",
        ]
    },
    {
        title: "Mapas",
        subItems: [
            "Mapas Ativos",
            "Mapas Favoritos",
            "Criar Mapa",
        ]
    }
];

function NavListMenu() {
    const [openMenus, setOpenMenus] = React.useState<{ [key: string]: boolean }>({});
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const handleMenuOpen = (key: string) => {
        setOpenMenus(prev => {
            const newState = { ...prev };
            Object.keys(newState).forEach(k => {
                if (k !== key) newState[k] = false;
            });
            newState[key] = !prev[key];
            return newState;
        });
    };

    const renderItems = menuItems.map(({ title, subItems }, key) => (
        <Menu
            key={key}
            open={openMenus[key] || false}
            handler={() => handleMenuOpen(key.toString())}
            placement="bottom"
            allowHover={false}
        >
            <MenuHandler>
                <Typography as="div" variant="small" className="font-medium" placeholder={undefined}>
                    <ListItem
                        className="flex items-center gap-2 py-2 px-4 font-medium text-white hover:bg-purple-800 rounded-lg transition-colors cursor-pointer"
                        selected={openMenus[key] || isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                        placeholder={undefined}
                    >
                        {title}
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`hidden h-3 w-3 transition-transform lg:block ${openMenus[key] ? "rotate-180" : ""}`}
                        />
                    </ListItem>
                </Typography>
            </MenuHandler>
            <MenuList 
                className="w-max rounded-xl bg-purple-900 border-0 p-2" 
                placeholder={undefined}
            >
                {subItems.map((item, index) => (
                    <MenuItem 
                        key={index} 
                        className="text-white hover:bg-purple-800 px-4 py-2 rounded-lg" 
                        placeholder={undefined}
                    >
                        {item}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    ));

    return (
        <div className="flex items-center gap-6">
            {renderItems}
        </div>
    );
}

function NavList() {
    return (
        <List className="flex items-center gap-6 p-0" placeholder={undefined}>
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
                <Typography
                    as="a"
                    href="#"
                    variant="h6"
                    className="mr-4 cursor-pointer py-1.5 text-3xl font-extrabold tracking-tight !text-yellow-400 hover:!text-yellow-300 transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
                    placeholder={undefined}
                >
                    BrawlerHUB
                </Typography>
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