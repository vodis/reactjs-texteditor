import React, {Component} from 'react';
import './App.css';
import ControlPanel from "./components/control-panel/ControlPanel";
import FileZone from "./components/file-zone/FileZone";

import { ThemeContext } from './context/theme-context';

class App extends Component {
    constructor(props) {
        super(props);
        this.toggleButton = () => {
            this.setState( state => ({
                button: state.activeButtons
            }));
        };

        this.state = {
            button: [],
            toggleButton: this.toggleButton,
        }
    }

    render() {
        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <main>
                    <ThemeContext.Provider value={{color: "red"}}>
                        <ControlPanel/>
                        <FileZone/>
                    </ThemeContext.Provider>
                </main>
            </div>
        );
    }
}

export default App;
