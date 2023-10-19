import React from 'react';
import { useState } from 'react';
import Button from '../Atoms/Button/Button';
export default function TextImageGenerator() {
    const [inputValue, setInputValue] = useState('');
    const [Images, setImages] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleSubmit = () => {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                 authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            },
            body: JSON.stringify({
                response_as_dict: true,
                attributes_as_list: false,
                show_original_response: false,
                resolution: '512x512',
                num_images: 1,
                text: inputValue,
                providers: 'deepai',
            }),
        };

        fetch('https://api.edenai.run/v2/image/generation', options)
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                const newImages = [
                    ...Images,
                    {
                        url: response['deepai']['items'][0]['image_resource_url'],
                    },
                ];

                setImages(newImages)
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <div style={{ margin: '20px', textAlign: 'center' }}>
                <h1>Text Image Generator</h1>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                >
                    <textarea
                        value={inputValue}
                        onChange={handleInputChange}
                        rows={5}
                        cols={40}
                        placeholder='Enter your text...'
                    />

                    <Button
                        text='Submit'
                        onClick={handleSubmit}
                        marginTop={'50px'}
                        marginLeft={'10px'}
                        backgroundColor={'blue'}
                    />
                </div>
                <h1>AI Generated Images</h1>
                <div style={{ display: "grid", gridTemplateColumns: 'repeat(3, 2fr)', gap: '15px' }}>
                    {Images &&
                        Images.map((image, idx) => (
                            <div key={idx}>
                                <img style={{ width: '100%', height: 'auto' }} src={image.url} alt={image} />
                            </div>
                        ))}
                </div>

            </div>
        </div>
    );
}
