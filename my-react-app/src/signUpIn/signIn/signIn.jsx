import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './signInvalidation';
import './signIn.css';
import { auth } from '../../fireBaseconfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Swal from 'sweetalert2';


function Signin() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const initialMail = useRef('');
  const initialPass = useRef('');

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const err = Validation(values);
    setErrors(err);
    setFirebaseError('')
    if (err.email === '' && err.password === '') {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        navigate('/todolist');
      }
      catch (error) {
        setFirebaseError(error.message);
        console.log(error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Maybe try to input value correctly and make sure you already created an account",
        });
      }
    }
    initialMail.current.value = '';
    initialPass.current.value = '';
  };

  return (
    <div className="signin-bg">
      <div className="signin-container">
        <h2 className="signin-title">Sign-In</h2>
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="signin-form-group">
            <label htmlFor="email" className="signin-label">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleInput}
              ref={initialMail}
              className="signin-input"
              id="signin-email"
            />
            {errors.email && <span className="signin-error">{errors.email}</span>}
          </div>
          <div className="signin-form-group">
            <label htmlFor="password" className="signin-label">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleInput}
              ref={initialPass}
              className="signin-input"
              id="signin-password"
              autoComplete="on"
            />
            {errors.password && (
              <span className="signin-error">{errors.password}</span>
            )}
          </div>
          <button type="submit" className="signin-btn" id="signin-submit">
            Log in
          </button>
          <p className="signin-policy">Have no account to log in?</p>
          <Link
            to="/signup"
            className="signin-create-link"
          >
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Signin;