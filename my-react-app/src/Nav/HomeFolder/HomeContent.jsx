import React from "react";
import teamSVG from './team.svg';
import { useNavigate } from "react-router-dom";
import './Home.css'

function HomeContent() {
    const navigate = useNavigate();
    const handleGetStarted = () => {
        navigate('/signup');
    }
    return(
        <section className="wrapper">
            <div className="container">
                <div className="grid-cols-1">
                    <div className="grid-item-1">
                        <h1>Welcome to our <span><b>TodoList</b></span></h1>
                        <p>Conquer chaos. Command your day. This isn't just a to-do list; it's your strategic command center for crushing every task that dares stand in your way.</p>
                        <div className="btn_wrapper">
                            <button className="btn view_more_btn_1" onClick={handleGetStarted}>Get Started<i className="ri-survey-line"></i></button>
                        </div>
                    </div>
                    <div className="grid-item-2">
                        <img src={teamSVG} alt="Productivity" className="productivity_image"></img>
                    </div>
                </div>
            </div>
        </section>
    )
};
export default HomeContent;