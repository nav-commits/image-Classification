import React, { useEffect, useState } from 'react';
import { storage } from '../../../Firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../Atoms/Button/Button';
import { useNavigate } from 'react-router-dom';

const FaceRecognition = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageURL, setImageURL] = useState([]);
    const [uploaded, setUploaded] = useState(false);
    const [faceRecognized, setFaceRecognized] = useState(false);
    

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    let imageSelected = imageURL[0];

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
                authorization: `Bearer ${process.env.REACT_APP_API_KEY}`

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
            .then((response) => console.log(response))
            .catch((err) => console.error(err));

        setUploaded(true)
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


    const FaceRecognition = () => {
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
                providers: 'amazon',
                file_url: imageSelected
            })
        };

        fetch('https://api.edenai.run/v2/image/face_recognition/recognize', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

        setFaceRecognized(true)
    }

    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/ImageClassification')
    };

    return (
        <>
            <div style={{ margin: '30px', display: 'flex', justifyContent: 'center' }}>
                <input type='file' onChange={onFileChange} />
                <Button
                    text='Upload'
                    onClick={onFileUpload}
                    backgroundColor={'blue'}
                />
            </div>
            <h1 style={{ textAlign: 'center' }}>List of Recognized Faces</h1>
            {imageURL.map((url, idx) => {
                return (
                    <img
                        key={idx}
                        src={url}
                        alt='face'
                        style={{ width: '220px', height: '220px', margin: '30px', objectFit: 'cover' }}
                    />
                );
            })}
            {uploaded && <div style={{ marginLeft: '30px' }}>
                <Button
                    text='Face Recognition'
                    onClick={FaceRecognition}
                    marginTop={'50px'}
                    marginLeft={'10px'}
                    backgroundColor={'blue'}
                />
            </div>}
            {faceRecognized && <Button
                text='Continue'
                onClick={handleButtonClick}
                marginTop={'50px'}
                marginLeft={'40px'}
                backgroundColor={'blue'}
            />}

        </>
    );
};

export default FaceRecognition;
