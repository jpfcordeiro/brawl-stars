import { useEffect, useState } from 'react';
import api from '../services/api';

export interface MapDetailData {
  id: number;
  name: string;
  imageUrl: string;
  environment: {
    id: number;
    name: string;
    imageUrl: string;
    hash: string;
  };
  gameMode: {
    id: number;
    name: string;
    color: string;
  };
  stats?: Record<string, number | string>;
  teamStats?: Array<Record<string, number | string>>;
}

export function useMapDetail(id?: string) {
  const [map, setMap] = useState<MapDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Mapa invalido');
      setLoading(false);
      return;
    }

    setLoading(true);

    api.get(`/map/${id}`)
      .then((res) => {
        setMap(res.data || null);
        setError(null);
      })
      .catch(() => {
        setError('Erro ao carregar detalhes do mapa');
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { map, loading, error };
}
