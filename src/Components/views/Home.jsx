import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Atoms/Button/Button';

function Home() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/FaceUpload')
    };
    return (
        <div style={{ margin: '50px', padding: '50px' }}>
            <h1>Welcome to 🤖 ImageMaster</h1>
            <p style={{ width: '520px' }}>Feel free to to play check image classification, but before we want you to upload your image check for face Recognition.</p>
            <Button text='Continue' onClick={handleButtonClick} marginTop={'20px'} backgroundColor={'blue'} />
        </div>
    );
}

export default Home;
