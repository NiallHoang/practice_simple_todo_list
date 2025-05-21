import React, { useState, useRef } from 'react';
import Validation from './signUpvalidation';
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../fireBaseconfig';
import '../signUp/signUp.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const initialName = useRef('');
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
    setFirebaseError('');
    if (err.name === '' && err.email === '' && err.password === '') {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        await setDoc(doc(db, "users", userCredential.user.uid),{name: values.name, email: values.email});
        navigate('/todolist');
      }
      catch (error) {
        setFirebaseError(error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Maybe try to input value correctly and do not using duplicate mail",
        });
      }
    }
    initialName.current.value = '';
    initialMail.current.value = '';
    initialPass.current.value = '';
  };

  return (
    <>
      <div className="signup-bg">
        <div className="signup-container">
          <h2 className="signup-title">Sign-Up</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-form-group">
              <label htmlFor="name" className="signup-label">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                onChange={handleInput}
                ref={initialName}
                className="signup-input"
                id='signup-name'
              />
              {errors.name && <span className="signup-error">{errors.name}</span>}
            </div>
            <div className="signup-form-group">
              <label htmlFor="email" className="signup-label">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={handleInput}
                ref={initialMail}
                className="signup-input"
                id='signup-mail'
              />
              {errors.email && <span className="signup-error">{errors.email}</span>}
            </div>
            <div className="signup-form-group">
              <label htmlFor="password" className="signup-label">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={handleInput}
                ref={initialPass}
                className="signup-input"
                id='signup-pass'
                autoComplete="on"
              />
              {errors.password && (
                <span className="signup-error">{errors.password}</span>
              )}
            </div>
            <button type="submit" className="signup-btn" id='signup-submit'>
              Sign up
            </button>
            <p className="signup-policy">Already have an account</p>
            <Link
              to="/signin"
              className="signup-login-link"
            >
              Login
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;