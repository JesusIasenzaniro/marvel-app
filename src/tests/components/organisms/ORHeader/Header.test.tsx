import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useFavorites } from '../../../../contexts/FavoritesContext';
import Header from '../../../../components/organisms/ORHeader/Header';

jest.mock('../../../../contexts/FavoritesContext', () => ({
    useFavorites: jest.fn(),
}));

jest.mock('../../../../assets/MarvelLogo.svg', () => 'marvel-logo.svg');

jest.mock('../../../../assets/HeartLogo.svg', () => ({
    ReactComponent: () => <div data-testid='heart-logo'>Heart Logo</div>,
}));

jest.mock(
    '../../../../components/atoms/ATImage/Image',
    () =>
        ({ src, alt }: { src: string; alt: string }) =>
            <img src={src} alt={alt} data-testid='mock-image' />
);

describe('Header Component', () => {
    beforeEach(() => {
        (useFavorites as jest.Mock).mockReturnValue({
            favorites: [{ id: 1 }, { id: 2 }],
        });
    });

    test('renders logo and favorites link correctly', () => {
        render(
            <Router>
                <Header />
            </Router>
        );

        const logoLink = screen.getByRole('link', {
            name: /Empty Heart Logo/i,
        });
        expect(logoLink).toHaveAttribute('href', '/');
        expect(screen.getByTestId('mock-image')).toHaveAttribute(
            'src',
            'marvel-logo.svg'
        );
        expect(screen.getByAltText('Empty Heart Logo')).toBeInTheDocument();

        const favoritesLink = screen.getByRole('link', { name: /Heart Logo/i });
        expect(favoritesLink).toHaveAttribute('href', '/favorites');
        expect(screen.getByText('Heart Logo')).toBeInTheDocument();
    });

    test('displays the correct number of favorites', () => {
        render(
            <Router>
                <Header />
            </Router>
        );

        expect(screen.getByText('2')).toBeInTheDocument();
    });
});
