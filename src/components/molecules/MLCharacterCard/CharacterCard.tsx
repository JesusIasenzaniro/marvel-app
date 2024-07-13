import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../../contexts/FavoritesContext';
import './CharacterCard.css';
import FavoriteButton from '../MLFavoriteButton/FavoriteButton';

interface CharacterCardProps {
    character: {
        id: number;
        name: string;
        thumbnail: {
            path: string;
            extension: string;
        };
    };
    isDetailPage?: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
    const navigate = useNavigate();
    const { toggleFavorite, favorites } = useFavorites();
    const isFavorite = favorites.includes(character.id);

    return (
        <div className='character-card'>
            <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                onClick={() => navigate(`/character/${character.id}`)}
            />
            <div className='separator'></div>
            <div className='card-content'>
                <h3>{character.name}</h3>
                <FavoriteButton
                    isFavorite={isFavorite}
                    toggleFavorite={() => toggleFavorite(Number(character.id))}
                />
            </div>
        </div>
    );
};

export default CharacterCard;
