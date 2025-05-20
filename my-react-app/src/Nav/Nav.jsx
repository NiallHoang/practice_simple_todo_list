import React from "react"
import './Nav.css'
import {NavLink} from 'react-router-dom'

function Nav() {
    return(
        <div className="topNav">
            <NavLink to="/"className={({isActive, isPending})=>isPending ? "pending": isActive ? "active":""}>Home</NavLink>
            <NavLink to="/about" className={({isActive, isPending})=>isPending ? "pending": isActive ? "active":""}>About</NavLink>
            <NavLink to="/contact" className={({isActive, isPending})=>isPending ? "pending": isActive ? "active":""}>Contact</NavLink>
        </div>
    )
};

export default Nav;