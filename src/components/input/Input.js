import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.inputRef.current.focus();
    }
    
    render() {
        const { value, inputChange, top, left } = this.props;
        const style = {
            position: 'fixed',
            top: `${top}px`,
            left: `${left}px`,
        };

        return (
            <input 
                style={style} 
                onChange={e => inputChange(e)}
                ref={this.inputRef}
                value={value} 
                type="text" 
            />
        )
    }
}


export default Input;

// let targetInnerHTML = event.target.innerHTML;
// const input = document.createElement("input");
// input.type = ("text");
// input.id = 'dummy-input';
// input.className = target.nodeName === 'P' && 'w-100';
// input.value = saveInnerText;
// target.insertAdjacentElement('beforebegin', input);
// input.focus();
// target.innerText = "";