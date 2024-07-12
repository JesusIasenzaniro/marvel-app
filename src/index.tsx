import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { SearchProvider } from './contexts/SearchContext';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <FavoritesProvider>
            <SearchProvider>
                <Router>
                    <Routes>
                        <Route path='/*' element={<App />} />
                    </Routes>
                </Router>
            </SearchProvider>
        </FavoritesProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
