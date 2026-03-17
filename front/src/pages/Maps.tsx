
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMaps } from '../hooks/useMaps';


export default function Maps() {
  const { maps, loading, error } = useMaps();
  const uniqueModes = new Set(maps.map((map) => map.gameMode?.name).filter(Boolean)).size;
  const uniqueEnvironments = new Set(maps.map((map) => map.environment).filter(Boolean)).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 animate-gradient">
      <div className="container mx-auto px-4 py-10">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center text-white mb-8"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Mapas
        </motion.h1>

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-purple-800/70 border border-purple-700 rounded-xl p-4 text-center">
              <p className="text-sm text-purple-200">Total de mapas</p>
              <p className="text-3xl text-yellow-300 font-extrabold">{maps.length}</p>
            </div>
            <div className="bg-purple-800/70 border border-purple-700 rounded-xl p-4 text-center">
              <p className="text-sm text-purple-200">Modos presentes</p>
              <p className="text-3xl text-cyan-300 font-extrabold">{uniqueModes}</p>
            </div>
            <div className="bg-purple-800/70 border border-purple-700 rounded-xl p-4 text-center">
              <p className="text-sm text-purple-200">Ambientes</p>
              <p className="text-3xl text-green-300 font-extrabold">{uniqueEnvironments}</p>
            </div>
          </div>
        )}

        {loading && <p className="text-center text-gray-200">Carregando mapas...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}
        {!loading && !error && maps.length === 0 && (
          <div className="max-w-xl mx-auto bg-purple-800/70 border border-purple-700 rounded-xl p-6 text-center text-gray-100">
            Nenhum mapa retornado pela API neste momento.
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
          {maps.map((map) => (
            <Link key={map.id} to={`/mapas/${map.id}`} className="block">
              <motion.div
                className="bg-purple-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:scale-105 transition-transform border border-purple-700 h-full"
                variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                whileHover={{ scale: 1.05 }}
              >
                <h2 className="text-2xl font-bold text-yellow-400 mb-2">{typeof map.name === 'string' ? map.name : JSON.stringify(map.name)}</h2>
                <span className="block text-purple-300 font-semibold mb-1">
                  {typeof map.gameMode === 'object' && map.gameMode !== null ? (map.gameMode.name || 'Modo desconhecido') : (typeof map.gameMode === 'string' ? map.gameMode : 'Modo desconhecido')}
                </span>
                <p className="text-gray-100 mb-2">
                  {typeof map.environment === 'string' ? map.environment : 'Ambiente desconhecido'}
                </p>

                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs px-3 py-1 rounded-full bg-purple-700 text-purple-100">
                    ID: {map.id}
                  </span>
                  <span className="text-xs text-yellow-300 font-semibold">Ver detalhes</span>
                </div>

                {map.imageUrl && (
                  <img
                    src={map.imageUrl}
                    alt={map.name}
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
