import React, { useContext } from 'react';
import {
    render,
    screen,
    waitFor,
    act,
    fireEvent,
} from '@testing-library/react';
import {
    FavoritesProvider,
    useFavorites,
} from '../../contexts/FavoritesContext';
import api from '../../services/api';
import { Character } from '../../types/Character';

jest.mock('../../services/api');

const mockCharacters: Character[] = [
    {
        id: 1,
        name: 'Spider-Man',
        description: '',
        thumbnail: { path: '', extension: '' },
        comics: { available: 0, collectionURI: '', items: [], returned: 0 },
    },
    {
        id: 2,
        name: 'Iron Man',
        description: '',
        thumbnail: { path: '', extension: '' },
        comics: { available: 0, collectionURI: '', items: [], returned: 0 },
    },
];

const mockApiResponse = {
    data: {
        data: {
            results: mockCharacters,
        },
    },
};

(api.get as jest.Mock).mockResolvedValue(mockApiResponse);

const TestComponent = () => {
    const {
        characters,
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
    } = useFavorites();

    return (
        <div>
            <ul>
                {characters.map((character) => (
                    <li key={character.id}>{character.name}</li>
                ))}
            </ul>
            <button onClick={() => addFavorite(1)}>Add Favorite</button>
            <button onClick={() => removeFavorite(1)}>Remove Favorite</button>
            <button onClick={() => toggleFavorite(2)}>Toggle Favorite</button>
            <div>Favorites Count: {favorites.length}</div>
        </div>
    );
};

describe('FavoritesContext', () => {
    test('fetches and provides characters', async () => {
        await act(async () => {
            render(
                <FavoritesProvider>
                    <TestComponent />
                </FavoritesProvider>
            );
        });

        await waitFor(() =>
            expect(api.get).toHaveBeenCalledWith('/characters', {
                params: { limit: 50 },
            })
        );

        mockCharacters.forEach((character) => {
            expect(screen.getByText(character.name)).toBeInTheDocument();
        });
    });

    test('provides favorites functionality', async () => {
        await act(async () => {
            render(
                <FavoritesProvider>
                    <TestComponent />
                </FavoritesProvider>
            );
        });

        const addButton = screen.getByText('Add Favorite');
        const removeButton = screen.getByText('Remove Favorite');
        const toggleButton = screen.getByText('Toggle Favorite');

        fireEvent.click(addButton);
        expect(screen.getByText('Favorites Count: 1')).toBeInTheDocument();

        fireEvent.click(removeButton);
        expect(screen.getByText('Favorites Count: 0')).toBeInTheDocument();

        fireEvent.click(toggleButton);
        expect(screen.getByText('Favorites Count: 1')).toBeInTheDocument();

        fireEvent.click(toggleButton);
        expect(screen.getByText('Favorites Count: 0')).toBeInTheDocument();
    });
});
