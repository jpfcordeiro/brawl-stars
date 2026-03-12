
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useGameModes } from '../hooks/useGameModes';


export default function GameModes() {
  const { gameModes, loading, error } = useGameModes();
  const describedModes = gameModes.filter((mode) => Boolean(mode.description?.trim())).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 animate-gradient">
      <div className="container mx-auto px-4 py-10">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center text-white mb-8"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Modos de Jogo
        </motion.h1>

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-3xl mx-auto">
            <div className="bg-purple-800/70 border border-purple-700 rounded-xl p-4 text-center">
              <p className="text-sm text-purple-200">Modos cadastrados</p>
              <p className="text-3xl text-yellow-300 font-extrabold">{gameModes.length}</p>
            </div>
            <div className="bg-purple-800/70 border border-purple-700 rounded-xl p-4 text-center">
              <p className="text-sm text-purple-200">Com descricao</p>
              <p className="text-3xl text-green-300 font-extrabold">{describedModes}</p>
            </div>
          </div>
        )}

        {loading && <p className="text-center text-gray-200">Carregando modos de jogo...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}
        {!loading && !error && gameModes.length === 0 && (
          <div className="max-w-xl mx-auto bg-purple-800/70 border border-purple-700 rounded-xl p-6 text-center text-gray-100">
            Nenhum modo de jogo encontrado no momento.
          </div>
        )}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          {gameModes.map((mode) => (
            <Link key={mode.id} to={`/modos/${mode.id}`} className="block">
              <motion.div
                className="bg-purple-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:scale-105 transition-transform border border-purple-700 h-full"
                variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-4 h-4 rounded-full border border-white/30"
                    style={{ backgroundColor: mode.color || '#facc15' }}
                  />
                  <h2 className="text-2xl font-bold text-yellow-400">{mode.name}</h2>
                </div>

                <p className="text-gray-100 mb-2 min-h-12">
                  {mode.description || 'Sem descricao disponivel para este modo.'}
                </p>

                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs px-3 py-1 rounded-full bg-purple-700 text-purple-100">
                    ID: {mode.id}
                  </span>
                  <span className="text-xs text-yellow-300 font-semibold">Ver detalhes</span>
                </div>

                {mode.imageUrl && (
                  <img
                    src={mode.imageUrl}
                    alt={mode.name}
                    className="w-full h-32 object-cover rounded-lg border border-purple-700"
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
