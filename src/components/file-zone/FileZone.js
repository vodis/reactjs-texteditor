import React, { Component } from 'react';
import { ThemeContext } from '../../context/theme-context';

import './FileZone.css';

class FileZone extends Component {

    static contextType = ThemeContext;

    state = {
        editable: false,
        activeButtons: [],
        innerText: null,
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.activeButtons !== this.state.activeButtons) {
            this.context.toggleButton(this.state.activeButtons)
        }
    }

    handleClick = (e) => {
        e.persist();
        const { id, innerText } = e.target;

        if ( id === 'file-zone') {
            return this.setState({ editable: false, })
        } else {
            this.setState({ editable: true, })
        }

        this.setState({ innerText });
        if (innerText !== this.state.innerText) {
            this.setState({ activeButtons: [] });
        }

        this.makeRecursion([e.target][0]);
    }

    makeRecursion = (node) => {
        let { tagName, parentNode } = node;
        
        while (tagName !== "DIV") {
            this.setState((state) => {
                return {
                    ...state,
                    activeButtons: state.activeButtons.concat(tagName),
                }
            });
            return this.makeRecursion(parentNode);
        }
    }
    

    render() {
        const { editable } = this.state;

        return (
            <div id="file-zone" onClick={(e) => this.handleClick(e)}>
                <div id="file" contentEditable={editable}>We are currently passing a hard-coded.</div>
            </div>
        );
    }
}

export default FileZone;
