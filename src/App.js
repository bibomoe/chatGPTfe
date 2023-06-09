import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Footer, Blog, Possibility, Features, WhatGPT3, Header, Homepage } from './containers';
import { CTA, Brand, Navbar } from './components';
import { Home, Daftar, Update } from './containers';
import { NavbarMain, Juknis, Login } from './components';

import './App.css';

const App = () => ( 
    <div className="App">
        <BrowserRouter basename={''}>
            <Routes>
                <Route path="/" element={<div className="gradient__bg"><NavbarMain/><Home/></div>} />
                <Route path="/juknis" element={<div className="gradient__bg"><NavbarMain/><Juknis/></div>} />
                <Route path="/tes" element={<div className="gradient__bg"><Navbar/><Possibility/></div>} />
                <Route path="/daftar" element={<div className="gradient__bg"><NavbarMain/><Daftar/></div>} />
                <Route path="/masuk" element={<div className="gradient__bg"><NavbarMain/><Login/></div>} />
                <Route path="/update" element={<div className="gradient__bg"><NavbarMain/><Update/></div>} />
                
            </Routes>
        </BrowserRouter>
        {/* <Homepage /> */}

        {/* <div className="gradient__bg">
            <Navbar />
            <Header />
        </div> */}
        {/* <Brand /> */}
        {/* <WhatGPT3 /> */}
        {/* <Features /> */}
        {/* <Possibility /> */}
        {/* <CTA /> */}
        {/* <Blog /> */}
        {/* <Footer /> */}
    </div>
);

export default App;
