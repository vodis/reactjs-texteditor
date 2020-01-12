import React, {Component} from 'react';
import './App.css';
import ControlPanel from "./components/control-panel/ControlPanel";
import FileZone from "./components/file-zone/FileZone";

import { ThemeContext, themes } from './context/theme-context';

class App extends Component {

    static contextType = ThemeContext;

    constructor(props) {
        super(props);
        this.setUpActiveButton = (setOfButtons, set = undefined) => {
            this.setState((state) => ({
                setOfButtons: !set ? setOfButtons : state.setOfButtons.concat(setOfButtons),
            }));
        };
        this.setRef = (ref) => {
            this.setState({ setForwardRef: ref });
        };
        this.setOfRenge = (text) => {
            this.setState({ setOfRangeText: text });
        }

        this.state = {
            setForwardRef: themes.setForwardRef,
            setOfButtons: themes.setOfButtons,
            setOfRangeText: themes.setOfRangeText,
            toggleButton: this.setUpActiveButton,
            toggleRef: this.setRef,
            toggleRangeText: this.setOfRenge,
        }
    }

    handleClick = (e) => {
        this.setState({ setOfRangeText: '', setOfButtons: [] });
    }

    render() {
        return (
            <div className="App">
                <header onClick={this.handleClick}>
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
