import React, { Component } from 'react';
import './FileZone.css';

class FileZone extends Component {
    handleAppendInput = (event) => {
        event.persist();
        const saveOuterHtml = event.target.outerHTML;
        const saveInnerText = event.target.innerText;
        const input = document.createElement("input");
        input.type = ("text");
        input.id = 'dummy-input';
        input.className = event.target.nodeName === 'P' && 'w-100';
        input.value = saveInnerText;
        // event.target.insertAdjacentElement('beforebegin', input);
        // input.focus();
        // event.target.innerText = "";

        document.onselectionchange = () => {
            let {anchorNode, anchorOffset, focusNode, focusOffset} = document.getSelection();
            console.log(`${anchorNode && anchorNode.data}:${anchorOffset}`);
            console.log(`${focusNode && focusNode.data}:${focusOffset}`);
            console.log(saveOuterHtml)
        }
    }

    render() {
        return (
            <div id="file-zone">
                <div 
                    id="file"
                    onClick={this.handleAppendInput}
                >
                    <p>I can <strong>solve</strong> this task! <i>Some Italic text.</i></p>
                    <p>Underline <u>@your idea</u></p>
                </div>
            </div>
        );
    }
}

export default FileZone;
