import React, { Component } from 'react';
import Button from '../button/Button';

import './ControlPanel.css';

class ControlPanel extends Component {
    render() {
        return (
            <div id="control-panel">
                <div id="format-actions">
                    <Button model="bold" type="B"><b>B</b></Button>
                    <Button model="italic" type="I"><i>I</i></Button>
                    <Button model="underline" type="U"><u>U</u></Button>
                </div>
            </div>
        );
    }
}

export default ControlPanel;
