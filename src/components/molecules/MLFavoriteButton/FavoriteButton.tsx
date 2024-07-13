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
        <FullHeartLogo className='heart-logo' data-testid='full-heart-logo' />
    ) : (
        <EmptyHeartLogo className='heart-logo' data-testid='empty-heart-logo' />
    );

    return (
        <div
            onClick={toggleFavorite}
            className='favorite-button'
            aria-label={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            role='button'
        >
            {favoriteHeart}
        </div>
    );
};

export default FavoriteButton;
