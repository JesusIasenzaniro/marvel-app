import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { jest } from '@jest/globals';
import { useFavorites } from '../../../contexts/FavoritesContext';
import api from '../../../services/api';
import CharacterDetailPage from '../../../pages/CharacterDetailPage/CharacterDetailPage';

jest.mock('../../../contexts/FavoritesContext', () => ({
    useFavorites: jest.fn(),
}));

jest.mock('../../../services/api', () => ({
    get: jest.fn(),
}));

jest.mock('../../../assets/FullHeartLogo.svg', () => ({
    ReactComponent: 'svg',
}));

jest.mock('../../../assets/EmptyHeartLogo.svg', () => ({
    ReactComponent: 'svg',
}));

const mockCharacter = {
    id: 1,
    name: 'Spider-Man',
    description: 'Friendly neighborhood Spider-Man',
    thumbnail: {
        path: 'http://example.com/spiderman',
        extension: 'jpg',
    },
};

const mockComics = [
    {
        id: 101,
        title: 'Amazing Spider-Man',
        thumbnail: {
            path: 'http://example.com/asm',
            extension: 'jpg',
        },
        dates: [{ type: 'onsaleDate', date: '2021-08-01T00:00:00Z' }],
    },
    {
        id: 102,
        title: 'Spider-Man: Homecoming',
        thumbnail: {
            path: 'http://example.com/smh',
            extension: 'jpg',
        },
        dates: [{ type: 'onsaleDate', date: '2020-07-01T00:00:00Z' }],
    },
];

const mockToggleFavorite = jest.fn();
const mockAddFavorite = jest.fn();
const mockRemoveFavorite = jest.fn();

describe('CharacterDetailPage', () => {
    beforeEach(() => {
        (
            useFavorites as jest.MockedFunction<typeof useFavorites>
        ).mockReturnValue({
            toggleFavorite: mockToggleFavorite,
            addFavorite: mockAddFavorite,
            removeFavorite: mockRemoveFavorite,
            favorites: [],
            characters: [],
        });

        (api.get as jest.MockedFunction<typeof api.get>).mockImplementation(
            (url: string) => {
                if (url.includes('/characters/')) {
                    return Promise.resolve({
                        data: {
                            data: {
                                results: [mockCharacter],
                            },
                        },
                    });
                } else if (url.includes('/comics')) {
                    return Promise.resolve({
                        data: {
                            data: {
                                results: mockComics,
                            },
                        },
                    });
                }
                return Promise.resolve({} as any);
            }
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders character details correctly', async () => {
        render(
            <BrowserRouter>
                <CharacterDetailPage />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Loading...')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Spider-Man')).toBeInTheDocument();
        });

        expect(
            screen.getByText('Friendly neighborhood Spider-Man')
        ).toBeInTheDocument();
        expect(screen.getByAltText('Spider-Man')).toHaveAttribute(
            'src',
            'http://example.com/spiderman.jpg'
        );
    });
});
