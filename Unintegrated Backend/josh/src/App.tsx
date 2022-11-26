import React from "react";
import "./App.css";
import { Counter } from "./components/Counter";
// import { Card } from "./interfaces/card";
// import { exportCards } from "./export";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                UM COS420 with React Hooks and TypeScript. Josh Andle and Hello
                World.
            </header>
            <hr></hr>
            <Counter></Counter>
        </div>
    );
}

export default App;
