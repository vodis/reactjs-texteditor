import React, { Component } from 'react';
import { ThemeContext } from '../../context/theme-context';

import './FileZone.css';

class FileZone extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    static contextType = ThemeContext;

    state = {
        activeButtons: [],
        innerText: null,
    }

    componentDidMount() {
        this.context.toggleRef(this.ref.current);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.activeButtons !== this.state.activeButtons) {
            this.context.toggleButton(this.state.activeButtons);
        }
    }

    handleClickContainer = (e) => {
        e.persist();
        if (e.target.id === 'file-zone') {
            this.context.toggleRangeText('');
            this.context.toggleButton([]);
        }
    }

    handleClick = (e) => {
        e.persist();
        const { innerText } = e.target;

        this.setState({ innerText });
        if (innerText !== this.state.innerText) {
            this.setState({ activeButtons: [] });
        }

        this.makeRecursion([e.target][0]);
    }

    handleMouseDownCapture = (e) => {
        this.context.toggleRangeText(e.target.innerHTML);
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
        return (
            <div id="file-zone" onClick={(e) => this.handleClickContainer(e)}>
                <div 
                    onClick={(e) => this.handleClick(e)} 
                    onMouseDownCapture={(e) => this.handleMouseDownCapture(e)}
                    id="file" 
                    contentEditable={true} 
                    ref={this.ref}
                    >
                        We are currently passing a hard-coded.
                </div>
            </div>
        );
    }
}

export default FileZone;
