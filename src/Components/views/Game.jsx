import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import Button from '../Atoms/Button/Button';

function ImageClassificationGame() {
    const [model, setModel] = useState(null);
    const [imgUrl, setImageUrl] = useState(false);
    const [results, setResults] = useState([]);
    const [reveal, setReveal] = useState(false);
    const [history, setHistory] = useState([]);

    const ref = React.useRef(null);
    const ImageUrl = React.useRef(null);

    // Load the MobileNet model
    useEffect(() => {
        async function loadModel() {
            const mobilenetModel = await mobilenet.load();
            setModel(mobilenetModel);
        }
        loadModel();
    }, []);

    const upLoadImage = (e) => {
        if (e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            setImageUrl(url);
        }
    };

    // Handle image selection and classification
    const handleImageSelect = async () => {
        if (model) {
            const result = await model.classify(ref.current);
            setResults(result);
        }
    };
    console.log(results);
    console.log(history)

    // Render the game interface

    const handleReveal = () => {
        setReveal(true);
    };

    useEffect(() => {
        if (imgUrl) {
            setHistory([imgUrl, ...history]);
        }
    }, [imgUrl]);
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Image Classification</h1>
            <h3 style={{ margin: '30px' }}>Please select an image</h3>
            <div style={{ margin: '30px' }}>
                <input type='file' accept='image/' capture='camera' onChange={upLoadImage} />
            </div>
            <div
                style={{
                    margin: '20px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    justifyContent: 'center',
                }}
            >
                {imgUrl && (
                    <img
                        style={{ height: '300px', width: '300px' }}
                        src={imgUrl}
                        alt='upload preview'
                        ref={ref}
                    />
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {results.map((result, idx) => (
                        <div
                            key={idx}
                            style={{ border: '2px solid black', padding: '20px', width: '300px' }}
                        >
                            <h2 key={result.className}>{result.className}</h2>
                            {/*  disabled this until you pick one */}
                            {reveal && <p key={result.className}>{result.probability}</p>}
                            <button onClick={handleReveal} style={{ marginTop: '50px' }}>
                                Reveal
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <button style={{ marginTop: '50px', marginLeft: '30px' }} onClick={handleImageSelect}>
                identify
            </button>
            <Button text='Identity' />

            <h1>Recent Images</h1>
            <div style={{ backgroundColor: 'blue', padding: '30px', height: '200px', margin: '10px', display: 'flex', flexDirection: 'row', gap: '20px' }}>
                {history.length > 0 && history.map((image, idx) => {
                    return (
                        <div key={idx}>
                            <img style={{ width: '200px', height: '200px' }} src={image} alt='Recent Prediction' />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ImageClassificationGame;
