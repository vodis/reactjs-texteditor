import React, { Component } from 'react';
import './FileZone.css';

class FileZone extends Component {

    state = {
        synonyms: [],
    }

    handleAppendInput = (event) => {
        event.persist();
        const targetElement = event.target;
        const createDummyInput = document.createElement("input");
        createDummyInput.type = "text";
        createDummyInput.autocomplete = "off";
        createDummyInput.id = "dummy-input";
        createDummyInput.style.width = "5px";
        targetElement.appendChild(createDummyInput);
        createDummyInput.focus();
        targetElement.addEventListener('input', this.createInputListener)
    }

    createInputListener = (event) => {
        const selectInput = document.querySelector('#dummy-input');
        const currentWidthInput = parseFloat(selectInput.style.width);
        const changeWidthInputTo = !!event.data ? currentWidthInput + 5: currentWidthInput -5;
        document.querySelector('#dummy-input').style.width = changeWidthInputTo + 'px';
        this.fetchSynonyms(selectInput.value);
    }

    fetchSynonyms = async (value) => {
        try {
            const data = await fetch(`https://api.datamuse.com//words?ml=${value}`);
            const json = await data.json();
            this.setState({
                isOpen: true,
                synonyms: json,
            })
        } catch (error) {
            throw new Error(error);
        }

    }

    handleDoubleClick = (event) => {
        event.persist();
        const targetElement = event.target;
        targetElement.style.fontWeight = 'bold';
    }
    
    handleBlur = ({ target }) => {
        if (target.value.length) {
            const newP = document.createElement("span");
            newP.innerText = target.value;
            target.insertAdjacentElement('afterend', newP);
        }
        document.querySelector('#dummy-input').remove();
        target.removeEventListener('input', this.createInputListener);
        this.setState({ isOpen: false })
    }

    renderPopup = () => {
        const { synonyms } = this.state;
        synonyms.length = 10;
        return (
            <div className="popup">
                <ul>
                    { synonyms.map((syn, i) => {
                        return (
                            <li key={i}>{syn.word}</li>
                        )}) 
                    }
                </ul>
            </div>
        )
    }

    render() {
        const { isOpen } = this.state;

        return (
            <div id="file-zone">
                <div 
                    id="file"
                    onClick={this.handleAppendInput}
                    onBlur={this.handleBlur}
                    onDoubleClick={this.handleDoubleClick}
                >
                </div>
                {isOpen && this.renderPopup()}
            </div>
        );
    }
}

export default FileZone;
