import React from 'react';

const ImagesContent = ({history}) => {

    return (
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
    );
};

export default ImagesContent;
