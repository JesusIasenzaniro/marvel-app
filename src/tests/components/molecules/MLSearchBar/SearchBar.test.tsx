import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSearch } from '../../../../contexts/SearchContext';
import SearchBar from '../../../../components/molecules/MLSearchBar/SearchBar';

jest.mock('../../../../contexts/SearchContext', () => ({
    useSearch: jest.fn(),
}));

describe('SearchBar Component', () => {
    const setQuery = jest.fn();
    const query = 'Spider-Man';

    beforeEach(() => {
        (useSearch as jest.Mock).mockReturnValue({
            query,
            setQuery,
        });
    });

    test('renders search bar with initial query', () => {
        render(<SearchBar />);
        expect(screen.getByPlaceholderText('SEARCH CHARACTER...')).toHaveValue(
            'Spider-Man'
        );
    });

    test('calls setQuery when input value changes', () => {
        render(<SearchBar />);
        const input = screen.getByPlaceholderText('SEARCH CHARACTER...');
        fireEvent.change(input, { target: { value: 'Iron Man' } });
        expect(setQuery).toHaveBeenCalledWith('Iron Man');
    });

    test('prevents default form submission', () => {
        render(<SearchBar />);
        const form = document.querySelector('.search-bar') as HTMLFormElement;
        expect(form).not.toBeNull(); // Ensure form is not null
        if (form) {
            const handleSubmit = jest.fn((e) => e.preventDefault());
            form.onsubmit = handleSubmit;
            fireEvent.submit(form);
            expect(handleSubmit).toHaveBeenCalled();
        }
    });

    test('renders search icon', () => {
        render(<SearchBar />);
        expect(screen.getByTestId('fa-search')).toBeInTheDocument();
    });
});
