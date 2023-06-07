import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import css from './ImageGallery.module.css';
import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';

const KEY = '34669214-e080ea2af1c664bb939ebc002';

const BASE_URL = `https://pixabay.com/api/?key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

export class ImageGallery extends Component {
  state = {
    articles: [],
    isLoading: false,
  };

  toggleLoading = () => {
    this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
  };

  toggleModal = e => {
    // console.log(e.target.useMap);
    this.props.onTogle();
    this.props.onModal(e.target.useMap);
  };

  handlePage = () => {
    this.props.onPageIncrement();
    this.handleFetch();
  };



  componentDidUpdate(prevProps, prevState) {
    if (prevProps.input !== this.props.input) {
      this.setState({ articles: [] });

      this.props.onPageReset();
      this.handleFetch(this.props.page);
    }
  }

  async handleFetch() {
    this.toggleLoading();

    const { input } = this.props;

    await fetch(`${BASE_URL}&page=${this.props.page}&q=${input}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Запит ${input} не був успішним`));
      })
      .then(articles => {
        if (articles.hits.length > 0) {
          const combinedArticles = this.state.articles
            ? [...this.state.articles, ...articles.hits]
            : articles.hits;
          this.setState({ articles: combinedArticles });
        } else
          toast.error('Your querry bring nothing', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
      })
      .catch(error => this.setState({ error }))
      .finally(this.toggleLoading());
  }

  render() {
    const { articles, isLoading } = this.state;
    return (
      <>
        <ul className={css.imageGallery} onClick={this.toggleModal}>
          {articles &&
            articles.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                img={webformatURL}
                imgLarge={largeImageURL}
              />
            ))}
        </ul>
        {isLoading && <Loader />}
        {articles.length > 0 && <Button onClick={this.handlePage} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
 
  input: PropTypes.string.isRequired,
};





















// import React, { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
// import { toast } from 'react-toastify';
// import css from './ImageGallery.module.css';
// import { Button } from 'components/Button/Button';
// import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
// import { Loader } from 'components/Loader/Loader';

// const KEY = '34669214-e080ea2af1c664bb939ebc002';

// const BASE_URL = `https://pixabay.com/api/?key=${KEY}&image_type=photo&orientation=horizontal&per_page=3`;

// export function ImageGallery({
//   page,
//   input,
//   onPageIncrement,
//   onPageReset,
//   onToggle,
//   onModal,
// }) {
//   const [articles, setArticles] = useState([]);
//   const [inputPrev, setInput] = useState();
//   const [isLoading, setLoading] = useState(false);
//   const [error1, setError] = useState(null);
  

  

//   const toggleLoading = () => {
//     setLoading(prevIsLoading => !prevIsLoading);
//   };

//   const toggleModal = e => {
//     onToggle();
//     onModal(e.target.useMap);
//   };

//   const handlePage = () => {
//     onPageIncrement();
//     handleFetch();
//   };

//   const handleFetch = async () => {
//     setInput(input)
//     toggleLoading();

//     try {
//       const response = await fetch(`${BASE_URL}&page=${page}&q=${input}`);

//       if (response.ok) {
//         const data = await response.json();
//         if (data.hits.length > 0) {
//           const combinedArticles = articles.length
//             ? [...articles, ...data.hits]
//             : data.hits;
//           setArticles(combinedArticles);
//         } else {
//           toast.error('Your query brought nothing', {
//             position: 'top-right',
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: 'light',
//           });
//         }
//       } else {
//         throw new Error(`Request for ${input} was not successful`);
//       }
//     } catch (error) {
//       setError(error1);
//     } finally {
//       toggleLoading();
//     }
//   };

  
//   useEffect(() => {
//     if (inputPrev !== input) {
//       console.log(input);
//       console.log(inputPrev);
//     setArticles([]);
//     onPageReset();
//     handleFetch();
//   }
// }, [input]);
  
  
//   return (
//     <>
//       <ul className={css.imageGallery} onClick={toggleModal}>
//         {articles &&
//           articles.map(({ id, webformatURL, largeImageURL }) => (
//             <ImageGalleryItem
//               key={id}
//               img={webformatURL}
//               imgLarge={largeImageURL}
//             />
//           ))}
//       </ul>
//       {isLoading && <Loader />}
//       {articles.length > 0 && <Button onClick={handlePage} />}
//     </>
//   );
// }

// ImageGallery.propTypes = {
//   page: PropTypes.number.isRequired,
//   input: PropTypes.string.isRequired,
//   onPageIncrement: PropTypes.func.isRequired,
//   onPageReset: PropTypes.func.isRequired,
//   onToggle: PropTypes.func.isRequired,
//   onModal: PropTypes.func.isRequired,
// };
