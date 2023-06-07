import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searcbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App = () => {
  const [page, setPage] = useState(1);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [error, setError] = useState(null)
  const [imgLarge, setImgLarge] = useState('');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleLoading = () => {
    setIsLoading(!isLoading);
  };

  const handleStateInput = e => {
    setInput(e);
  };

  const handleStateImgLarge = e => {
    setImgLarge(e);
  };

  const resetPage = () => {
    setPage(1);
  };

  const incrementPage = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={handleStateInput} pageReset={resetPage} />

      <ImageGallery
        page={page}
        input={input}
        loading={toggleLoading}
        onToggle={toggleModal}
        onModal={handleStateImgLarge}
        onPageReset={resetPage}
        onPageIncrement={incrementPage}
      />

      <ToastContainer />

      {showModal && <Modal onClose={toggleModal} imgLarge={imgLarge} />}
    </div>
  );
};
