import React, { Component } from 'react';
import classNames from 'classnames';
import { ThemeContext } from '../../context/theme-context';

class Button extends Component {

    handleClick = () => {
        document.execCommand(this.props.model)
    }
    
    render() {
        const { children } = this.props;

        return (
            <ThemeContext.Consumer>
                {({ activeButtons }) => (
                    <button 
                        onClick={this.handleClick.bind(this)}
                        className={classNames("format-action", {"active": activeButtons && activeButtons.find(i => i === 'b')})} 
                        type="button"
                    >
                        {children}
                    </button>
                )}
            </ThemeContext.Consumer>
        )
    }
}

export default Button;