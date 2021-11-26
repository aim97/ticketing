import axios from 'axios';
import { useState } from 'react';

const useRequest = ({url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState([]);
   
  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);
      if (onSuccess) onSuccess(response.data);
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  return { doRequest, errors };
}

export default useRequest;