import axios from 'axios';
import React, { useState } from 'react';
import './../style/CreateShortUrl.css';

const URL = 'https://ragonzalezm19-shorter-url.herokuapp.com/api';

const CreateShortUrl = () => {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');

  const handleUrlInputChange = (event) => {
    setUrl(event.target.value);
  };

  const handleAliasChange = (event) => {
    setAlias(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newShortUrl = {
      alias,
      url,
    };

    createShortUrl(newShortUrl);
  };

  const createShortUrl = async (urlData) => {
    try {
      const response = await axios.post(`${URL}/url`, urlData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
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
      <div className='response-container'></div>
    </div>
  );
};

export default CreateShortUrl;
