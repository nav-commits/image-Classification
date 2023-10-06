import React, { useState } from 'react';
import * as facemesh from '@tensorflow-models/facemesh';
import Webcam from 'react-webcam';
import './FaceDetection.css';
import { useNavigate } from 'react-router-dom';
import * as tf from '@tensorflow/tfjs';

const FaceDetection = () => {
    const [show, setShow] = useState(false);
    const [detected, setDetected] = useState('');
    const [loading, setLoading] = useState('');
    const webcamRef = React.useRef(null);
    const canvas = React.useRef(null);

    console.log('Using TensorFlow backend: ', tf.getBackend());

    const runFaceMesh = async () => {
        const net = await facemesh.load({
            inputResolution: { width: 640, height: 480 },
            scale: 0.8,
        });
        setInterval(() => {
            detect(net);
        }, 100);
    };

    //  detect function
    const detect = async (net) => {
        if (
            typeof webcamRef.current !== 'undefined' &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Set canvas width
            canvas.current.width = videoWidth;
            canvas.current.height = videoHeight;

            // Make Detections
            const face = await net.estimateFaces(video);
            if (face) {
                setDetected('Face Detected, Please Press Continue');
                console.log('face');
                setLoading('');
            }
        }
    };
    const onClick = () => {
        setShow(true);
        runFaceMesh();
        setLoading('...Detecting Face');
    };
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/ImageClassification');
    };
    return (
        <div>
            {show ? (
                <div>
                    <Webcam
                        ref={webcamRef}
                        style={{
                            position: 'absolute',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            top: 100,
                            left: 0,
                            right: 80,
                            textAlign: 'center',
                            zIndex: 9,
                            width: 640,
                            height: 480,
                        }}
                    />

                    <canvas
                        ref={canvas}
                        style={{
                            position: 'absolute',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            top: 100,
                            left: 0,
                            right: 80,
                            textAlign: 'center',
                            zIndex: 9,
                            width: 640,
                            height: 480,
                        }}
                    />

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            top: '600px',
                        }}
                    >
                        {detected ? (
                            <>
                                <h1>{detected}</h1>{' '}
                                <button style={{ width: '200px' }} onClick={handleButtonClick}>
                                    Continue
                                </button>
                            </>
                        ) : (
                            <h1>{loading}</h1>
                        )}
                    </div>
                </div>
            ) : (
                <div style={{ marginTop: '120px' }}>
                    <p style={{ marginLeft: '50px' }}>
                        Please click the button below to for face detection
                    </p>
                    <button style={{ marginLeft: '50px' }} onClick={onClick}>
                        Check Face
                    </button>
                </div>
            )}
        </div>
    );
};

export default FaceDetection;
