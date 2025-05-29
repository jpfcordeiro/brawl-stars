import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';

interface BrawlerClass {
    id: number;
    name: string;
}

interface BrawlerRarity {
    id: number;
    name: string;
    color: string;
}

interface StarPower {
    id: number;
    name: string;
    path: string;
    version: number;
    description: string;
    descriptionHtml: string;
    imageUrl: string;
    released: boolean;
}

interface Gadget {
    id: number;
    name: string;
    path: string;
    version: number;
    description: string;
    descriptionHtml: string;
    imageUrl: string;
    released: boolean;
}

interface Brawler {
    id: number;
    avatarId: number;
    name: string;
    hash: string;
    path: string;
    fankit: string;
    released: boolean;
    version: number;
    link: string;
    imageUrl: string;
    imageUrl2: string;
    imageUrl3: string;
    class: BrawlerClass;
    rarity: BrawlerRarity;
    unlock: null | string;
    description: string;
    descriptionHtml: string;
    starPowers: StarPower[];
    gadgets: Gadget[];
    videos: any[];
}

interface BrawlerContextData {
    brawlers: Brawler[];
    loading: boolean;
    error: string | null;
    fetchBrawlers: () => Promise<void>;
}

const BrawlerContext = createContext<BrawlerContextData>({} as BrawlerContextData);

export const BrawlerProvider = ({ children }: { children: ReactNode }) => {
    const [brawlers, setBrawlers] = useState<Brawler[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBrawlers = async () => {
        try {
            setLoading(true);
            const response = await api.get('/brawlers');
            setBrawlers(response.data.list);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar os brawlers');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBrawlers();
    }, []);

    return (
        <BrawlerContext.Provider value={{ brawlers, loading, error, fetchBrawlers }}>
            {children}
        </BrawlerContext.Provider>
    );
};

export const useBrawler = () => {
    const context = useContext(BrawlerContext);
    if (!context) {
        throw new Error('useBrawler must be used within a BrawlerProvider');
    }
    return context;
}; 