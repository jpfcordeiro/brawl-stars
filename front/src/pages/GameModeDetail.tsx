import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useGameModeDetail } from '../hooks/useGameModeDetail';

export default function GameModeDetail() {
  const { id } = useParams();
  const { gameMode, loading, error } = useGameModeDetail(id);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_10%,rgba(250,204,21,0.12),transparent_22%),radial-gradient(circle_at_85%_15%,rgba(34,211,238,0.13),transparent_28%),linear-gradient(135deg,#2a0b69_0%,#3d1384_50%,#2a0b69_100%)]">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div>
          <Link
            to="/modos"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-800/80 border border-purple-700 text-purple-100 hover:bg-purple-700/90 transition-colors"
          >
            Voltar para Modos
          </Link>
        </div>

        {loading && <p className="text-center text-gray-200 py-8">Carregando detalhes do modo...</p>}
        {error && <p className="text-center text-red-400 py-8">{error}</p>}

        {!loading && !error && !gameMode && (
          <div className="max-w-xl mx-auto bg-purple-800/70 border border-purple-700 rounded-xl p-6 text-center text-gray-100">
            Modo de jogo nao encontrado.
          </div>
        )}

        {!loading && !error && gameMode && (
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
                    src={gameMode.imageUrl2 || gameMode.imageUrl || '/fallback-gamemode.png'}
                    alt={gameMode.name || 'Modo sem nome'}
                    className="w-full max-w-sm object-cover rounded-xl drop-shadow-[0_18px_25px_rgba(0,0,0,0.35)]"
                    onError={e => { e.currentTarget.src = '/fallback-gamemode.png'; }}
                  />
                </div>

                <div>
                  <p className="text-cyan-200 uppercase tracking-wider text-sm mb-2">Modo de Jogo</p>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{gameMode.name || 'Nome desconhecido'}</h1>

                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: gameMode.color || '#7c3aed' }}
                    >
                      Modo Oficial
                    </span>
                    {gameMode.title ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/30 text-cyan-100 border border-cyan-400/40">
                        {gameMode.title}
                      </span>
                    ) : null}
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-700 text-purple-100">
                      ID #{gameMode.id || '???'}
                    </span>
                    {gameMode.disabled ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/30 text-red-100 border border-red-400/40">
                        Desativado
                      </span>
                    ) : null}
                  </div>

                  <p className="text-gray-100 leading-relaxed mb-4">
                    {gameMode.description || 'Sem descricao disponivel para este modo de jogo.'}
                  </p>

                  {gameMode.shortDescription ? (
                    <div className="mb-4 bg-purple-800/60 border border-purple-700 rounded-lg p-4">
                      <p className="text-sm text-yellow-200 font-semibold">Resumo rapido</p>
                      <p className="text-sm text-purple-100 mt-1">{gameMode.shortDescription}</p>
                    </div>
                  ) : null}

                  {gameMode.tutorial ? (
                    <div className="mb-4 bg-purple-800/60 border border-purple-700 rounded-lg p-4">
                      <p className="text-sm text-cyan-200 font-semibold">Como jogar</p>
                      <p className="text-sm text-purple-100 mt-1">{gameMode.tutorial}</p>
                    </div>
                  ) : null}

                  <div className="bg-purple-800/60 border border-purple-700 rounded-lg p-4">
                    <p className="text-sm text-purple-100">
                      Este modo de jogo oferece uma experiencia unica e dinamica para todos os jogadores. Escolha seus brawlers com sabedoria e conquiste a vitoria!
                    </p>
                  </div>

                  {gameMode.lastActive ? (
                    <p className="text-xs text-purple-200 mt-3">
                      Ultima atividade registrada: {new Date(gameMode.lastActive).toLocaleString('pt-BR')}
                    </p>
                  ) : null}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </div>
    </div>
  );
}
