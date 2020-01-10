import React, { Component } from 'react';
import classNames from 'classnames';
import { ThemeContext } from '../../context/theme-context';

import './Button.css';

class Button extends Component {

    static contextType = ThemeContext;

    handleClick = () => {
        document.execCommand(this.props.model);
    }
    
    render() {
        const { children, type } = this.props;
        const { setOfButtons } = this.context;
        return (
            <button 
                onClick={this.handleClick.bind(this)}
                className={classNames("format-action", { "active": setOfButtons && setOfButtons.find(t => t === type) })} 
                type="button"
            >
                {children}
            </button>
        )
    }
}

export default Button;