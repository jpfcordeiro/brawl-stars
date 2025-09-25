import { useEffect, useState } from 'react';
import api from '../services/api';

export interface GameMode {
  id: number;
  name: string;
  color: string;
  description: string;
  imageUrl: string;
}

export function useGameModes() {
  const [gameModes, setGameModes] = useState<GameMode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get('/gamemodes')
      .then(res => {
        setGameModes(res.data.list || []);
        setError(null);
      })
      .catch(() => setError('Erro ao carregar modos de jogo'))
      .finally(() => setLoading(false));
  }, []);

  return { gameModes, loading, error };
}
