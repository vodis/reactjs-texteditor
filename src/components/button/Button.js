import React, { Component } from 'react';
import classNames from 'classnames';
import { ThemeContext } from '../../context/theme-context';

import './Button.css';

class Button extends Component {

    static contextType = ThemeContext;

    handleClick = (e) => {
        e.persist();
        document.execCommand(this.props.model);
        this.context.toggleRangeText('');
        if (this.context.setOfRangeText.length || this.context.setOfButtons.length) {
            this.context.toggleButton([this.props.type], true);
        }
    }
    
    render() {
        const { children, type } = this.props;
        const { setOfButtons } = this.context;

        const buttonIsFiredUp = classNames(
            "format-action",
            {"active":  setOfButtons && setOfButtons.find(t => t === type)}
        );
        return (
            <button 
                onClick={(e) => this.handleClick(e)}
                className={buttonIsFiredUp} 
                type="button"
            >
                {children}
            </button>
        )
    }
}

export default Button;