import { useEffect, useState } from 'react';
import api from '../services/api';

export interface IconAsset {
  id: number;
  name?: string;
  name2?: string;
  imageUrl: string;
  imageUrl2?: string;
  requiredExpLevel?: number;
  requiredTotalTrophies?: number;
  sortOrder?: number;
  isReward?: boolean;
  isAvailableForOffers?: boolean;
  brawler?: { id: number; name: string } | null;
}

export interface IconCollection {
  player: IconAsset[];
  club: IconAsset[];
}

export function useIcons() {
  const [icons, setIcons] = useState<IconCollection>({
    player: [],
    club: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get('/icons')
      .then((res) => {
        const player = Object.values(res.data?.player || {}) as IconAsset[];
        const club = Object.values(res.data?.club || {}) as IconAsset[];

        setIcons({
          player,
          club,
        });
        setError(null);
      })
      .catch(() => setError('Erro ao carregar icones'))
      .finally(() => setLoading(false));
  }, []);

  return { icons, loading, error };
}
