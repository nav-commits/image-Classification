import logo from './logo.svg';
import './App.css';
import FaceRecognition from './Components/views/FaceRecognition/FaceRecognition';
import ImageClassification from './Components/views/Classification/Classification';
import Home from './Components/views/Home';
import TextImageGenerator from './Components/views/TextImageGenerator';

import { Routes, Route } from 'react-router-dom'; // Import the BrowserRouter, Route and Link components

function App() {
    return (
        <>
            <Routes>
                <Route path='/' exact element={<Home />} />
            </Routes>
            <Routes>
                <Route path='/FaceRec' element={<FaceRecognition />} />
            </Routes>
            <Routes>
                <Route path='/ImageClassification' element={<ImageClassification />} />
            </Routes>
            <Routes>
                <Route path='/TextImageGenerator' element={<TextImageGenerator />} />
            </Routes>
        </>
    );
}

export default App;
