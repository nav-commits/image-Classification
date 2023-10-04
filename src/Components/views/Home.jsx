import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/Detection')
    };
    return (
        <div style={{ margin: '50px', padding: '50px' }}>
            <h1>Welcome to 🤖 ImageMaster</h1>
            <p>Feel free to to play check image classification, but before we want check if you are a person so click the button below.</p>
            <button onClick={handleButtonClick}>Face Detection</button>
        </div>
    );
}

export default Home;
