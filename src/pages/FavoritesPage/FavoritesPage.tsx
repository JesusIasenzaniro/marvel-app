import React from 'react';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useSearch } from '../../contexts/SearchContext';
import SearchBar from '../../components/molecules/MLSearchBar/SearchBar';
import CharacterList from '../../components/organisms/ORCharacterList/CharacterList';
import './FavoritesPage.css';
import Transition from '../../components/Transition';

const FavoritesPage: React.FC = () => {
    const { characters, favorites } = useFavorites();
    const { query } = useSearch();

    const filteredFavoriteCharacters = characters.filter(
        (character) =>
            favorites.includes(character.id) &&
            character.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
            <div className='favorites-container'>
                <h1 className='favorites-title'>FAVORITES</h1>
                <SearchBar />
                <div className='results-count'>
                    Results: {filteredFavoriteCharacters.length}
                </div>
                <CharacterList characters={filteredFavoriteCharacters} />
            </div>
        </>
    );
};

export default Transition(FavoritesPage);
