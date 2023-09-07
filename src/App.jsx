import { useState } from 'react';
import { useMediaQuery } from "react-responsive";
import Board from './components/board/Board';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import EmptyModal from './modals/emptyModal/EmptyModal';
import './App.css';
import { useSelector } from 'react-redux';

const App = () => {
    const [theme, setTheme] = useState('light');
    const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });
    const boards = useSelector((state) => state.boards);

    return (      
        <div className={`App ${ theme }`}>
            { boards.length > 0 &&
                <section className="app-section">
                    <Header theme = { theme } setTheme = { setTheme } />
                    { isBigScreen && <Sidebar theme = { theme } setTheme = { setTheme } /> }
                    <Board /> 
                </section>
            }
            { boards.length <= 0 &&
                <section className='empty-section'>
                    <EmptyModal />
                </section>
            }
        </div>      
    )
}

export default App