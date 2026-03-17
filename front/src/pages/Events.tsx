
import { motion } from 'framer-motion';
import { useEvents } from '../hooks/useEvents';

function getEventStatus(startTime: string, endTime: string) {
  const now = Date.now();
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();

  if (now < start) return 'Em breve';
  if (now > end) return 'Encerrado';
  return 'Ativo';
}

function formatSlot(slot: number) {
  const labels: Record<number, string> = {
    0: 'Principal',
    1: 'Secundario',
    2: 'Especial',
  };

  return labels[slot] || `Slot ${slot}`;
}

export default function Events() {
  const { events, loading, error } = useEvents();
  const activeCount = events.filter((event) => getEventStatus(event.startTime, event.endTime) === 'Ativo').length;
  const upcomingCount = events.filter((event) => getEventStatus(event.startTime, event.endTime) === 'Em breve').length;

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

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-purple-800/70 border border-purple-700 rounded-xl p-4 text-center">
              <p className="text-sm text-purple-200">Total</p>
              <p className="text-3xl text-yellow-300 font-extrabold">{events.length}</p>
            </div>
            <div className="bg-purple-800/70 border border-purple-700 rounded-xl p-4 text-center">
              <p className="text-sm text-purple-200">Ativos agora</p>
              <p className="text-3xl text-green-300 font-extrabold">{activeCount}</p>
            </div>
            <div className="bg-purple-800/70 border border-purple-700 rounded-xl p-4 text-center">
              <p className="text-sm text-purple-200">Em breve</p>
              <p className="text-3xl text-cyan-300 font-extrabold">{upcomingCount}</p>
            </div>
          </div>
        )}

        {loading && <p className="text-center text-gray-200">Carregando eventos...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}
        {!loading && !error && events.length === 0 && (
          <div className="max-w-xl mx-auto bg-purple-800/70 border border-purple-700 rounded-xl p-6 text-center text-gray-100">
            Nenhum evento encontrado no momento. Tente novamente em instantes.
          </div>
        )}

        {(activeCount === 0 && upcomingCount === 0) ? (
          <div className="max-w-xl mx-auto bg-purple-800/70 border border-purple-700 rounded-xl p-6 text-center text-gray-100 mt-8">
            <p className="text-lg text-yellow-300 font-bold mb-2">Nenhum evento ativo no momento.</p>
            <p className="text-cyan-200">E também não há eventos a caminho ainda.</p>
          </div>
        ) : (
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
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-purple-700 text-purple-100">
                    {formatSlot(event.slot)}
                  </span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-bold ${
                      getEventStatus(event.startTime, event.endTime) === 'Ativo'
                        ? 'bg-green-500/25 text-green-200 border border-green-400/40'
                        : getEventStatus(event.startTime, event.endTime) === 'Em breve'
                          ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/40'
                          : 'bg-gray-500/25 text-gray-200 border border-gray-400/40'
                    }`}
                  >
                    {getEventStatus(event.startTime, event.endTime)}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-yellow-400 mb-2">
                  {event.map?.name || 'Evento'}
                </h2>
                <span className="block text-purple-300 font-semibold mb-1">
                  {event.map?.gameMode?.name || 'Modo desconhecido'}
                </span>
                <p className="text-gray-100 mb-2">
                  {event.map?.environment || 'Ambiente desconhecido'}
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
        )}
      </div>
    </div>
  );
}
