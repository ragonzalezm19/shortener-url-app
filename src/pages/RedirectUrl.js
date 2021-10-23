import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import './../style/RedirectUrl.css';

const URL = 'https://ragonzalezm19-shorter-url.herokuapp.com/api';

const RedirectUrl = () => {
  const { alias } = useParams();
  const history = useHistory();

  useEffect(() => {
    getShortUrl(alias)
      .then((url) => {
        if (url !== null) window.location.href = url;
        else history.replace('/create');
      })
      .catch((error) => console.log(error));
  }, []);

  const getShortUrl = async (alias) => {
    try {
      const response = await axios.get(`${URL}/url/${alias}`);
      const { data } = response.data;
      const { url } = data;

      return url;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <div className='container'>
      <p className='message'>You are being redirected, please wait...</p>
    </div>
  );
};

export default RedirectUrl;
