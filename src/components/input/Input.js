import React from 'react';

class Input extends React.Component {

    componentWillMount() {
        console.log('Will be called on the server...')
    }

    render() {
        const { value } = this.props;
        return (
            <input 
                type="text"
                onChange={(e) => console.log(e)}
                value={value}
                autoFocus={true}
            />
        )
    }
}

export default Input;