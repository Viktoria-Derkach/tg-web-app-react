

import './App.css';
import React, {useEffect} from "react";
import Header from './components/Header/Header';
// import {useTelegram} from "./hooks/useTelegram";

const tg = window.Telegram.WebApp
function App() {
    // const {onToggleButton, tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])



    return (
        <div className="App">
          <Header />
          work
        </div>
    );
}

export default App;
