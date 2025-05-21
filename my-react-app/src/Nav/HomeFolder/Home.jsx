import React from "react";
import Nav from "../Nav";
import About from "../AboutFolder/About";
import Contact from "../ContactFolder/Contact";
import Signup from "../../signUpIn/signUp/signUp";
import Signin from "../../signUpIn/signIn/signIn";
import ToDoListPage from "../../ToDoListPage/todolistfpage";
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import HomeContent from "./HomeContent";

function LayoutWithNav({ children }) {
    const location = useLocation();
    const hideNav = location.pathname == '/todolist';
    return (
        <>
            {!hideNav && <header><Nav /></header>}
            {children}
        </>
    )
}

function Home() {
    return (
        <BrowserRouter>
            <LayoutWithNav>
                <Routes>
                    <Route path="/" element={<HomeContent />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/contact" element={<Contact />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route path='/signin' element={<Signin />}></Route>
                    <Route path='/todolist' element={<ToDoListPage />}></Route>
                </Routes>
            </LayoutWithNav>
        </BrowserRouter>
    )
};
export default Home;