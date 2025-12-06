import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className='text-center m-20'>
      <h1 className='text-5xl mb-5'>Page Not Found</h1>
      <Link to="/" className='btn bg-blue-500 '>Go to home</Link>
    </div>
  );
};

export default ErrorPage;
