import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './../style/CreateShortUrl.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { useLocation } from 'react-router';

const API_URL = 'https://ragonzalezm19-shorter-url.herokuapp.com/api';

const errorInitialState = {
  show: false,
  message: '',
};

const CreateShortUrl = () => {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [error, setError] = useState(errorInitialState);
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const rootPath = window.location.href.replace(location.pathname, '');

  const handleUrlInputChange = (event) => {
    setUrl(event.target.value);
  };

  const handleAliasChange = (event) => {
    setAlias(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const regex = new RegExp(
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    );

    if (!url.match(regex)) {
      setError({ show: true, message: 'URL not valid' });
      return;
    }

    setError(errorInitialState);

    let urlToTrim = url;

    if (urlToTrim.substr(0, 3).toLowerCase() === 'www')
      urlToTrim = `http://${urlToTrim}`;

    const newShortUrl = {
      alias,
      url: urlToTrim,
    };

    createShortUrl(newShortUrl);
  };

  const notify = (message, type) => {
    switch (type) {
      case 'success':
        Swal.fire({
          icon: 'success',
          title: 'New super-cool-shorturl:',
          html: message,
        });
        break;
      case 'error':
        Swal.fire({
          icon: 'error',
          title: 'Oops 😅',
          html: message,
        });
        break;
      default:
        break;
    }
  };

  const createShortUrl = async (urlData) => {
    setLoader(true);

    try {
      const response = await axios.post(`${API_URL}/url`, urlData);
      const { alias: newAlias } = response.data.data;

      setLoader(false);
      resetForm();
      notify(`<b>${rootPath}/sh/${newAlias}</b> 🔥`, 'success');
    } catch (error) {
      console.log(error);
      setLoader(false);
      notify('Sorry, there was an error creating the URL', 'error');
    }
  };

  const resetForm = () => {
    setUrl('');
    setAlias('');
  };

  return (
    <div className='container'>
      <h1 className='title'>Custom URL Shortener</h1>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <div className='inputs-container'>
            <input
              className='input input-url'
              type='text'
              placeholder='Write or pase a URL'
              value={url}
              onChange={handleUrlInputChange}
            />
            <input
              className='input input-alias'
              type='text'
              placeholder='Write a custom alias'
              value={alias}
              onChange={handleAliasChange}
            />
            <button type='submit' className='button'>
              Create
            </button>
          </div>
        </form>
      </div>
      {loader ? (
        <Loader
          className='loader'
          type='Oval'
          color='#144d79'
          height={200}
          width={200}
        />
      ) : (
        ''
      )}
      {error.show ? <div className='error-container'>{error.message}</div> : ''}
    </div>
  );
};

export default CreateShortUrl;
