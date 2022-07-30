import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { baseUrl } from '../../helper/utils';
import { useAuthCtx } from '../../store/authContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import css from './AddAnswer.module.css';

const initValues = {
  user_id: '',
  answer: '',
};

function AddAnswer() {
  const history = useHistory();

  const [error, setError] = useState(false);
  const [postCreated, setPostCreated] = useState(false);
  const { q_id } = useParams();
  const { user_id, token } = useAuthCtx();

  // ////////////////////
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      answer: Yup.string()
        .min(5, 'Min 5 characters')
        .max(600, 'Max 600 characters')
        .required('This field is required'),
    }),
    onSubmit: async (values) => {
      const newPost = {
        answer: values.answer,
        user_id: user_id,
      };
      const resp = await fetch(`${baseUrl}/questions/${q_id}/answers`, {
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
            <p>Post was successfully added!</p>
            <Link className={css.navLink} to={`/questions/${q_id}/answer`}>
              <button className={css.btn}>Back to all answers</button>
            </Link>
          </div>
        </>
      ) : (
        // <form onSubmit={addNewAnswer}>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="answer">Your answer</label>
          <br />
          <textarea
            className={
              formik.touched.answer && formik.errors.answer ? css.errorInput : css.input
            }
            // onChange={answerHandler}
            // value={answerValue}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.answer}
            name="answer"
            id="answer"
            cols="30"
            rows="10"
            placeholder="Your answer..."
          ></textarea>
          <br />
          <p className={css.errorMsg}>{formik.errors.answer}</p>

          <br />
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}
export default AddAnswer;
