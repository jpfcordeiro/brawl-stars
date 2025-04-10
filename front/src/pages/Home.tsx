import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    const cardVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 animate-gradient"></div>
            
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-purple-700/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-yellow-400/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <motion.div 
                className="relative z-10"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Hero Section */}
                <motion.section 
                    className="container mx-auto px-4 py-20 text-center"
                    variants={itemVariants}
                >
                    <motion.h1 
                        className="text-5xl md:text-6xl font-extrabold mb-6 text-white"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                    >
                        Bem-vindo ao <span className="text-yellow-400">BrawlerHUB</span>
                    </motion.h1>
                    <motion.p 
                        className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                    >
                        Seu hub definitivo para tudo sobre Brawl Stars! Aqui você encontra informações detalhadas sobre brawlers, modos de jogo, mapas e muito mais.
                    </motion.p>
                </motion.section>

                {/* Features Section */}
                <motion.section 
                    className="container mx-auto px-4 py-12"
                    variants={itemVariants}
                >
                    <motion.h2 
                        className="text-3xl font-bold mb-12 text-center text-white"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        O que você encontra aqui?
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Brawlers Card */}
                        <motion.div 
                            className="bg-purple-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <h3 className="text-2xl font-bold mb-4 text-yellow-400">Brawlers</h3>
                            <p className="text-gray-100">
                                Explore todos os brawlers do jogo, suas habilidades, estatísticas e dicas de uso. Encontre o brawler perfeito para seu estilo de jogo!
                            </p>
                        </motion.div>

                        {/* Game Modes Card */}
                        <motion.div 
                            className="bg-purple-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <h3 className="text-2xl font-bold mb-4 text-yellow-400">Modos de Jogo</h3>
                            <p className="text-gray-100">
                                Descubra todos os modos de jogo disponíveis, suas regras e estratégias. Fique por dentro dos modos rotativos e eventos especiais!
                            </p>
                        </motion.div>

                        {/* Maps Card */}
                        <motion.div 
                            className="bg-purple-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <h3 className="text-2xl font-bold mb-4 text-yellow-400">Mapas</h3>
                            <p className="text-gray-100">
                                Explore os mapas ativos, descubra as melhores rotas e posições. Aprenda a dominar cada ambiente do jogo!
                            </p>
                        </motion.div>

                        {/* Events Card */}
                        <motion.div 
                            className="bg-purple-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <h3 className="text-2xl font-bold mb-4 text-yellow-400">Eventos</h3>
                            <p className="text-gray-100">
                                Fique atualizado com os eventos atuais e futuros. Não perca nenhuma oportunidade de ganhar recompensas especiais!
                            </p>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Call to Action */}
                <motion.section 
                    className="container mx-auto px-4 py-12 text-center"
                    variants={itemVariants}
                >
                    <motion.h2 
                        className="text-3xl font-bold mb-6 text-white"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        Pronto para começar sua jornada?
                    </motion.h2>
                    <motion.p 
                        className="text-xl mb-8 max-w-2xl mx-auto text-gray-100"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        Explore nosso site e descubra tudo o que você precisa saber para se tornar um jogador ainda melhor!
                    </motion.p>
                    <motion.button 
                        className="bg-yellow-400 text-purple-900 px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        Explorar Agora
                    </motion.button>
                </motion.section>
            </motion.div>
        </div>
    );
};

export default Home; 