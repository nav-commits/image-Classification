
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyA8ovxWP9KXLaff91Wa2wT04r5fKlYMY_M',
    authDomain: 'users-64c10.firebaseapp.com',
    projectId: 'users-64c10',
    storageBucket: 'users-64c10.appspot.com',
    messagingSenderId: '466717590644',
    appId: '1:466717590644:web:3d3cd7a814d029a0f53d21',
    measurementId: 'G-CVYE9LHLMG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
