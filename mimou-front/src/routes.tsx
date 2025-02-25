import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Create from './Pages/Create';
import LandingPage from './Pages/LandingPage';
import GiftPage from './Pages/GiftPage';

export default function AppRoutes(){
    return(
        <Routes>
            <Route path='/' element={<LandingPage />}/>
            <Route path='create' element={<Create />}/>
            <Route path='presente/:id/:name' element={<GiftPage />}/>
        </Routes>
    );
}