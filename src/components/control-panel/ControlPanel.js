import React, { Component } from 'react';
import Button from '../button/Button';
import { ThemeContext } from '../../context/theme-context';

import './ControlPanel.css';

class ControlPanel extends Component {

    static contextType = ThemeContext;

    handleClick = (e) => {
        const regEx = /format-action/g;
        const targetNode = e.target.classList.value;
        const parentNode = e.target.parentNode.classList.value;
        if (!(parentNode || targetNode).match(regEx)) {
            this.context.toggleRangeText('');
            this.context.toggleButton([]);
        }
    }

    render() {
        return (
            <div id="control-panel" onClick={(e) => this.handleClick(e)}>
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
