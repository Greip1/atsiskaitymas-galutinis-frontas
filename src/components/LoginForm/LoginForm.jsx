import css from './LoginForm.module.css';
import { useFormik } from 'formik';
import React, { useState } from 'react';

import * as Yup from 'yup';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl, myFetch } from '../../helper/utils';

const initValues = {
  email: '',
  password: '',
};
function LoginForm(props) {
  const { login } = useAuthCtx();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Please enter valid email')
        .required('This field is required'),
      password: Yup.string()
        .min(5, 'Min 5 symbols')
        .max(8, 'Max 8 symbols')
        .required('This field is required'),
    }),
    onSubmit: async (values) => {
      setError('');
      const fetchResult = await myFetch(`${baseUrl}/login`, 'POST', values);
      // console.log('fetchResult', fetchResult);
      if (fetchResult.err) {
        setError(fetchResult.err);
        return;
      }
      login(fetchResult.token, fetchResult.username, fetchResult.user_id);
      props.onSuccessLogin();
    },

    //  WTFFFFFFF SU LOGIN
  });

  return (
    <div className="formContainer">
      <form className={css.form} onSubmit={formik.handleSubmit}>
        <h1 className={css.title}>Please Login</h1>
        <p className={`${css.errorMsg} ${css.emailErr}`}>{error ? error : ''}</p>

        <label className={css.label}>Email </label>
        <br />
        <input
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={formik.touched.email && formik.errors.email ? css.errorInput : ''}
          name="email"
          placeholder="Your email"
        />
        {formik.touched.email && formik.errors.email && (
          <p className={css.errorMsg}>{formik.errors.email}</p>
        )}
        <label className={css.label}>Password</label>
        <br />
        <input
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className={
            formik.touched.password && formik.errors.password ? css.errorInput : ''
          }
          name="password"
          placeholder="Your password"
        />
        {formik.touched.password && formik.errors.password && (
          <p className={css.errorMsg}>{formik.errors.password}</p>
        )}
        <button className={css.btn} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
