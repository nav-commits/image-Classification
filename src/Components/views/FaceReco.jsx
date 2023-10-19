import React from 'react';
import Button from '../Atoms/Button/Button';
import { useState } from 'react';
import { useFaceRecognition } from '../../Context';
import { useNavigate } from 'react-router-dom';

function FaceRecognition() {
    const [selectedFile, setSelectedFile] = useState(null);
    const { faceRecognized, setFaceRecognized } = useFaceRecognition();
    let imageSelected =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjaxWW8bAjDIs0AuI5iDspd3PxBEL4Rc1BKy7miDSdGtZXzl8Rf3NvJsp62uShPlSfaGg&usqp=CAU';

    const FaceRecognition = () => {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
            body: JSON.stringify({
                response_as_dict: true,
                attributes_as_list: false,
                show_original_response: false,
                providers: 'amazon',
                file_url: imageSelected,
            }),
        };

        fetch('https://api.edenai.run/v2/image/face_recognition/recognize', options)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                if (response['amazon']['status'] === 'success') {
                    setFaceRecognized(true);
                }
            })
            .catch((err) => console.error(err));
    };

    const onFileUpload = () => {
        console.log(selectedFile)
    
    };

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/ImageClassification');
    };

    console.log(faceRecognized)
    return (
        <div>
            <>
            <h1>Authentication with face Recognition</h1>
                {/* <div style={{ margin: '30px', display: 'flex', justifyContent: 'center' }}>
                    <input type='file' onChange={onFileChange} />
                    <Button text='Upload' onClick={onFileUpload} backgroundColor={'blue'} />
                </div> */}
                <Button
                    text='FaceRecognition'
                    onClick={FaceRecognition}
                    marginTop={'50px'}
                    marginLeft={'40px'}
                    backgroundColor={'blue'}
                />

            </>

            <Button
                text='Continue'
                onClick={handleButtonClick}
                marginTop={'50px'}
                marginLeft={'40px'}
                backgroundColor={'blue'}
            />
        </div>
    );
}

export default FaceRecognition;
