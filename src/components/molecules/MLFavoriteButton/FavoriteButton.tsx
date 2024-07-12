import React, { useState } from 'react';
import Image from '../../atoms/ATImage/Image';
import FullHeartLogo from '../../../assets/FullHeartLogo.svg';
import EmptyHeartLogo from '../../../assets/EmptyHeartLogo.svg';
import './FavoriteButton.css';

interface FavoriteButtonProps {
    isFavorite: boolean;
    toggleFavorite: () => void;
    isDetailPage: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    isFavorite,
    toggleFavorite,
    isDetailPage,
}) => {
    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);

    const logoSrc = isFavorite ? FullHeartLogo : EmptyHeartLogo;
    const logoClass =
        isFavorite && !isDetailPage && hover
            ? 'favorite-hover'
            : isFavorite
            ? 'favorite'
            : 'not-favorite';

    return (
        <div
            onClick={toggleFavorite}
            className='favorite-button'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Image
                src={logoSrc}
                alt={isFavorite ? 'Full Heart Logo' : 'Empty Heart Logo'}
                className={logoClass}
            />
        </div>
    );
};

export default FavoriteButton;
