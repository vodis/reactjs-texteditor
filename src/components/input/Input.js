import React, { Fragment } from 'react';

class Input extends React.PureComponent {
    render() {
        return (
            <input type="text" value="some text" onChange={e => console.log(e)} />
        )
    }
}


export default Input;