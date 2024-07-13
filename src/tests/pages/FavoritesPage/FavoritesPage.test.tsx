import React from 'react';
import { render, screen } from '@testing-library/react';
import { useFavorites } from '../../../contexts/FavoritesContext';
import { useSearch } from '../../../contexts/SearchContext';
import FavoritesPage from '../../../pages/FavoritesPage/FavoritesPage';

jest.mock('../../../contexts/SearchContext', () => ({
    useSearch: jest.fn(),
}));

jest.mock('../../../contexts/FavoritesContext', () => ({
    useFavorites: jest.fn(),
}));

jest.mock('../../../components/molecules/MLSearchBar/SearchBar', () => () => (
    <div data-testid='search-bar'>Search Bar</div>
));

jest.mock(
    '../../../components/organisms/ORCharacterList/CharacterList',
    () =>
        ({ characters }: { characters: any[] }) =>
            (
                <div data-testid='character-list'>
                    {characters.map((character) => (
                        <div key={character.id} data-testid='character-item'>
                            {character.name}
                        </div>
                    ))}
                </div>
            )
);

describe('FavoritesPage Component', () => {
    const mockCharacters = [
        { id: 1, name: 'Spider-Man' },
        { id: 2, name: 'Iron Man' },
        { id: 3, name: 'Thor' },
    ];

    const mockFavorites = [1, 3];

    beforeEach(() => {
        (useFavorites as jest.Mock).mockReturnValue({
            characters: mockCharacters,
            favorites: mockFavorites,
        });

        (useSearch as jest.Mock).mockReturnValue({
            query: '',
        });
    });

    test('renders search bar and character list', () => {
        render(<FavoritesPage />);

        expect(screen.getByTestId('search-bar')).toBeInTheDocument();
        expect(screen.getByText('Results: 2')).toBeInTheDocument();
        expect(screen.getByTestId('character-list')).toBeInTheDocument();
        expect(screen.getAllByTestId('character-item')).toHaveLength(2);
        expect(screen.getByText('Spider-Man')).toBeInTheDocument();
        expect(screen.getByText('Thor')).toBeInTheDocument();
    });

    test('filters favorite character list based on search query', () => {
        (useSearch as jest.Mock).mockReturnValue({
            query: 'spider',
        });

        render(<FavoritesPage />);

        expect(screen.getByText('Results: 1')).toBeInTheDocument();
        expect(screen.getByText('Spider-Man')).toBeInTheDocument();
        expect(screen.queryByText('Thor')).not.toBeInTheDocument();
    });

    test('shows no results when search query does not match any favorite character', () => {
        (useSearch as jest.Mock).mockReturnValue({
            query: 'hulk',
        });

        render(<FavoritesPage />);

        expect(screen.getByText('Results: 0')).toBeInTheDocument();
        expect(screen.queryByTestId('character-item')).not.toBeInTheDocument();
    });
});
