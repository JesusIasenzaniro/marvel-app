import React from 'react';
import './CharacterList.css';
import CharacterCard from '../../molecules/MLCharacterCard/CharacterCard';
import { Character } from '../../../types/Character';

interface CharacterListProps {
    characters: Character[];
}

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
    return (
        <div className='character-list'>
            {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
            ))}
        </div>
    );
};

export default CharacterList;
