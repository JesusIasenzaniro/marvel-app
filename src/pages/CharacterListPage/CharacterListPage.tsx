import React from 'react';
import SearchBar from '../../components/molecules/MLSearchBar/SearchBar';
import CharacterList from '../../components/organisms/ORCharacterList/CharacterList';
import { useSearch } from '../../contexts/SearchContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import './CharacterListPage.css';
import Transition from '../../components/Transition';

const CharacterListPage: React.FC = () => {
    const { characters } = useFavorites();
    const { query } = useSearch();

    const filteredCharacters = characters.filter((character) =>
        character.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className='character-list-container'>
            <SearchBar />
            <div className='results-count'>
                Results: {filteredCharacters.length}
            </div>
            <CharacterList characters={filteredCharacters} />
        </div>
    );
};

export default Transition(CharacterListPage);
