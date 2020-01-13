import React, { Component } from 'react';
import { ThemeContext } from '../../context/theme-context';
import { setStart } from '../../selectors/line-selector';
import Tooltip from '../tooltip/Tooltip';

import './FileZone.css';

class FileZone extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            editedWord: '',
            activeButtons: [],
            innerText: null,
        }
    }

    static contextType = ThemeContext;

    componentDidMount() {
        this.context.toggleRef(this.ref.current);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.activeButtons !== this.state.activeButtons) {
            this.context.toggleButton(this.state.activeButtons);
        }

        if (this.context.replaceText.length) {
            let { innerText } = prevState.range.startContainer.parentNode;
            prevState.range.startContainer.parentNode.innerText = innerText.slice(0, prevState.start) + ' ' + this.context.replaceText + ' ' + innerText.slice(prevState.end);
            this.context.setOfReplaceText("");
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
            this.setState({ activeButtons: [], editedWord: '' });
        }

        this.makeRecursion([e.target][0]);
    }

    handleMouseDownCapture = (e) => {
        this.context.toggleRangeText(e.target.innerHTML);
    }

    handleKeyUp = (e) => {
        e.persist();
        let { innerText } = e.target;
        const { offset, range } = setStart();
        const start = this.findStartWord(innerText, offset);
        const end = this.findEndWord(innerText, offset);
        const editedWord = innerText.slice(start, end);
        const top = range.startContainer.parentNode.offsetTop + 25;
        const left = range.startContainer.parentNode.offsetLeft + 25;
        this.setState({ editedWord, top, left, target: e.target, start, end, range });
    }
    
    findStartWord = (text, point) => {
        const start = point - 1;
        return !!text.slice(start, point).match(/\w/) ? this.findStartWord(text, start) : point;
    }

    findEndWord = (text, point) => {
        const end = point + 1;
        return !!text.slice(point, end).match(/\w/) ? this.findEndWord(text, end) : point;
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
        const { editedWord, top, left } = this.state;

        return (
            <div id="file-zone" onClick={(e) => this.handleClickContainer(e)}>
                <div 
                    onClick={(e) => this.handleClick(e)} 
                    onMouseDownCapture={(e) => this.handleMouseDownCapture(e)}
                    onKeyUp={e => this.handleKeyUp(e)}
                    id="file" 
                    contentEditable={true} 
                    ref={this.ref}
                    >
                        We are currently passing a hard-coded.
                </div>
                { editedWord.length > 2 && <Tooltip word={editedWord} top={top} left={left} /> }
            </div>
        );
    }
}

export default FileZone;
