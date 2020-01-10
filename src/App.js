import React, {Component} from 'react';
import './App.css';
import ControlPanel from "./components/control-panel/ControlPanel";
import FileZone from "./components/file-zone/FileZone";

import { ThemeContext, themes } from './context/theme-context';

class App extends Component {
    constructor(props) {
        super(props);
        this.setUpActiveButton = (setOfButtons) => {
            this.setState( () => ({
                setOfButtons,
            }));
        };

        this.state = {
            innerText: themes.innerText,
            setOfButtons: themes.setOfButtons,
            toggleButton: this.setUpActiveButton,
        }
    }

    render() {
        console.log(this.state)
        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <main>
                    <ThemeContext.Provider value={this.state}>
                        <ControlPanel/>
                        <FileZone/>
                    </ThemeContext.Provider>
                </main>
            </div>
        );
    }
}

export default App;
