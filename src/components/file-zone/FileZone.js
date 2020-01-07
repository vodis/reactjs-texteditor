import React, { Component } from 'react';
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

    handleAppendInput = (event) => {
        event.persist();
        let { innerHTML } = event.target.parentElement;
        let { extractedValue, findAllTags, mutatedOuterHtml } = captureSelection(innerHTML);
        
        if (!!mutatedOuterHtml) {
            event.target.parentElement.innerHTML = mutatedOuterHtml;
            this.setState({ isActive: true, inputValue: extractedValue, findAllTags, clientX: event.clientX, clientY: event.clientY });
        }
    }

    render() {
        const { inputValue, isActive, clientY, clientX } = this.state;

        return (
            <div id="file-zone">
                <div 
                    id="file"
                    onClick={this.handleClick}
                    onMouseUpCapture={this.handleAppendInput}
                >
                    <p>I can <strong>solve</strong> this task! <i>Some Italic text.</i> Have <strong>a good </strong>day!</p>
                    <p>Underline <u>@your idea</u> Ather <u>text</u> example</p>
                    { isActive 
                        && <Input 
                                top= {clientY}
                                left={clientX}
                                value={inputValue} 
                                inputChange={this.handleChange}
                            />
                    }
                </div>
            </div>
        );
    }
}

export default FileZone;
