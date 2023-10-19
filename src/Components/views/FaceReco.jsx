import React from 'react';
import Button from '../Atoms/Button/Button';
import { useFaceRecognition } from '../../Context';
import { useNavigate } from 'react-router-dom';

function FaceRecognition() {
    const { faceRecognized, setFaceRecognized } = useFaceRecognition();
    let imageSelected =
        'https://image.cnbcfm.com/api/v1/image/106967046-1635430835800-gettyimages-946971500-99821012.jpeg?v=1685992445';

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
                if (response['amazon']['items'][0]['confidence'] >= 0.99) {
                    setFaceRecognized(true);
                }
            })
            .catch((err) => console.error(err));
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
