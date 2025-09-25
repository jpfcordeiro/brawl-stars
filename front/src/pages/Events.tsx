
import { motion } from 'framer-motion';
import { useEvents } from '../hooks/useEvents';


export default function Events() {
  const { events, loading, error } = useEvents();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 animate-gradient">
      <div className="container mx-auto px-4 py-10">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center text-white mb-8"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Eventos
        </motion.h1>
        {loading && <p className="text-center text-gray-200">Carregando eventos...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              className="bg-purple-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:scale-105 transition-transform border border-purple-700"
              variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">
                {event.map?.name || 'Evento'}
              </h2>
              <span className="block text-purple-300 font-semibold mb-1">
                {event.map?.gameMode?.name}
              </span>
              <p className="text-gray-100 mb-2">
                {event.map?.environment}
              </p>
              {event.map?.imageUrl && (
                <img
                  src={event.map.imageUrl}
                  alt={event.map.name}
                  className="w-full h-32 object-cover rounded-lg border border-purple-700"
                />
              )}
              <div className="mt-2 text-xs text-gray-300">
                <span>Início: {new Date(event.startTime).toLocaleString('pt-BR')}</span><br />
                <span>Fim: {new Date(event.endTime).toLocaleString('pt-BR')}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
