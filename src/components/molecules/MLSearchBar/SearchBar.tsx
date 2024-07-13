import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSearch } from '../../../contexts/SearchContext';
import './SearchBar.css';

const SearchBar: React.FC = () => {
    const { query, setQuery } = useSearch();

    return (
        <form className='search-bar' onSubmit={(e) => e.preventDefault()}>
            <FaSearch data-testid='fa-search' />
            <input
                type='text'
                placeholder='SEARCH CHARACTER...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </form>
    );
};

export default SearchBar;
