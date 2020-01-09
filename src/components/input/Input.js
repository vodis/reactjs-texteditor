import React from 'react';

const Input = (props) => (
    <input 
        id="inp"
        type="text"
        value={props.value}
        onChange={() => {}}
        autoFocus={true}
    />
);

export default Input;