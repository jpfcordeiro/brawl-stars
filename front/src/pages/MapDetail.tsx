import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useMapDetail } from '../hooks/useMapDetail';

export default function MapDetail() {
  const { id } = useParams();
  const { map, loading, error } = useMapDetail(id);
  const statsEntries = Object.entries(map?.stats || {});

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_10%,rgba(250,204,21,0.12),transparent_22%),radial-gradient(circle_at_85%_15%,rgba(34,211,238,0.13),transparent_28%),linear-gradient(135deg,#2a0b69_0%,#3d1384_50%,#2a0b69_100%)]">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div>
          <Link
            to="/mapas"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-800/80 border border-purple-700 text-purple-100 hover:bg-purple-700/90 transition-colors"
          >
            Voltar para Mapas
          </Link>
        </div>

        {loading && <p className="text-center text-gray-200 py-8">Carregando detalhes do mapa...</p>}
        {error && <p className="text-center text-red-400 py-8">{error}</p>}

        {!loading && !error && !map && (
          <div className="max-w-xl mx-auto bg-purple-800/70 border border-purple-700 rounded-xl p-6 text-center text-gray-100">
            Mapa nao encontrado.
          </div>
        )}

        {!loading && !error && map && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <section className="bg-purple-800/75 border border-purple-700 rounded-2xl p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                <div className="flex justify-center">
                  <img
                    src={map.imageUrl}
                    alt={map.name}
                    className="w-full max-w-sm object-cover rounded-xl drop-shadow-[0_18px_25px_rgba(0,0,0,0.35)]"
                  />
                </div>

                <div>
                  <p className="text-cyan-200 uppercase tracking-wider text-sm mb-2">Detalhes do Mapa</p>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{map.name}</h1>

                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: map.gameMode?.color || '#7c3aed' }}
                    >
                      {map.gameMode?.name || 'Modo desconhecido'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-700 text-purple-100">
                      ID #{map.id}
                    </span>
                  </div>

                  <p className="text-gray-100 leading-relaxed mb-4">
                    <strong>Ambiente:</strong> {map.environment?.name || 'Nao especificado'}
                  </p>

                  <div className="bg-purple-800/60 border border-purple-700 rounded-lg p-4">
                    <p className="text-sm text-purple-100">
                      Este mapa faz parte do modo de jogo <span className="font-bold">{map.gameMode?.name}</span> e oferece um ambiente unico para estrategia e competicao.
                    </p>
                  </div>

                  {map.environment?.imageUrl && (
                    <div className="mt-4 bg-purple-800/60 border border-purple-700 rounded-lg p-4">
                      <p className="text-sm text-cyan-200 font-semibold mb-2">Tema do ambiente</p>
                      <img
                        src={map.environment.imageUrl}
                        alt={map.environment.name}
                        className="w-full max-w-xs object-cover rounded-lg border border-purple-700"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-purple-800/70 border border-purple-700 rounded-xl p-5">
                <h2 className="text-xl font-extrabold text-yellow-300 mb-3">Estatisticas do Mapa</h2>
                {statsEntries.length === 0 ? (
                  <p className="text-sm text-purple-100">Sem estatisticas publicas para este mapa.</p>
                ) : (
                  <div className="space-y-2">
                    {statsEntries.map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between bg-purple-900/40 rounded-lg px-3 py-2">
                        <span className="text-sm text-purple-100">{key}</span>
                        <span className="text-sm text-yellow-200 font-semibold">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-purple-800/70 border border-purple-700 rounded-xl p-5">
                <h2 className="text-xl font-extrabold text-cyan-300 mb-3">Estatisticas por Time</h2>
                {!map.teamStats || map.teamStats.length === 0 ? (
                  <p className="text-sm text-purple-100">Sem dados de times para este mapa.</p>
                ) : (
                  <div className="space-y-3">
                    {map.teamStats.map((team, index) => (
                      <div key={index} className="bg-purple-900/40 rounded-lg p-3">
                        {Object.entries(team).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between py-1 border-b border-purple-700/40 last:border-0">
                            <span className="text-sm text-purple-100">{key}</span>
                            <span className="text-sm text-cyan-100 font-semibold">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </motion.div>
        )}
      </div>
    </div>
  );
}
