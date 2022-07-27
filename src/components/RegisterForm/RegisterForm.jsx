import css from './RegisterForm.module.css';
import { useFormik } from 'formik';
import React, { useState } from 'react';

import * as Yup from 'yup';
import { baseUrl, myFetch } from '../../helper/utils';
import { Link } from 'react-router-dom';

const initValues = {
  username: '',
  email: '',
  password: '',
  repPassword: '',
};
function RegisterForm() {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      username: Yup.string().min(5, 'Min 5 symbols').required('This field is required'),
      email: Yup.string()
        .email('Please enter valid email')
        .required('This field is required'),
      password: Yup.string()
        .min(5, 'Min 5 symbols')
        .max(8, 'Max 8 symbols')
        .required('This field is required'),
      repPassword: Yup.string()
        .required('This field is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: async (values) => {
      const newReg = {
        username: values.username,
        email: values.email,
        password: values.password,
      };
      const fetchResult = await myFetch(`${baseUrl}/register`, 'POST', newReg);
      console.log('fetchResult', fetchResult);
      if (fetchResult.changes === 1) {
        setRegistrationSuccess(true);
      }
      if (fetchResult.changes === 0) {
        alert('Email already exists, login or use new email');
      }
    },
  });

  //   ===========================================
  return (
    <>
      {registrationSuccess ? (
        <div className={css.successMessage}>
          <p>Registration was successful</p>
          <Link to={'/login'}>
            <button>Login here</button>
          </Link>
        </div>
      ) : (
        <div className="formContainer">
          <h1>Welcome</h1>

          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Your username</label>
            <br />
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className={
                formik.touched.username && formik.errors.username ? css.errorInput : ''
              }
              name="username"
              type="text"
              placeholder="Username"
            />
            <br />
            {formik.touched.username && formik.errors.username && (
              <p className={css.errorMsg}>{formik.errors.username}</p>
            )}
            <label htmlFor="email">Your email</label>
            <br />
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={
                formik.touched.email && formik.errors.email ? css.errorInput : ''
              }
              name="email"
              type="email"
              placeholder="email@email.com"
            />
            <br />
            {formik.touched.email && formik.errors.email && (
              <p className={css.errorMsg}>{formik.errors.email}</p>
            )}
            <label htmlFor="password">Your password</label>
            <br />
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={
                formik.touched.password && formik.errors.password ? css.errorInput : ''
              }
              name="password"
              type="password"
              placeholder="Password"
            />
            <br />
            {formik.touched.password && formik.errors.password && (
              <p className={css.errorMsg}>{formik.errors.password}</p>
            )}
            <label htmlFor="repPassword">Repeat your password</label>
            <br />
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.repPassword}
              className={
                formik.touched.repPassword && formik.errors.repPassword
                  ? css.errorInput
                  : ''
              }
              name="repPassword"
              type="password"
              placeholder="Repeat password"
            />
            {formik.touched.repPassword && formik.errors.repPassword && (
              <p className={css.errorMsg}>{formik.errors.repPassword}</p>
            )}{' '}
            <br />
            <button type="submit">Register</button>
          </form>
        </div>
      )}
    </>
  );
}

export default RegisterForm;
