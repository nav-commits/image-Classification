import React from 'react';
import './Button.css';

const Button = ({ onClick, text, marginTop, marginLeft }) => {
    return (
        <button
            style={{ marginTop: marginTop, marginLeft: marginLeft }}
            className='Button'
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;
