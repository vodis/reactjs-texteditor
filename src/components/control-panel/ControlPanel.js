import React, { Component } from 'react';
import Button from '../button/Button';

import './ControlPanel.css';

class ControlPanel extends Component {
    render() {
        return (
            <div id="control-panel">
                <div id="format-actions">
                    <Button model="bold"><b>B</b></Button>
                    <Button model="italic"><i>I</i></Button>
                    <Button model="underline"><u>U</u></Button>
                </div>
            </div>
        );
    }
}

export default ControlPanel;
