import logo from './logo.svg';
import './App.css';
import FaceDetection from './Components/views/FaceDection/FaceDetection';
import ImageClassification from './Components/views/Classification/Classification';
import Home from './Components/views/Home';
import { Routes, Route } from 'react-router-dom'; // Import the BrowserRouter, Route and Link components

function App() {
    return (
        <>
            <Routes>
                <Route path='/' exact element={<Home />} />
            </Routes>
            <Routes>
                <Route path='/Detection' element={<FaceDetection />} />
            </Routes>
            <Routes>
                <Route path='/ImageClassification' element={<ImageClassification />} />
            </Routes>
        </>
    );
}

export default App;
