import React from 'react';
import './Contact.css';

function ContactPage() {
  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>Any questions or remarks? Just write us a message!</p>
      </header>

      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter a valid email address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter your Name" />
        </div>
        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>

      <section className="info-section">
        <div className="info-card">
          <div className="icon">📱</div>
          <h3>Social Media</h3>
          <h4>Email<p>alkjsdfpp@gmail.com</p></h4>
          <h4>Instagram<p>dklsakpmmkls</p></h4>
        </div>

        <div className="info-card">
          <div className="icon">📞</div>
          <h3>Phone Number</h3>
          <p>+3048509283948</p>
        </div>

        <div className="info-card">
          <div className="icon">🗺️</div>
          <h3>Location</h3>
          <p>California, USA</p>
        </div>
      </section>
    </div>
  );
}
export default ContactPage;