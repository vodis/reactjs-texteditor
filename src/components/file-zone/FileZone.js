import React, { Component } from 'react';
import { setStart, captureSelection } from '../../selectors/line-selector';

import './FileZone.css';

class FileZone extends Component {

    handleClick = (e) => {
        e.persist();
        let { innerText } = e.target;
        let { node, offset } = setStart();
        console.log(node, offset);
        console.log(innerText)
    }

    handleAppendInput = async (event) => {
        event.persist();
        let { innerHTML } = event.target.parentElement;
        
        // let targetInnerHTML = event.target.innerHTML;
        // const input = document.createElement("input");
        // input.type = ("text");
        // input.id = 'dummy-input';
        // input.className = target.nodeName === 'P' && 'w-100';
        // input.value = saveInnerText;
        // target.insertAdjacentElement('beforebegin', input);
        // input.focus();
        // target.innerText = "";
        
        
        let { mutatedOuterHtml } = captureSelection(innerHTML);
        
        if (!!mutatedOuterHtml) {
            event.target.parentElement.innerHTML = mutatedOuterHtml;
        }
    }

    render() {
        return (
            <div id="file-zone">
                <div 
                    id="file"
                    onClick={this.handleClick}
                    onMouseUpCapture={this.handleAppendInput}
                    // onClick={this.handleClick}
                >
                    <p>I can <strong>solve <input type="text" value="input" onChange={() => {}}/> <span>link</span></strong> this task! <i>Some Italic text.</i></p>
                    <p>Underline <u>@your idea</u> Ather <u>text</u> example</p>
                </div>
            </div>
        );
    }
}

export default FileZone;
