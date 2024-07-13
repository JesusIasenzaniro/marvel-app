import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../../../contexts/FavoritesContext';
import CharacterCard from '../../../../components/molecules/MLCharacterCard/CharacterCard';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('../../../../contexts/FavoritesContext', () => ({
    useFavorites: jest.fn(),
}));

jest.mock(
    '../../../../components/molecules/MLFavoriteButton/FavoriteButton',
    () => (props: any) =>
        (
            <div data-testid='favorite-button' onClick={props.toggleFavorite}>
                {props.isFavorite
                    ? 'Remove from favorites'
                    : 'Add to favorites'}
            </div>
        )
);

describe('CharacterCard Component', () => {
    const character = {
        id: 1,
        name: 'Spider-Man',
        thumbnail: {
            path: 'path/to/thumbnail',
            extension: 'jpg',
        },
    };

    const navigate = jest.fn();
    const toggleFavorite = jest.fn();
    const favorites = [1];

    beforeEach(() => {
        (useNavigate as jest.Mock).mockReturnValue(navigate);
        (useFavorites as jest.Mock).mockReturnValue({
            toggleFavorite,
            favorites,
        });
    });

    test('renders character details correctly', () => {
        render(<CharacterCard character={character} />);
        expect(screen.getByText('Spider-Man')).toBeInTheDocument();
        expect(screen.getByAltText('Spider-Man')).toHaveAttribute(
            'src',
            'path/to/thumbnail.jpg'
        );
    });

    test('navigates to character detail page on image click', () => {
        render(<CharacterCard character={character} />);
        const img = screen.getByAltText('Spider-Man');
        fireEvent.click(img);
        expect(navigate).toHaveBeenCalledWith('/character/1');
    });

    test('renders favorite button with correct state', () => {
        render(<CharacterCard character={character} />);
        expect(screen.getByTestId('favorite-button')).toHaveTextContent(
            'Remove from favorites'
        );
    });

    test('calls toggleFavorite when favorite button is clicked', () => {
        render(<CharacterCard character={character} />);
        const favoriteButton = screen.getByTestId('favorite-button');
        fireEvent.click(favoriteButton);
        expect(toggleFavorite).toHaveBeenCalledWith(character.id);
    });
});
