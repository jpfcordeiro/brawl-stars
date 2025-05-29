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

import { useBrawler } from '../context/BrawlerContext';


const rarityColors: { [key: string]: string } = {
    'Comum': 'bg-gray-400',
    'Raro': 'bg-blue-400',
    'Super Raro': 'bg-purple-400',
    'Épico': 'bg-purple-600',
    'Mítico': 'bg-pink-500',
    'Lendário': 'bg-yellow-400',
    'Ultra Legendary': 'bg-yellow-400'
};

const classColors: { [key: string]: string } = {
    'Dano': 'bg-red-500',
    'Tank': 'bg-blue-500',
    'Suporte': 'bg-green-500',
    'Assassino': 'bg-purple-500',
    'Controle': 'bg-yellow-500',
    'Unknown': 'bg-gray-500'
};


export function Brawlers() {
    const brawlers = useBrawler();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRarity, setSelectedRarity] = useState("Todos");
    const [selectedClass, setSelectedClass] = useState("Todos");

    const uniqueRarities = ["Todos", ...new Set(brawlers.brawlers.map((b: any) => b.rarity.name))];
    const uniqueClasses = ["Todos", ...new Set(brawlers.brawlers.map((b: any) => b.class.name))];

    const filteredBrawlers = brawlers.brawlers.filter((brawler: any) => {
        const matchesSearch = brawler.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRarity = selectedRarity === "Todos" || brawler.rarity.name === selectedRarity;
        const matchesClass = selectedClass === "Todos" || brawler.class.name === selectedClass;
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
                        className="flex flex-col md:flex-row gap-6 justify-center items-center bg-purple-800/50 p-8 rounded-2xl backdrop-blur-sm w-full max-w-5xl mx-auto"
                    >
                        <div className="w-full md:w-80">
                            <Input
                                label="Pesquisar brawler"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="!text-white !bg-purple-700/50 !text-lg p-1 rounded"
                                color="white"
                                crossOrigin={undefined}
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                }
                            />
                        </div>
                        <div className="w-full md:w-64">
                            <Select
                                placeholder="Raridade"
                                value={selectedRarity}
                                onChange={(value) => setSelectedRarity(value || "Todos")}
                                className="!text-white !bg-purple-700/50 !text-lg"
                                color="white"
                                animate={{
                                    mount: { y: 0 },
                                    unmount: { y: 25 },
                                }}
                                menuProps={{
                                    className: "bg-purple-800/90 backdrop-blur-sm"
                                }}
                            >
                                {uniqueRarities.map((rarity) => (
                                    <Option key={rarity} value={rarity} className="text-white hover:bg-purple-600 text-lg">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-4 h-4 rounded-full ${rarityColors[rarity] || 'bg-gray-400'}`} />
                                            {rarity}
                                        </div>
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div className="w-full md:w-64">
                            <Select
                                placeholder="Classe"
                                value={selectedClass}
                                onChange={(value) => setSelectedClass(value || "Todos")}
                                className="!text-white !bg-purple-700/50 !text-lg"
                                color="white"
                                animate={{
                                    mount: { y: 0 },
                                    unmount: { y: 25 },
                                }}
                                menuProps={{
                                    className: "bg-purple-800/90 backdrop-blur-sm"
                                }}
                            >
                                {uniqueClasses.map((classe) => (
                                    <Option key={classe} value={classe} className="text-white hover:bg-purple-600 text-lg">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-4 h-4 rounded-full ${classColors[classe] || 'bg-gray-400'}`} />
                                            {classe}
                                        </div>
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </motion.div>

                    {/* Lista de Brawlers */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                    >
                        {filteredBrawlers.map((brawler) => (
                            <motion.div
                                key={brawler.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Card className="bg-purple-800/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                                    <CardHeader
                                        floated={false}
                                        shadow={false}
                                        className="h-40 bg-purple-700/50 rounded-t-2xl p-4"
                                    >
                                        <div className="relative w-full h-full">
                                            <img
                                                src={brawler.imageUrl2}
                                                alt={brawler.name}
                                                className="h-full w-full object-contain rounded-xl"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 rounded-b-xl">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-white text-xs font-semibold">HP</span>
                                                    <span className="text-white text-xs">7200</span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full h-2">
                                                    <div 
                                                        className="bg-green-500 h-2 rounded-full" 
                                                        style={{ width: '100%' }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="text-white p-4">
                                        <Typography variant="h5" className="mb-2 text-center">
                                            {brawler.name}
                                        </Typography>
                                        <div className="flex justify-between text-sm mb-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${rarityColors[brawler.rarity.name] || 'bg-yellow-400'} text-white`}>
                                                {brawler.rarity.name}
                                            </span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${classColors[brawler.class.name] || 'bg-gray-400'} text-white`}>
                                                {brawler.class.name}
                                            </span>
                                        </div>
                                        <div className="mt-2 text-sm">
                                            <p className="text-gray-300 line-clamp-2">{brawler.description}</p>
                                        </div>
                                        <div className="mt-3 flex gap-2">
                                            {brawler.starPowers?.slice(0, 2).map((power) => (
                                                <img 
                                                    key={power.id}
                                                    src={power.imageUrl} 
                                                    alt={power.name}
                                                    className="w-8 h-8 rounded-full bg-purple-900/50 p-1"
                                                    title={power.name}
                                                />
                                            ))}
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