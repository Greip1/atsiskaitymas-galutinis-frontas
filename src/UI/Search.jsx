import { useEffect, useState } from 'react';
import { getFetch } from '../Helper/fetch';
import css from './Search.module.css';

function Search({ title, lift }) {
  const [inputValue, setInputValue] = useState();
  const [dataArr, setDataArr] = useState([]);

  useEffect(() => {
    getFetch('pets', setDataArr);
  }, []);

  function inputHandler(event) {
    findObj(event.target.value);
    setInputValue(event.target.value);
  }

  function findObj(x) {
    const foundOb = dataArr.filter((ob) =>
      ob.name.toLowerCase().includes(x.toLowerCase())
    );
    console.log('foundOb', foundOb);
    setDataArr(foundOb);
    lift(foundOb);
    getFetch('pets', setDataArr);
  }

  return (
    <div>
      <i className={`fa fa-search ${css.icon}`} aria-hidden="true"></i>
      <input
        onInput={inputHandler}
        className={css.input}
        type="search"
        placeholder={`${title}`}
      />
    </div>
  );
}

export default Search;
