import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { BackToTop, Nav } from './components/index';
import { Landingpage, LogIn, SignUp, Summary, SummaryEditor, CardSet, FlashCards } from './pages/index'
import { useTheme } from './contexts/ThemeContext';

function App() {

    const {currentTheme} = useTheme()

    return (
        <div className={`App ${currentTheme}`}>
            
            <Nav />
            <Routes>

                <Route exact path='/' element={ <Landingpage />} />
                <Route exact path='/login' element={<LogIn />} />
                <Route exact path='/signup' element={<SignUp />} />
                <Route exact path='/summary' element={<Summary />} />
                <Route exact path='/summary/:id' element={<SummaryEditor />} />
                <Route exact path='/flashcards' element={<CardSet />} />
                <Route exact path='/flashcards/:cardSetId' element={<FlashCards />} />


            </Routes>
            <BackToTop />


        </div>
    );
}

export default App;