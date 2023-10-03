import logo from './logo.svg';
import './App.css';
import FaceDetection from './Components/views/FaceDection/FaceDetection';
import Game from './Components/views/Game';
import Home from './Components/views/Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom'; // Import the BrowserRouter, Route and Link components

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
                <Route path='/Game' element={<Game />} />
            </Routes>
        </>

        // <>
        //   <FaceDetection />
        // </>
    );
}

export default App;
