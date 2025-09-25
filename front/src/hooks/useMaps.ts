import { useEffect, useState } from 'react';
import api from '../services/api';

export interface Map {
  id: number;
  name: string;
  imageUrl: string;
  environment: string;
  gameMode: {
    id: number;
    name: string;
    color: string;
  };
}

export function useMaps() {
  const [maps, setMaps] = useState<Map[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get('/maps')
      .then(res => {
        setMaps(res.data.list || []);
        setError(null);
      })
      .catch(() => setError('Erro ao carregar mapas'))
      .finally(() => setLoading(false));
  }, []);

  return { maps, loading, error };
}
