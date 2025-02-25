import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Create from './Pages/Create';
import LandingPage from './Pages/LandingPage';
import GiftPage from './Pages/GiftPage';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';


export function App(){
  return (
    <BrowserRouter>
        <AppRoutes/>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
