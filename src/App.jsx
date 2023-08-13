import React, { useState } from 'react'
import Header from './components/header/Header';
import Board from './components/board/Board';

import './App.css';

const App = () => {
    const [theme, setTheme] = useState('light');

    return (
        <div className={`App ${ theme }`}>
            <Header />
            
            <Board />
        </div>
    )
}

export default App