import axios from 'axios';
import { useState } from 'react';

const useRequest = ({url, method, body, handleSuccess }) => {
  const [errors, setErrors] = useState(null);
   
  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);

      if (handleSuccess) handleSuccess(response);
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  return { doRequest, errors };
}

export default useRequest;