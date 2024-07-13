import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FavoriteButton from '../../../../components/molecules/MLFavoriteButton/FavoriteButton';

jest.mock('../../../assets/FullHeartLogo.svg', () => ({
    ReactComponent: () => (
        <div data-testid='full-heart-logo'>FullHeartLogo</div>
    ),
}));

jest.mock('../../../assets/EmptyHeartLogo.svg', () => ({
    ReactComponent: () => (
        <div data-testid='empty-heart-logo'>EmptyHeartLogo</div>
    ),
}));

describe('FavoriteButton Component', () => {
    test('renders FullHeartLogo when isFavorite is true', () => {
        render(<FavoriteButton isFavorite={true} toggleFavorite={jest.fn()} />);
        expect(screen.getByTestId('full-heart-logo')).toBeInTheDocument();
    });

    test('renders EmptyHeartLogo when isFavorite is false', () => {
        render(
            <FavoriteButton isFavorite={false} toggleFavorite={jest.fn()} />
        );
        expect(screen.getByTestId('empty-heart-logo')).toBeInTheDocument();
    });

    test('calls toggleFavorite when clicked', () => {
        const toggleFavorite = jest.fn();
        render(
            <FavoriteButton
                isFavorite={false}
                toggleFavorite={toggleFavorite}
            />
        );
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(toggleFavorite).toHaveBeenCalledTimes(1);
    });

    test('has correct aria-label and title when isFavorite is true', () => {
        render(<FavoriteButton isFavorite={true} toggleFavorite={jest.fn()} />);
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-label', 'Remove from favorites');
        expect(button).toHaveAttribute('title', 'Remove from favorites');
    });

    test('has correct aria-label and title when isFavorite is false', () => {
        render(
            <FavoriteButton isFavorite={false} toggleFavorite={jest.fn()} />
        );
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-label', 'Add to favorites');
        expect(button).toHaveAttribute('title', 'Add to favorites');
    });
});
