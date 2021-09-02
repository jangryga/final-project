import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Method } from '../types';

interface MakeRequest {
  url: string;
  method: Method;
  body?: {
    username?: string;
    email?: string;
    password?: string;
  };
  onSuccess: (arg: any) => void;
}

export function useRequest({ url, method, body, onSuccess }: MakeRequest) {
  const [errors, setErrors] = useState<string[]>([]);

  const doRequest = async () => {
    try {
      setErrors([]);
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err: any) {
      err.response.data.errors.forEach(
        (err: { message: string; field?: string }) => {
          toast.error(err.message, { position: toast.POSITION.TOP_RIGHT });
        }
      );
    }
  };

  return { doRequest, errors };
}
