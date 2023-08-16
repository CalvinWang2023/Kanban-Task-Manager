import { useState } from 'react';
import { useMediaQuery } from "react-responsive";
import Board from './components/board/Board';
import Sidebar from './components/sidebar/Sidebar';

import './App.css';


const App = () => {
    const [theme, setTheme] = useState('light');
    const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });

    return (
        <div className={`App ${ theme }`}>
            { 
                isBigScreen && 
                <Sidebar /> 
            }
            <Board />
        </div>
    )
}

export default App