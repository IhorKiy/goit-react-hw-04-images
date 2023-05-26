import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import css from './ImageGallery.module.css';
import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';

const KEY = '34669214-e080ea2af1c664bb939ebc002';

const BASE_URL = `https://pixabay.com/api/?key=${KEY}&image_type=photo&orientation=horizontal&per_page=3`;

export function ImageGallery({
  page,
  input,
  onPageIncrement,
  onPageReset,
  onToggle,
  onModal,
}) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const toggleLoading = () => {
    setLoading(prevIsLoading => !prevIsLoading);
  };

  const toggleModal = e => {
    onToggle();
    onModal(e.target.useMap);
  };

  const handlePage = () => {
    onPageIncrement();
    handleFetch();
  };

  const handleFetch = async () => {
    toggleLoading();

    try {
      const response = await fetch(`${BASE_URL}&page=${page}&q=${input}`);

      if (response.ok) {
        const data = await response.json();
        if (data.hits.length > 0) {
          const combinedArticles = articles.length
            ? [...articles, ...data.hits]
            : data.hits;
          setArticles(combinedArticles);
        } else {
          toast.error('Your query brought nothing', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      } else {
        throw new Error(`Request for ${input} was not successful`);
      }
    } catch (error) {
      setError(error);
    } finally {
      toggleLoading();
    }
  };

    useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    } else {
      setArticles([]);
      onPageReset();
      handleFetch();
    }
  }, [input]);
  return (
    <>
      <ul className={css.imageGallery} onClick={toggleModal}>
        {articles &&
          articles.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              img={webformatURL}
              imgLarge={largeImageURL}
            />
          ))}
      </ul>
      ){isLoading && <Loader />}
      {articles.length > 0 && <Button onClick={handlePage} />}
    </>
  );
}

ImageGallery.propTypes = {
  page: PropTypes.number.isRequired,
  input: PropTypes.string.isRequired,
  onPageIncrement: PropTypes.func.isRequired,
  onPageReset: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onModal: PropTypes.func.isRequired,
};
