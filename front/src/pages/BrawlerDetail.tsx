import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useBrawlerDetail } from '../hooks/useBrawlerDetail';

const classColors: Record<string, string> = {
  Dano: 'bg-red-500',
  Tank: 'bg-blue-500',
  Suporte: 'bg-green-500',
  Assassino: 'bg-purple-500',
  Controle: 'bg-yellow-500',
};

const rarityColors: Record<string, string> = {
  Comum: 'bg-gray-400',
  Raro: 'bg-blue-400',
  'Super Raro': 'bg-purple-400',
  Épico: 'bg-purple-600',
  Mítico: 'bg-pink-500',
  Lendário: 'bg-yellow-400',
  'Ultra Legendary': 'bg-yellow-400',
};

function AbilitySection({
  title,
  color,
  abilities,
}: {
  title: string;
  color: string;
  abilities: Array<{ id: number; name: string; description: string; imageUrl: string }>;
}) {
  return (
    <section className="space-y-4">
      <h2 className={`text-2xl font-extrabold ${color}`}>{title}</h2>
      {abilities.length === 0 && (
        <div className="bg-purple-800/70 border border-purple-700 rounded-xl p-4 text-gray-200">
          Nenhuma habilidade encontrada nesta categoria.
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {abilities.map((ability, index) => (
          <motion.div
            key={ability.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
            className="bg-purple-800/80 border border-purple-700 rounded-xl p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <img src={ability.imageUrl} alt={ability.name} className="w-10 h-10 rounded-lg bg-purple-900/60 p-1" />
              <h3 className="text-lg font-bold text-white">{ability.name}</h3>
            </div>
            <p className="text-gray-200 text-sm">{ability.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function BrawlerDetail() {
  const { id } = useParams();
  const { brawler, loading, error } = useBrawlerDetail(id);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_10%,rgba(250,204,21,0.12),transparent_22%),radial-gradient(circle_at_85%_15%,rgba(34,211,238,0.13),transparent_28%),linear-gradient(135deg,#2a0b69_0%,#3d1384_50%,#2a0b69_100%)]">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div>
          <Link
            to="/brawlers"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-800/80 border border-purple-700 text-purple-100 hover:bg-purple-700/90 transition-colors"
          >
            Voltar para Brawlers
          </Link>
        </div>

        {loading && <p className="text-center text-gray-200 py-8">Carregando detalhes do brawler...</p>}
        {error && <p className="text-center text-red-400 py-8">{error}</p>}

        {!loading && !error && !brawler && (
          <div className="max-w-xl mx-auto bg-purple-800/70 border border-purple-700 rounded-xl p-6 text-center text-gray-100">
            Brawler nao encontrado.
          </div>
        )}

        {!loading && !error && brawler && (
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
                    src={brawler.imageUrl3 || brawler.imageUrl2 || brawler.imageUrl}
                    alt={brawler.name}
                    className="w-full max-w-sm object-contain drop-shadow-[0_18px_25px_rgba(0,0,0,0.35)]"
                  />
                </div>

                <div>
                  <p className="text-cyan-200 uppercase tracking-wider text-sm mb-2">Detalhes do Brawler</p>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{brawler.name}</h1>

                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${rarityColors[brawler.rarity?.name] || 'bg-yellow-400'}`}>
                      {brawler.rarity?.name || 'Raridade desconhecida'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${classColors[brawler.class?.name] || 'bg-gray-500'}`}>
                      {brawler.class?.name || 'Classe desconhecida'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-700 text-purple-100">ID #{brawler.id}</span>
                  </div>

                  <p className="text-gray-100 leading-relaxed">{brawler.description}</p>

                  {brawler.link && (
                    <a
                      href={brawler.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-5 px-5 py-2 rounded-lg bg-yellow-400 text-purple-950 font-bold hover:bg-yellow-300 transition-colors"
                    >
                      Ver pagina oficial
                    </a>
                  )}
                </div>
              </div>
            </section>

            <AbilitySection title="Star Powers" color="text-yellow-300" abilities={brawler.starPowers || []} />
            <AbilitySection title="Gadgets" color="text-green-300" abilities={brawler.gadgets || []} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
