import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { baseUrl } from '../../helper/utils';
import { useAuthCtx } from '../../store/authContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import css from './AddQuestion.module.css';

const initValues = {
  user_id: '',
  question: '',
  q_title: '',
};

function AddQuestion() {
  const history = useHistory();

  const [error, setError] = useState(false);
  const [postCreated, setPostCreated] = useState(false);
  const { user_id, token } = useAuthCtx();

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      question: Yup.string()
        .min(10, 'Min 10 characters')
        .max(800, 'Max 800 characters')
        .required('This field is required'),
      q_title: Yup.string()
        .min(5, 'Min 5 characters')
        .max(80, 'Max 80 characters')
        .required('This field is required'),
    }),
    onSubmit: async (values) => {
      const newPost = {
        question: values.question,
        q_title: values.q_title,
        user_id: user_id,
      };
      const resp = await fetch(`${baseUrl}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });
      const result = await resp.json();
      if (result.succes) {
        setPostCreated(true);
      }
      setError(result.err);
    },
  });

  // ///////////////////
  return (
    <>
      {postCreated ? (
        <>
          <div className={css.successMessage}>
            <p>Question was successfully added!</p>
            <Link className={css.navLink} to={`/main`}>
              <button className={css.btn}>Back to all questions</button>
            </Link>
          </div>
        </>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="q_title">Question Title</label>
          <br />
          <input
            type="text"
            name="q_title"
            id="q_title"
            className={
              formik.touched.q_title && formik.errors.q_title ? css.errorInput : css.input
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.q_title}
            placeholder="Title..."
          />
          <br />
          <p className={css.errorMsg}>{formik.errors.q_title}</p>
          <br />

          <label htmlFor="question">Your question</label>
          <br />
          <textarea
            className={
              formik.touched.question && formik.errors.question
                ? css.errorInput
                : css.input
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.question}
            name="question"
            id="question"
            cols="30"
            rows="10"
            placeholder="Your question..."
          ></textarea>
          <br />
          <p className={css.errorMsg}>{formik.errors.question}</p>

          <br />
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}
export default AddQuestion;
