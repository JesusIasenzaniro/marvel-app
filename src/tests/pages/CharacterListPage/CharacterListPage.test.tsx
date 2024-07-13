import React from 'react';
import { render, screen } from '@testing-library/react';
import { useFavorites } from '../../../contexts/FavoritesContext';
import { useSearch } from '../../../contexts/SearchContext';
import CharacterListPage from '../../../pages/CharacterListPage/CharacterListPage';

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

describe('CharacterListPage Component', () => {
    const mockCharacters = [
        { id: 1, name: 'Spider-Man' },
        { id: 2, name: 'Iron Man' },
        { id: 3, name: 'Thor' },
    ];

    beforeEach(() => {
        (useFavorites as jest.Mock).mockReturnValue({
            characters: mockCharacters,
        });

        (useSearch as jest.Mock).mockReturnValue({
            query: '',
        });
    });

    test('renders search bar and character list', () => {
        render(<CharacterListPage />);

        expect(screen.getByTestId('search-bar')).toBeInTheDocument();
        expect(screen.getByText('Results: 3')).toBeInTheDocument();
        expect(screen.getByTestId('character-list')).toBeInTheDocument();
        expect(screen.getAllByTestId('character-item')).toHaveLength(3);
    });

    test('filters character list based on search query', () => {
        (useSearch as jest.Mock).mockReturnValue({
            query: 'spider',
        });

        render(<CharacterListPage />);

        expect(screen.getByText('Results: 1')).toBeInTheDocument();
        expect(screen.getByText('Spider-Man')).toBeInTheDocument();
    });

    test('shows no results when search query does not match any character', () => {
        (useSearch as jest.Mock).mockReturnValue({
            query: 'hulk',
        });

        render(<CharacterListPage />);

        expect(screen.getByText('Results: 0')).toBeInTheDocument();
        expect(screen.queryByTestId('character-item')).not.toBeInTheDocument();
    });
});
