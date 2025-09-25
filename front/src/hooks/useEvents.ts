import { useEffect, useState } from 'react';
import api from '../services/api';

export interface Event {
  id: number;
  slot: number;
  startTime: string;
  endTime: string;
  map: {
    id: number;
    name: string;
    imageUrl: string;
    environment: string;
    gameMode: {
      id: number;
      name: string;
      color: string;
    };
  };
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get('/events')
      .then(res => {
        setEvents(res.data.eventSlots || []);
        setError(null);
      })
      .catch(() => setError('Erro ao carregar eventos'))
      .finally(() => setLoading(false));
  }, []);

  return { events, loading, error };
}
