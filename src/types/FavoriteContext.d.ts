export interface FavoriteContextProps {
    characters: Character[];
    favorites: number[];
    addFavorite: (id: number) => void;
    removeFavorite: (id: number) => void;
    toggleFavorite: (id: number) => void;
}
