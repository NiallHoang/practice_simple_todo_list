import React from "react";
import Nav from "../Nav";
import About from "../AboutFolder/About";
import Contact from "../ContactFolder/Contact";
import Signup from "../../signUpIn/signUp/signUp";
import Signin from "../../signUpIn/signIn/signIn";
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'
import HomeContent from "./HomeContent";


function Home() {
    return(
        <BrowserRouter>
            <header>
                <Nav />
            </header>
            <Routes>
                <Route path="/" element={<HomeContent />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path='/signin' element={<Signin />}></Route>
            </Routes>
        </BrowserRouter>
    )
};
export default Home;