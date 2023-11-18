import { getSession, signOut } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosRequestConfig } from 'axios';
import Router from 'next/router';

declare module 'next-auth' {
  interface Session {
    id: number;
    username: string;
    email: string;
    token: string;
    type: string;
  }
}

type context = {
  resolvedUrl: string;
  req: NextApiRequest;
  res: NextApiResponse;
  locale: string;
};

//Get
export async function Get(url: string) {
  let data;

  try {
    const response = await axios.get(url ? `${url}` : ``, {});
    data = response.data;
  } catch (error: any) {
    handleCLientError(error);
  }

  return data;
}

// Post
// data should be any since we dont know which data will be sent as an args
export async function Post(
  url: string,
  data: any,
  headers?: Record<string, string>
) {
  let response;

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/',
    },
  };

  try {
    response = await axios.post(url ? `${url}` : ``, data, config);
  } catch (error: any) {
    console.log('error', error.response);
  }

  return response;
}
// data should be any since we dont know which data will be sent as an args
export async function Put(url: string, data: any) {
  let response;

  try {
    response = await axios.put(url, data, {});
  } catch (error: any) {
    console.log('error', error.response);
    // handleClientError(error);
  }

  return response;
}

export async function Delete(url: string) {
  let response;

  try {
    response = await axios.put(url ? `${url}` : ``, {});
  } catch (error: any) {
    console.log('error', error.response);
  }

  return response;
}

const handleCLientError = (error: any) => {
  console.log('error', error);

  let errorMsg = null;

  if (error?.response?.data && typeof error.response.data == 'string') {
    errorMsg = error.response.data;
  }

  if (errorMsg) {
    const error = errorMsg ?? 'Request Failed!';
  } else {
  }
};
