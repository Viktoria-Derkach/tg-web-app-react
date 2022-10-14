

import './App.css';
import React, {useEffect} from "react";
// import {useTelegram} from "./hooks/useTelegram";

const tg = window.Telegram.WebApp
function App() {
    // const {onToggleButton, tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    const onClose = () => {
      tg.close()
    }

    return (
        <div className="App">
          hhfjfg
       <button onClick={onClose}>Close</button>
        </div>
    );
}

export default App;
