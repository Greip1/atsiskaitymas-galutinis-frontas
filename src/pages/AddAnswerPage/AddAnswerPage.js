import React from 'react';

import css from './AddAnswer.module.css';
import AddAnswer from '../../components/AddAnswer/AddAnswer';

function AddAnswerPage() {
  return (
    <div className={css.container}>
      <AddAnswer />
    </div>
  );
}

export default AddAnswerPage;
