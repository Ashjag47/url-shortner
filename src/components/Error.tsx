import React from 'react';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return <span className="text-sm text-red-400">{message}</span>;
};

export default Error;
