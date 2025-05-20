// import React from "react";

// function About() {
//     return(
//         <>
//         <h4>A bit<h1>About us</h1></h4>
//         <ul className="product-list">
//             <li>
//                 <h3>Person A</h3>
//                 <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit mi quis, vulputate magna.</p>
//             </li>
//             <li>
//                 <h3>Person B</h3>
//                 <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit mi quis, vulputate magna.</p>
//             </li>
//             <li>
//                 <h3>Person C</h3>
//                 <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit mi quis, vulputate magna.</p>
//             </li>
//             <li>
//                 <h3>Person D</h3>
//                 <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit mi quis, vulputate magna.</p>
//             </li>
//         </ul>
//         </>
//     )
// };
// export default About;
import React from 'react';
import img1 from './dog1.jpg';
import img2 from './dog2.jpg';
import img3 from './dog3.jpg';
import img4 from './dog4.jpg';
import './About.css';

export default function AboutUsPage() {
  return (
    <div className="about-container">
      <div className="media-section">
        <div className="image-grid-four">
          <img src={img1} alt="Team member 1" className="img-box" />
          <img src={img2} alt="Team member 2" className="img-box" />
          <img src={img3} alt="Team member 3" className="img-box" />
          <img src={img4} alt="Team member 4" className="img-box" />
        </div>
      </div>

      <div className="text-section">
        <div className="heading-group">
          <span className="sub-title">A BIT</span>
          <h2>ABOUT US</h2>
        </div>
        <p>
          Our website was born from the idea that managing tasks should be straightforward and empowering. Our core team is dedicated to 
          building and delivering a reliable to-do list web application that prioritizes simplicity and user experience. We are committed to 
          providing a service that helps you stay organized effortlessly, ultimately contributing to your productivity and peace of mind.</p>
        <button className="btn-explore">Explore More</button>
      </div>
    </div>
  );
}