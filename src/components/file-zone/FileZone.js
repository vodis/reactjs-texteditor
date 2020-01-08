import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import { setStart, captureSelection } from '../../selectors/line-selector';
import Input from '../input/Input';

import './FileZone.css';

class FileZone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            isActive: false,
        }
    }

    handleClick = (e) => {
        e.persist();
        let { innerText } = e.target;
        let { node, offset } = setStart();
        console.log(node, offset);
        console.log(innerText)
    }

    handleMouseUpCapture = (event) => {
        event.persist();
        let { innerHTML } = event.target.parentElement;
        let { extractedValue, outerHtmlLeft, findAllTags, outerHtmlRight } = captureSelection(innerHTML);

        if ( !extractedValue ) {
            return null;
        }
        
        event.target.parentElement.innerHTML = outerHtmlLeft + findAllTags + this.renderHtmlInput(extractedValue) + outerHtmlRight;
    }

    renderHtmlInput = (value) => {
        return ReactDOMServer.renderToStaticMarkup(
            <Input value={value} />
        );
    }

    render() {
        return (
            <div id="file-zone">
                <div 
                    id="file"
                    // onClick={this.handleClick}
                    onMouseUpCapture={this.handleMouseUpCapture}
                >
                    <p>I can <strong>solve</strong> this task! <i>Some Italic text.</i> Have <strong>a good </strong>day!</p>
                    <p>Underline <u>@your idea</u> Ather <u>text</u> example</p>
                </div>
            </div>
        );
    }
}

export default FileZone;
