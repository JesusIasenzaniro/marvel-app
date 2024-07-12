import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { Character } from '../../types/Character';
import { Comic } from '../../types/Comic';
import { useFavorites } from '../../contexts/FavoritesContext';
import './CharacterDetailPage.css';
import Image from '../../components/atoms/ATImage/Image';
import FavoriteButton from '../../components/molecules/MLFavoriteButton/FavoriteButton';
import Transition from '../../components/Transition';

const CharacterDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<Character | null>(null);
    const [comics, setComics] = useState<Comic[]>([]);
    const { toggleFavorite, favorites } = useFavorites();
    const isFavorite = favorites.includes(Number(id));

    useEffect(() => {
        const fetchCharacter = async () => {
            const response = await api.get(`/characters/${id}`);
            setCharacter(response.data.data.results[0]);
        };

        const fetchComics = async () => {
            const response = await api.get(`/characters/${id}/comics`, {
                params: { limit: 20 },
            });
            setComics(response.data.data.results);
        };

        fetchCharacter();
        fetchComics();
    }, [id]);

    if (!character) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='character-header'>
                <Image
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                    width={320}
                    height={320}
                />
                <div className='character-info'>
                    <div className='character-action-info'>
                        <h1>{character.name}</h1>
                        <FavoriteButton
                            isFavorite={isFavorite}
                            toggleFavorite={() => toggleFavorite(Number(id))}
                            isDetailPage={true}
                        />
                    </div>
                    <p>{character.description}</p>
                </div>
            </div>

            <div className='comics-carousel-container'>
                <h2>COMICS</h2>
                <div className='comics-carousel'>
                    {comics.map((comic) => (
                        <div key={comic.id} className='comic-card'>
                            <img
                                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                alt={comic.title}
                            />
                            <p className='comic-title'>{comic.title}</p>
                            <p className='comic-date'>
                                {new Date(
                                    comic.dates.find(
                                        (date) => date.type === 'onsaleDate'
                                    )?.date || ''
                                ).getFullYear()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Transition(CharacterDetailPage);
