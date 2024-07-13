import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../../contexts/FavoritesContext';
import './Header.css';
import MarvelLogo from '../../../assets/MarvelLogo.svg';
import { ReactComponent as HeartLogo } from '../../../assets/HeartLogo.svg';

import Image from '../../atoms/ATImage/Image';

const Header: React.FC = () => {
    const { favorites } = useFavorites();

    return (
        <header className='header'>
            <Link to='/' className='logo'>
                <Image src={MarvelLogo} alt='Empty Heart Logo' />
            </Link>

            <Link to='/favorites' className='favorites'>
                <HeartLogo />
                <span>{favorites.length}</span>
            </Link>
        </header>
    );
};

export default Header;
