import React, { useState, useEffect } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import Button from '../../Atoms/Button/Button';
import './Classification.css';
import { useNavigate } from 'react-router-dom';
import * as tf from '@tensorflow/tfjs'

function ImageClassification() {
    const [model, setModel] = useState(null);
    const [imgUrl, setImageUrl] = useState(false);
    const [results, setResults] = useState([]);
    const [reveal, setReveal] = useState(false);
    const [history, setHistory] = useState([]);

    const ref = React.useRef(null);
    console.log('Using TensorFlow backend: ', tf.getBackend());

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
    console.log(history);

    const handleReveal = () => {
        setReveal(!reveal);
    };
    const handleRemove = () => {
        setResults([]);
    };

    useEffect(() => {
        if (imgUrl) {
            setHistory([imgUrl, ...history]);
        }
    }, [imgUrl]);

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/TextImageGenerator');
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Welcome to 🤖 ImageMaster </h1>
            <h3 style={{ margin: '30px' }}>Please select an image</h3>
            <div style={{ margin: '30px' }}>
                <input
                    className='fileInput'
                    type='file'
                    accept='image/'
                    capture='camera'
                    onChange={upLoadImage}
                />
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
                        style={{ height: '500px', width: '450px' }}
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
                            {reveal && (
                                <>
                                    <div key={result.className} className='progress-bar'>
                                        <div
                                            className='progress'
                                            style={{
                                                width: `${(result.probability * 100).toFixed(2)}%`,
                                            }}
                                        >
                                            {(result.probability * 100).toFixed(2)}%
                                        </div>
                                    </div>
                                </>
                            )}
                            <button onClick={handleReveal} style={{ marginTop: '50px' }}>
                                Reveal
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {imgUrl && (
                <>
                    <Button
                        text='Identify'
                        onClick={handleImageSelect}
                        marginTop={'50px'}
                        marginLeft={'30px'}
                    />
                </>
            )}

            {reveal && (
                <Button
                    text='Remove'
                    onClick={handleRemove}
                    marginTop={'50px'}
                    marginLeft={'10px'}
                    backgroundColor={'red'}
                />
            )}

            {history.length > 0 && (
                <>
                    <h1 style={{ marginLeft: '20px' }}>Recent Uploaded Images</h1>
                    <div
                        style={{
                            backgroundColor: '#6CB4EE',
                            padding: '30px',
                            height: '280px',
                            margin: '10px',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '20px',
                        }}
                    >
                        {history.length > 0 &&
                            history.map((image, idx) => {
                                return (
                                    <div key={idx}>
                                        <img
                                            style={{ width: '200px', height: '220px' }}
                                            src={image}
                                            alt='Recent Prediction'
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </>
            )}
            {imgUrl && (
                <div style={{ margin: '20px' }}>
                    <h2 style={{ margin: '20px' }}>
                        Please press continue to checkout Text Image Genorator
                    </h2>

                    <Button
                        text='Continue'
                        onClick={handleButtonClick}
                        marginTop={'50px'}
                        marginLeft={'10px'}
                        backgroundColor={'blue'}
                    />
                </div>
            )}
        </div>
    );
}

export default ImageClassification;
