import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from 'react';
import { Character } from '../types/Character';
import api from '../services/api';

interface FavoriteContextProps {
    characters: Character[];
    favorites: number[];
    addFavorite: (id: number) => void;
    removeFavorite: (id: number) => void;
    toggleFavorite: (id: number) => void;
}

const FavoritesContext = createContext<FavoriteContextProps | undefined>(
    undefined
);

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used inside FavoritesProvider');
    }
    return context;
};

interface FavoritesProviderProps {
    children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
    children,
}) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            const response = await api.get('/characters', {
                params: { limit: 50 },
            });
            setCharacters(response.data.data.results);
        };

        fetchCharacters();
    }, []);

    const addFavorite = (id: number) => setFavorites([...favorites, id]);
    const removeFavorite = (id: number) =>
        setFavorites(favorites.filter((fav) => fav !== id));

    const toggleFavorite = (id: number) => {
        if (favorites.includes(id)) {
            removeFavorite(id);
        } else {
            addFavorite(id);
        }
    };

    return (
        <FavoritesContext.Provider
            value={{
                characters,
                favorites,
                addFavorite,
                removeFavorite,
                toggleFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};
