import { useEffect, useState } from 'react';
import api from '../services/api';

export interface GameModeDetailData {
  id: number;
  scId: number;
  name: string;
  title: string;
  tutorial: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  imageUrl2: string;
  color: string;
  bgColor: string;
  disabled: boolean;
  lastActive: number | null;
}

export function useGameModeDetail(id?: string) {
  const [gameMode, setGameMode] = useState<GameModeDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Modo de jogo invalido');
      setLoading(false);
      return;
    }

    setLoading(true);

    api.get(`/gamemode/${id}`)
      .then((res) => {
        setGameMode(res.data || null);
        setError(null);
      })
      .catch(() => {
        setError('Erro ao carregar detalhes do modo');
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { gameMode, loading, error };
}
