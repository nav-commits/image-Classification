import React from 'react';
import './Button.css';

const Button = ({ onClick, text, marginTop, marginLeft , backgroundColor}) => {
    return (
        <button
            style={{ marginTop: marginTop, marginLeft: marginLeft, backgroundColor: backgroundColor }}
            className='Button'
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;
