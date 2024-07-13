import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchProvider, useSearch } from '../../contexts/SearchContext';

const TestComponent = () => {
    const { query, setQuery } = useSearch();

    return (
        <div>
            <div data-testid='query'>{query}</div>
            <button onClick={() => setQuery('Spider-Man')}>Set Query</button>
        </div>
    );
};

describe('SearchContext', () => {
    test('provides query and setQuery', () => {
        render(
            <SearchProvider>
                <TestComponent />
            </SearchProvider>
        );

        const queryDisplay = screen.getByTestId('query');
        const button = screen.getByText('Set Query');

        expect(queryDisplay).toHaveTextContent('');

        fireEvent.click(button);
        expect(queryDisplay).toHaveTextContent('Spider-Man');
    });

    test('throws error if used outside of SearchProvider', () => {
        const consoleError = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        expect(() => render(<TestComponent />)).toThrow(
            'useSearch must be used inside SearchProvider'
        );

        consoleError.mockRestore();
    });
});
