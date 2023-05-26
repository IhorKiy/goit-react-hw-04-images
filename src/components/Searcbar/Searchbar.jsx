import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaAccessibleIcon } from 'react-icons/fa';
import css from './Searcbar.module.css';




export function Searchbar ({onSubmit, pageReset})  {
  
  const [input, setInput] = useState('')
  
  const handleStateInput = (evt) => {
    setInput( evt.currentTarget.value );
  };

    const handleProps = (evt) => {
    evt.preventDefault();

    if (input.trim() === '') {
      toast.error('What will to search?', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }
    onSubmit(input);
    pageReset();
    setInput('');
  };
 return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleProps}>
          <button type="submit" className={css.SearchForm__button}>
            <FaAccessibleIcon />
            <span className={css.SearchForm__button__label}>Search</span>
          </button>

          <input
            className={css.SearchForm__input}
            type="text"
            value={input}
            placeholder="Search images and photos"
            onChange={handleStateInput}
          />
        </form>
      </header>
    );
}



   
  



