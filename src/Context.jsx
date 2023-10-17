import React, { createContext, useContext, useState } from 'react';

const FaceRecognitionContext = createContext();

export const useFaceRecognition = () => {
    return useContext(FaceRecognitionContext);
};

export const FaceRecognitionProvider = ({ children }) => {
    const [faceRecognized, setFaceRecognized] = useState(false);
    return (
        <FaceRecognitionContext.Provider
            value={{
                faceRecognized,
                setFaceRecognized,
            }}
        >
            {children}
        </FaceRecognitionContext.Provider>
    );
};