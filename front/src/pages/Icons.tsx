import { useIcons } from '../hooks/useIcons';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

type IconSectionProps = {
  title: string;
  subtitle: string;
  colorClass: string;
  borderClass: string;
  icons: Array<{
    id: number;
    imageUrl: string;
    hash?: string;
  }>;
};

function IconSection({ title, subtitle, colorClass, borderClass, icons }: IconSectionProps) {
  if (icons.length === 0) {
    return (
      <div className="bg-purple-800/70 border border-purple-700 rounded-2xl p-6 text-center text-gray-100">
        Nenhum item encontrado em {title}.
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className={`text-3xl font-extrabold ${colorClass}`}>{title}</h2>
          <p className="text-purple-200">{subtitle}</p>
        </div>
        <span className="px-3 py-1 rounded-full text-sm font-bold bg-purple-700 text-purple-100">
          {icons.length} itens
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {icons.map((icon, index) => (
          <motion.div
            key={icon.id}
            className={`group relative bg-purple-800/85 ${borderClass} rounded-xl p-3 shadow-md`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.03, type: 'spring', stiffness: 120 }}
            whileHover={{ scale: 1.12, boxShadow: '0 0 16px #facc15' }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-yellow-300/10 to-transparent" />
            <div className="flex flex-col items-center justify-center min-h-[40px]">
              {icon.imageUrl ? (
                <img
                  src={icon.imageUrl}
                  alt={`Icone ${icon.id}`}
                  loading="lazy"
                  className="relative z-10 w-full h-auto object-contain drop-shadow-[0_6px_8px_rgba(0,0,0,0.35)]"
                  onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement?.querySelector('.icon-hash')?.classList.remove('hidden'); }}
                />
              ) : null}
              <span className={"icon-hash relative z-10 block text-center text-xs text-yellow-300 font-mono mt-2" + (icon.imageUrl ? ' hidden' : '')}>
                {icon.hash || 'Sem hash'}
              </span>
            </div>
            <span className="relative z-10 block text-center text-xs text-purple-200 mt-1">
              #{icon.id}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function Icons() {
  const { icons, loading, error } = useIcons();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'todos' | 'player' | 'club'>('todos');
  const [rewardFilter, setRewardFilter] = useState<'todos' | 'recompensa' | 'oferta' | 'base'>('todos');
  const [sortBy, setSortBy] = useState<'ordem' | 'trofeus' | 'nivel' | 'id'>('ordem');
  const total = icons.player.length + icons.club.length;

  const filterAndSortIcons = useMemo(() => {
    const applyFilters = (list: Array<{ id: number; imageUrl: string; name?: string; name2?: string; requiredExpLevel?: number; requiredTotalTrophies?: number; sortOrder?: number; isReward?: boolean; isAvailableForOffers?: boolean }>) => {
      let filtered = [...list];

      if (searchTerm.trim()) {
        const query = searchTerm.trim().toLowerCase();
        filtered = filtered.filter((icon) => {
          const name = icon.name?.toLowerCase() || '';
          const name2 = icon.name2?.toLowerCase() || '';
          return name.includes(query) || name2.includes(query) || String(icon.id).includes(query);
        });
      }

      if (rewardFilter === 'recompensa') {
        filtered = filtered.filter((icon) => Boolean(icon.isReward));
      }

      if (rewardFilter === 'oferta') {
        filtered = filtered.filter((icon) => Boolean(icon.isAvailableForOffers));
      }

      if (rewardFilter === 'base') {
        filtered = filtered.filter((icon) => !icon.isReward && !icon.isAvailableForOffers);
      }

      if (sortBy === 'trofeus') {
        filtered.sort((a, b) => (b.requiredTotalTrophies || 0) - (a.requiredTotalTrophies || 0));
      } else if (sortBy === 'nivel') {
        filtered.sort((a, b) => (b.requiredExpLevel || 0) - (a.requiredExpLevel || 0));
      } else if (sortBy === 'id') {
        filtered.sort((a, b) => a.id - b.id);
      } else {
        filtered.sort((a, b) => (a.sortOrder || 99999) - (b.sortOrder || 99999));
      }

      return filtered;
    };

    return {
      player: applyFilters(icons.player),
      club: applyFilters(icons.club),
    };
  }, [icons.player, icons.club, rewardFilter, searchTerm, sortBy]);

  const filteredTotal = filterAndSortIcons.player.length + filterAndSortIcons.club.length;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_20%,rgba(250,204,21,0.10),transparent_25%),radial-gradient(circle_at_80%_5%,rgba(34,211,238,0.12),transparent_25%),linear-gradient(135deg,#2a0b69_0%,#3d1384_50%,#2a0b69_100%)]">
      <div className="container mx-auto px-4 py-10 space-y-8">
        <motion.header
          className="text-center"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="inline-block bg-cyan-400/20 text-cyan-200 border border-cyan-300/40 px-3 py-1 rounded-full text-sm font-bold mb-4">
            Galeria Tematica
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Coleção de Ícones</h1>
          <p className="max-w-2xl mx-auto text-purple-100 mt-3">
            Explore os icones oficiais usados em perfil, clube e jogador com um visual inspirado no universo de Brawl Stars.
          </p>
        </motion.header>

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-purple-800/70 border border-purple-700 rounded-xl p-4 text-center">
              <p className="text-sm text-purple-200">Total</p>
              <p className="text-3xl text-yellow-300 font-extrabold">{total}</p>
            </div>
            <div className="bg-purple-800/70 border border-purple-700 rounded-xl p-4 text-center">
              <p className="text-sm text-purple-200">Filtrados</p>
              <p className="text-3xl text-pink-300 font-extrabold">{filteredTotal}</p>
            </div>
            <div className="bg-purple-800/70 border border-purple-700 rounded-xl p-4 text-center">
              <p className="text-sm text-purple-200">Player</p>
              <p className="text-3xl text-cyan-300 font-extrabold">{icons.player.length}</p>
            </div>
            <div className="bg-purple-800/70 border border-purple-700 rounded-xl p-4 text-center">
              <p className="text-sm text-purple-200">Club</p>
              <p className="text-3xl text-green-300 font-extrabold">{icons.club.length}</p>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-purple-800/50 border border-purple-700 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="icon-search" className="block text-purple-100 text-sm mb-2">Buscar por nome ou ID</label>
              <input
                id="icon-search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ex: shelly ou 28000003"
                className="w-full text-white bg-purple-700/50 px-3 py-2 rounded-lg border border-purple-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label htmlFor="icon-category" className="block text-purple-100 text-sm mb-2">Categoria</label>
              <select
                id="icon-category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as 'todos' | 'player' | 'club')}
                className="w-full text-white bg-purple-700/50 px-3 py-2 rounded-lg border border-purple-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="todos" className="bg-purple-900">Todos</option>
                <option value="player" className="bg-purple-900">Player</option>
                <option value="club" className="bg-purple-900">Club</option>
              </select>
            </div>
            <div>
              <label htmlFor="icon-reward" className="block text-purple-100 text-sm mb-2">Tipo</label>
              <select
                id="icon-reward"
                value={rewardFilter}
                onChange={(e) => setRewardFilter(e.target.value as 'todos' | 'recompensa' | 'oferta' | 'base')}
                className="w-full text-white bg-purple-700/50 px-3 py-2 rounded-lg border border-purple-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="todos" className="bg-purple-900">Todos</option>
                <option value="recompensa" className="bg-purple-900">Apenas recompensa</option>
                <option value="oferta" className="bg-purple-900">Apenas oferta</option>
                <option value="base" className="bg-purple-900">Base / desbloqueio</option>
              </select>
            </div>
            <div>
              <label htmlFor="icon-sort" className="block text-purple-100 text-sm mb-2">Ordenar</label>
              <select
                id="icon-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'ordem' | 'trofeus' | 'nivel' | 'id')}
                className="w-full text-white bg-purple-700/50 px-3 py-2 rounded-lg border border-purple-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="ordem" className="bg-purple-900">Ordem da API</option>
                <option value="trofeus" className="bg-purple-900">Maior trofeu</option>
                <option value="nivel" className="bg-purple-900">Maior nivel</option>
                <option value="id" className="bg-purple-900">ID crescente</option>
              </select>
            </div>
          </div>
        )}

        {loading && <p className="text-center text-gray-200">Carregando icones...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}
        {!loading && !error && total === 0 && (
          <div className="max-w-xl mx-auto bg-purple-800/70 border border-purple-700 rounded-xl p-6 text-center text-gray-100">
            Nenhum icone retornado pela API.
          </div>
        )}

        {!loading && !error && filteredTotal > 0 && (
          <div className="space-y-10">
            {(categoryFilter === 'todos' || categoryFilter === 'player') && (
              <IconSection
                title="Player"
                subtitle="Icones usados para representar jogadores"
                colorClass="text-cyan-300"
                borderClass="border border-cyan-400/20"
                icons={filterAndSortIcons.player}
              />
            )}
            {(categoryFilter === 'todos' || categoryFilter === 'club') && (
              <IconSection
                title="Club"
                subtitle="Icones para clubes e identidade de equipe"
                colorClass="text-green-300"
                borderClass="border border-green-400/20"
                icons={filterAndSortIcons.club}
              />
            )}
          </div>
        )}

        {!loading && !error && total > 0 && filteredTotal === 0 && (
          <div className="max-w-xl mx-auto bg-purple-800/70 border border-purple-700 rounded-xl p-6 text-center text-gray-100">
            Nenhum icone corresponde aos filtros selecionados.
          </div>
        )}
      </div>
    </div>
  );
}
