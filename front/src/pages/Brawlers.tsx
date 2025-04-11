import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Typography,
    Input,
    Select,
    Option,
    Card,
    CardBody,
    CardHeader,
} from "@material-tailwind/react";

interface Brawler {
    id: number;
    name: string;
    rarity: string;
    class: string;
    health: number;
    damage: number;
    image: string;
}

const rarityColors: { [key: string]: string } = {
    'Comum': 'bg-gray-400',
    'Raro': 'bg-blue-400',
    'Super Raro': 'bg-purple-400',
    'Épico': 'bg-purple-600',
    'Mítico': 'bg-pink-500',
    'Lendário': 'bg-yellow-400'
};

const classColors: { [key: string]: string } = {
    'Dano': 'bg-red-500',
    'Tank': 'bg-blue-500',
    'Suporte': 'bg-green-500',
    'Assassino': 'bg-purple-500',
    'Controle': 'bg-yellow-500'
};

const brawlers: Brawler[] = [
    { id: 1, name: "Shelly", rarity: "Comum", class: "Atirador", health: 3600, damage: 1000, image: "/brawlers/shelly.png" },
    { id: 2, name: "Colt", rarity: "Comum", class: "Atirador", health: 3200, damage: 1200, image: "/brawlers/colt.png" },
    { id: 3, name: "Bull", rarity: "Raro", class: "Tanque", health: 5000, damage: 800, image: "/brawlers/bull.png" },
    { id: 55, name: "Hank", rarity: "Mítico", class: "Tanque", health: 5000, damage: 800, image: "/brawlers/hank.png" },
    { id: 56, name: "Pearl", rarity: "Mítico", class: "Atirador", health: 3200, damage: 1200, image: "/brawlers/pearl.png" },
    { id: 57, name: "Charlie", rarity: "Mítico", class: "Controle", health: 3000, damage: 900, image: "/brawlers/charlie.png" },
    { id: 58, name: "Mico", rarity: "Mítico", class: "Assassino", health: 3000, damage: 1200, image: "/brawlers/mico.png" },
    { id: 59, name: "Doug", rarity: "Mítico", class: "Suporte", health: 3400, damage: 800, image: "/brawlers/doug.png" },
    { id: 60, name: "Kit", rarity: "Mítico", class: "Assassino", health: 3000, damage: 1200, image: "/brawlers/kit.png" },
    { id: 61, name: "Larry & Lawrie", rarity: "Mítico", class: "Atirador", health: 3200, damage: 1200, image: "/brawlers/larrylawrie.png" },
    { id: 62, name: "Angelo", rarity: "Mítico", class: "Atirador", health: 3600, damage: 1000, image: "/brawlers/angelo.png" },
    { id: 63, name: "Melodie", rarity: "Mítico", class: "Atirador", health: 3200, damage: 1200, image: "/brawlers/melodie.png" }
];

const rarities = ["Todos", "Comum", "Raro", "Super Raro", "Lendário"];
const classes = ["Todos", "Atirador", "Tanque", "Suporte", "Lutador"];

export function Brawlers() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRarity, setSelectedRarity] = useState("Todos");
    const [selectedClass, setSelectedClass] = useState("Todos");

    const filteredBrawlers = brawlers.filter(brawler => {
        const matchesSearch = brawler.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRarity = selectedRarity === "Todos" || brawler.rarity === selectedRarity;
        const matchesClass = selectedClass === "Todos" || brawler.class === selectedClass;
        return matchesSearch && matchesRarity && matchesClass;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 animate-gradient">
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-8"
                >
                    <motion.div variants={itemVariants}>
                        <Typography variant="h2" className="text-4xl font-bold mb-4 text-white text-center">
                            Brawlers
                        </Typography>
                        <Typography variant="paragraph" className="text-gray-300 text-center max-w-2xl mx-auto">
                            Explore todos os brawlers disponíveis no Brawl Stars. Use os filtros para encontrar o brawler perfeito para seu estilo de jogo.
                        </Typography>
                    </motion.div>

                    <motion.div 
                        variants={itemVariants}
                        className="flex flex-col md:flex-row gap-4 justify-center items-center"
                    >
                        <div className="w-full md:w-64">
                            <Input
                                label="Pesquisar brawler"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="!text-white"
                                color="white"
                                crossOrigin={undefined}
                            />
                        </div>
                        <div className="w-full md:w-48">
                            <Select
                                label="Raridade"
                                value={selectedRarity}
                                onChange={(value) => setSelectedRarity(value || "Todos")}
                                className="!text-white"
                                color="white"
                            >
                                {rarities.map((rarity) => (
                                    <Option key={rarity} value={rarity}>
                                        {rarity}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div className="w-full md:w-48">
                            <Select
                                label="Classe"
                                value={selectedClass}
                                onChange={(value) => setSelectedClass(value || "Todos")}
                                className="!text-white"
                                color="white"
                            >
                                {classes.map((classe) => (
                                    <Option key={classe} value={classe}>
                                        {classe}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </motion.div>

                    {/* Lista de Brawlers */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {filteredBrawlers.map((brawler) => (
                            <motion.div
                                key={brawler.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Card className="bg-purple-800/90 backdrop-blur-sm border-0 shadow-lg">
                                    <CardHeader
                                        floated={false}
                                        shadow={false}
                                        className="h-48 bg-purple-700/50 rounded-t-xl"
                                    >
                                        <img
                                            src={brawler.image}
                                            alt={brawler.name}
                                            className="h-full w-full object-contain"
                                        />
                                    </CardHeader>
                                    <CardBody className="text-white">
                                        <Typography variant="h5" className="mb-2">
                                            {brawler.name}
                                        </Typography>
                                        <div className="flex justify-between text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${rarityColors[brawler.rarity]} text-white`}>
                                                {brawler.rarity}
                                            </span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${classColors[brawler.class]} text-white`}>
                                                {brawler.class}
                                            </span>
                                        </div>
                                        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                                            <div>
                                                <span className="text-gray-400">Vida:</span>
                                                <span className="ml-2">{brawler.health}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-400">Dano:</span>
                                                <span className="ml-2">{brawler.damage}</span>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
} 