import React, { Component } from 'react';

import './FileZone.css';

class FileZone extends Component {
    state = {
        editable: false
    }

    handleClick = (e) => {
        e.persist();
        const { id, tagName } = e.target;

        if ( id === 'file-zone') {
            return this.setState({ editable: false, })
        } else {
            this.setState({ editable: true, })
        }

        console.log(e);
    }

    

    render() {
        const { editable } = this.state;

        return (
            <div id="file-zone" onClick={this.handleClick}>
                <div id="file" contentEditable={editable}></div>
            </div>
        );
    }
}

export default FileZone;
