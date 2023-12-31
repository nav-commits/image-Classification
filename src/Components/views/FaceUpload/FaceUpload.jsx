import React, { useEffect, useState } from 'react';
import { storage } from '../../../Firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../Atoms/Button/Button';
import { useNavigate } from 'react-router-dom';

const FaceUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageURL, setImageURL] = useState([]);

    const [successMessage, setSuccessMessage] = useState('');

    let imageSelected = imageURL[0];

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        //  upload file to firebase storage
        if (selectedFile === null) return;
        const imgRef = ref(storage, `images/ ${selectedFile.name + uuidv4()}`);
        uploadBytes(imgRef, selectedFile).then((snaphsot) => {
            getDownloadURL(snaphsot.ref).then((url) => {
                setImageURL((prevArray) => [...prevArray, url]);
            });
        });

        //  send file to face recognition api
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

        fetch('https://api.edenai.run/v2/image/face_recognition/add_face', options)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                if (response['amazon']['status'] === 'success') {
                    setSuccessMessage('Successfully uploaded file');
                }
            })
            .catch((err) => console.error(err));
    };

    // get all images from firebase storage

    useEffect(() => {
        const listImages = async () => {
            try {
                // gets all images from firebase storage
                const listRef = ref(storage, 'images/');
                const res = await listAll(listRef);
                const urlPromises = res.items.map(async (itemRef) => {
                    return getDownloadURL(itemRef);
                });
                // waits for all promises to resolve
                const urls = await Promise.all(urlPromises);
                // sets the state to the array of urls
                setImageURL(urls);
            } catch (error) {
                console.error('Error fetching images from Firebase Storage:', error);
            }
        };
        listImages();
    }, []);

    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/FaceRec');
    };

    return (
        <>
            <div style={{ margin: '30px', display: 'flex', justifyContent: 'center' }}>
                <input type='file' onChange={onFileChange} />
                <Button text='Upload' onClick={onFileUpload} backgroundColor={'blue'} />
            </div>
            <h1 style={{ textAlign: 'center' }}>List of Recognized Faces</h1>
            {imageURL.length > 0 ? (
                imageURL.map((url, idx) => (
                    <img
                        key={idx}
                        src={url}
                        alt='face'
                        style={{
                            width: '220px',
                            height: '220px',
                            margin: '30px',
                            objectFit: 'cover',
                        }}
                    />
                ))
            ) : (
                <h2 style={{ textAlign: 'center', marginTop: '80px' }}>None....</h2>
            )}

            <p style={{ color: 'green', marginLeft: '50px', fontWeight: 'bold' }}>
                {successMessage}
            </p>

            <>
                <Button
                    text='Continue'
                    onClick={handleButtonClick}
                    marginTop={'50px'}
                    marginLeft={'40px'}
                    backgroundColor={'blue'}
                />
            </>
        </>
    );
};

export default FaceUpload;
