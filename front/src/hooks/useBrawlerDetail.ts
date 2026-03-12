import { useEffect, useState } from 'react';
import api from '../services/api';

export interface BrawlerAbility {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface BrawlerDetailData {
  id: number;
  name: string;
  imageUrl: string;
  imageUrl2: string;
  imageUrl3: string;
  class: {
    id: number;
    name: string;
  };
  rarity: {
    id: number;
    name: string;
    color: string;
  };
  description: string;
  starPowers: BrawlerAbility[];
  gadgets: BrawlerAbility[];
  link: string;
}

export function useBrawlerDetail(id?: string) {
  const [brawler, setBrawler] = useState<BrawlerDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Brawler invalido');
      setLoading(false);
      return;
    }

    setLoading(true);

    api.get(`/brawler/${id}`)
      .then((res) => {
        setBrawler(res.data || null);
        setError(null);
      })
      .catch(() => {
        setError('Erro ao carregar detalhes do brawler');
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { brawler, loading, error };
}
