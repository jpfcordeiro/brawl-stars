import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

const rarityOrder: Record<string, number> = {
    'Comum': 1,
    'Raro': 2,
    'Super Raro': 3,
    'Épico': 4,
    'Mítico': 5,
    'Lendário': 6,
    'Ultra Legendary': 7,
};


export function Brawlers() {
    const brawlers = useBrawler();
    type BrawlerItem = typeof brawlers.brawlers[number];
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRarity, setSelectedRarity] = useState("Todos");
    const [selectedClass, setSelectedClass] = useState("Todos");
    const [sortBy, setSortBy] = useState("raridade");

    const uniqueRarities = ["Todos", ...new Set(brawlers.brawlers.map((b) => b.rarity.name))];
    const uniqueClasses = ["Todos", ...new Set(brawlers.brawlers.map((b) => b.class.name))];

    const filteredBrawlers = brawlers.brawlers.filter((brawler) => {
        const matchesSearch = brawler.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRarity = selectedRarity === "Todos" || brawler.rarity.name === selectedRarity;
        const matchesClass = selectedClass === "Todos" || brawler.class.name === selectedClass;
        return matchesSearch && matchesRarity && matchesClass;
    });

    const sortedBrawlers = useMemo(() => {
        const list = [...filteredBrawlers];

        if (sortBy === 'nome-az') {
            return list.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
        }

        if (sortBy === 'nome-za') {
            return list.sort((a, b) => b.name.localeCompare(a.name, 'pt-BR'));
        }

        if (sortBy === 'raridade') {
            return list.sort((a, b) => (rarityOrder[b.rarity.name] || 0) - (rarityOrder[a.rarity.name] || 0));
        }

        return list;
    }, [filteredBrawlers, sortBy]);

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedRarity('Todos');
        setSelectedClass('Todos');
        setSortBy('raridade');
    };

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
        <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_15%_10%,rgba(250,204,21,0.12),transparent_22%),radial-gradient(circle_at_85%_15%,rgba(34,211,238,0.13),transparent_28%),linear-gradient(135deg,#2a0b69_0%,#3d1384_50%,#2a0b69_100%)] animate-gradient">
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-yellow-400/10 blur-3xl" />
            <div className="absolute -bottom-28 -right-20 w-80 h-80 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-8 relative z-10"
                >
                    <motion.div variants={itemVariants}>
                        <p className="text-center text-cyan-200 mb-2 tracking-wider uppercase text-sm">Central de Brawlers</p>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white text-center">
                            Brawlers
                        </h1>
                        <p className="text-gray-300 text-center max-w-2xl mx-auto">
                            Explore todos os brawlers disponíveis no Brawl Stars. Use os filtros para encontrar o brawler perfeito para seu estilo de jogo.
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={itemVariants}
                        className="flex flex-col md:flex-row md:flex-wrap gap-6 justify-center items-end bg-purple-800/50 p-8 rounded-2xl backdrop-blur-sm w-full max-w-6xl mx-auto border border-purple-700/70"
                    >
                        <div className="w-full md:w-80">
                            <label className="block text-purple-100 text-sm mb-2" htmlFor="search-brawler">
                                Pesquisar brawler
                            </label>
                            <input
                                id="search-brawler"
                                type="text"
                                placeholder="Digite o nome"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full text-white bg-purple-700/50 text-lg px-4 py-3 rounded-lg border border-purple-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div className="w-full md:w-64">
                            <label className="block text-purple-100 text-sm mb-2" htmlFor="rarity-filter">
                                Raridade
                            </label>
                            <select
                                id="rarity-filter"
                                value={selectedRarity}
                                onChange={(event) => setSelectedRarity(event.target.value || "Todos")}
                                className="w-full text-white bg-purple-700/50 text-lg px-4 py-3 rounded-lg border border-purple-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            >
                                {uniqueRarities.map((rarity) => (
                                    <option key={rarity} value={rarity} className="bg-purple-900 text-white">
                                        {rarity}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full md:w-64">
                            <label className="block text-purple-100 text-sm mb-2" htmlFor="class-filter">
                                Classe
                            </label>
                            <select
                                id="class-filter"
                                value={selectedClass}
                                onChange={(event) => setSelectedClass(event.target.value || "Todos")}
                                className="w-full text-white bg-purple-700/50 text-lg px-4 py-3 rounded-lg border border-purple-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            >
                                {uniqueClasses.map((classe) => (
                                    <option key={classe} value={classe} className="bg-purple-900 text-white">
                                        {classe}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full md:w-56">
                            <label className="block text-purple-100 text-sm mb-2" htmlFor="sort-brawler">
                                Ordenar
                            </label>
                            <select
                                id="sort-brawler"
                                value={sortBy}
                                onChange={(event) => setSortBy(event.target.value)}
                                className="w-full text-white bg-purple-700/50 text-lg px-4 py-3 rounded-lg border border-purple-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            >
                                <option value="raridade" className="bg-purple-900 text-white">Raridade (maior para menor)</option>
                                <option value="nome-az" className="bg-purple-900 text-white">Nome (A-Z)</option>
                                <option value="nome-za" className="bg-purple-900 text-white">Nome (Z-A)</option>
                            </select>
                        </div>
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="w-full md:w-auto h-[52px] px-6 rounded-lg font-bold text-purple-950 bg-yellow-400 hover:bg-yellow-300 transition-colors"
                        >
                            Limpar filtros
                        </button>
                    </motion.div>

                    {!brawlers.loading && !brawlers.error && (
                        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-purple-800/70 border border-purple-700 rounded-xl p-4 text-center">
                                <p className="text-sm text-purple-200">Total no banco</p>
                                <p className="text-3xl text-pink-300 font-extrabold">{brawlers.brawlers.length}</p>
                            </div>
                            <div className="bg-purple-800/70 border border-purple-700 rounded-xl p-4 text-center">
                                <p className="text-sm text-purple-200">Exibidos</p>
                                <p className="text-3xl text-yellow-300 font-extrabold">{sortedBrawlers.length}</p>
                            </div>
                            <div className="bg-purple-800/70 border border-purple-700 rounded-xl p-4 text-center">
                                <p className="text-sm text-purple-200">Raridades</p>
                                <p className="text-3xl text-cyan-300 font-extrabold">{Math.max(uniqueRarities.length - 1, 0)}</p>
                            </div>
                            <div className="bg-purple-800/70 border border-purple-700 rounded-xl p-4 text-center">
                                <p className="text-sm text-purple-200">Classes</p>
                                <p className="text-3xl text-green-300 font-extrabold">{Math.max(uniqueClasses.length - 1, 0)}</p>
                            </div>
                        </motion.div>
                    )}

                    {/* Lista de Brawlers */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                    >
                        {brawlers.loading && (
                            <div className="col-span-full text-center text-gray-200 py-8">
                                Carregando brawlers...
                            </div>
                        )}

                        {brawlers.error && (
                            <div className="col-span-full text-center text-red-400 py-8">
                                {brawlers.error}
                            </div>
                        )}

                        {!brawlers.loading && !brawlers.error && sortedBrawlers.length === 0 && (
                            <div className="col-span-full max-w-xl mx-auto bg-purple-800/70 border border-purple-700 rounded-xl p-6 text-center text-gray-100">
                                Nenhum brawler corresponde aos filtros selecionados.
                            </div>
                        )}

                        {sortedBrawlers.map((brawler: BrawlerItem) => (
                            <motion.div
                                key={brawler.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link to={`/brawlers/${brawler.id}`} className="block h-full">
                                    <div className="bg-purple-800/90 backdrop-blur-sm border border-purple-700/70 shadow-lg rounded-2xl overflow-hidden h-full">
                                        <div className="h-40 bg-purple-700/50 rounded-t-2xl p-4">
                                            <div className="relative w-full h-full">
                                                <img
                                                    src={brawler.imageUrl2}
                                                    alt={brawler.name}
                                                    className="h-full w-full object-contain rounded-xl"
                                                />
                                            </div>
                                        </div>
                                        <div className="text-white p-4">
                                            <h2 className="text-xl mb-2 text-center font-bold">
                                                {brawler.name}
                                            </h2>
                                            <div className="flex justify-between text-sm mb-3 gap-2">
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

                                            <div className="mt-3">
                                                <p className="text-xs text-purple-200 mb-1">Star Powers</p>
                                                <div className="flex gap-2">
                                                    {brawler.starPowers?.slice(0, 2).map((power) => (
                                                        <img 
                                                            key={power.id}
                                                            src={power.imageUrl} 
                                                            alt={power.name}
                                                            className="w-8 h-8 rounded-full bg-purple-900/50 p-1"
                                                            title={power.name}
                                                        />
                                                    ))}
                                                    {(!brawler.starPowers || brawler.starPowers.length === 0) && (
                                                        <span className="text-xs text-gray-400">Sem star power</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-3">
                                                <p className="text-xs text-purple-200 mb-1">Gadgets</p>
                                                <div className="flex gap-2">
                                                    {brawler.gadgets?.slice(0, 2).map((gadget) => (
                                                        <img
                                                            key={gadget.id}
                                                            src={gadget.imageUrl}
                                                            alt={gadget.name}
                                                            className="w-8 h-8 rounded-full bg-purple-900/50 p-1"
                                                            title={gadget.name}
                                                        />
                                                    ))}
                                                    {(!brawler.gadgets || brawler.gadgets.length === 0) && (
                                                        <span className="text-xs text-gray-400">Sem gadget</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-3 text-xs text-gray-400 text-right flex items-center justify-between">
                                                <span>ID #{brawler.id}</span>
                                                <span className="text-yellow-300 font-semibold">Ver detalhes</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
} 