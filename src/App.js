import './App.css';
import FaceUpload from './Components/views/FaceUpload/FaceUpload';
import FaceRecognition from './Components/views/FaceReco';
import ImageClassification from './Components/views/Classification/Classification';
import Home from './Components/views/Home';
import TextImageGenerator from './Components/views/TextImageGenerator';
import PrivateRoute from './Components/PrivateRoute';
import { Routes, Route } from 'react-router-dom';
import { FaceRecognitionProvider } from './Context';

function App() {
    return (
        <FaceRecognitionProvider>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/FaceUpload' element={<FaceUpload />} />
                <Route path='/FaceRec' element={<FaceRecognition />} />
                <Route exact element={<PrivateRoute />}>
                    <Route exact path='/ImageClassification' element={<ImageClassification />} />
                </Route>

                <Route exact element={<PrivateRoute />}>
                    <Route exact path='/TextImageGenerator' element={<TextImageGenerator />} />
                </Route>
            </Routes>
        </FaceRecognitionProvider>
    );
}

export default App;
