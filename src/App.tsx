import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import CharacterListPage from './pages/CharacterListPage/CharacterListPage';
import CharacterDetailPage from './pages/CharacterDetailPage/CharacterDetailPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import Header from './components/organisms/ORHeader/Header';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
    const location = useLocation();
    return (
        <>
            <Header />
            <AnimatePresence mode='wait'>
                <Routes location={location}>
                    <Route path='/' element={<CharacterListPage />} />
                    <Route
                        path='/character/:id'
                        element={<CharacterDetailPage />}
                    />
                    <Route path='/favorites' element={<FavoritesPage />} />
                </Routes>
            </AnimatePresence>
        </>
    );
};

export default App;
