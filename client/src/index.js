import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from "firebase/app";
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBEHww2dT2NZ_wtYzDp00jpfDkCIq8QY2U",
  authDomain: "learnverse-311bc.firebaseapp.com",
  projectId: "learnverse-311bc",
  storageBucket: "learnverse-311bc.appspot.com",
  messagingSenderId: "428226895542",
  appId: "1:428226895542:web:3e85c168f5d62372c09017"
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
