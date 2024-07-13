import React from 'react';
import { ReactComponent as FullHeartLogo } from '../../../assets/FullHeartLogo.svg';
import { ReactComponent as EmptyHeartLogo } from '../../../assets/EmptyHeartLogo.svg';
import './FavoriteButton.css';

interface FavoriteButtonProps {
    isFavorite: boolean;
    toggleFavorite: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    isFavorite,
    toggleFavorite,
}) => {
    const favoriteHeart = isFavorite ? (
        <FullHeartLogo className='heart-logo' />
    ) : (
        <EmptyHeartLogo className='heart-logo' />
    );

    return (
        <div onClick={toggleFavorite} className='favorite-button'>
            {favoriteHeart}
        </div>
    );
};

export default FavoriteButton;
