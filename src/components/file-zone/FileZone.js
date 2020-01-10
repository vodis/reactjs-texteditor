import React, { Component } from 'react';
import { setStart } from '../../selectors/line-selector';

import './FileZone.css';

class FileZone extends Component {
    state = {
        editable: false,
        activeButtons: [],
        innerText: null,
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
            this.setState({ activeButtons: [] })
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
                <div id="file" contentEditable={editable}>При написании <u>скриптов</u> зачастую</div>
            </div>
        );
    }
}

export default FileZone;
