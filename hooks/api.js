// hooks/useMutation.js

import axios from 'axios';
import { useEffect, useState } from 'react';

export const baseUrl =
  'https://stocks-motor-goodyear-bc7cb924ddfc.herokuapp.com';

export const useMutation = ({
  method = 'get',
  defaultLoading = false,
  defaultValue = {},
  url = '',
  afterSucces
}) => {
  const [loading, setLoading] = useState(defaultLoading);
  const [result, setResult] = useState(defaultValue);
  const axiosInstance = axios.create(); // Create an instance of Axios

  const mutation = async (value) => {
    try {
      setLoading(true);
      const response = await axiosInstance[method](url, value);
      afterSucces && (await afterSucces(response));
    } catch (error) {
      console.log('error:', error);
    } finally {
      setLoading(false);
    }
    return { loading, mutation, setResult };
  };

  return { loading, mutation, setResult };
};

export const fetch = ({
  additionalURL = '',
  formatter = (val) => val,
  type,
  noToaster = true,
  defaultValue = [],
  woInit,
  defaultLoading,
  afterSuccess,
  params = {},
  errorHandler = () => {},
  isLocalApi
}) => {
  const url = `${baseUrl}/${additionalURL}`;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(defaultValue);

  const getData = async () => {
    try {
      setLoading(true);
      const api = axios;
      const afterFetch = async (data) => {
        setData((prev) => formatter(data, prev));
        afterSuccess && (await afterSuccess(data));
      };
      const { data } = await api.get(url, { params });
      await afterFetch(data);
    } catch (err) {
      console.log('err:', err);
      // errorHandler();
      // const is401 = err?.response?.data?.status === 401;
      // if (is401) {
      //   errorToasterApi(err);
      //   setLoading(false);
      //   return;
      // }
      // if (noToaster) return;
      // errorToasterApi(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //   if (woInit) return;
    //   if (isUserDetails) return;
    getData();
  }, []);

  return { data, loading, refetch: getData, setData };
};
