import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const URLInputSpace = () => {
  const [longUrl, setLongUrl] = React.useState('');
  const navigate = useNavigate();

  const handleShortenUrl = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (longUrl.trim() !== '') {
      navigate(`/auth?createNewUrl=${longUrl}`);
    }
  };

  return (
    <>
      <form
        className="flex flex-col sm:flex-row w-full md:w-2/4 gap-4 bg-white/10 backdrop-blur-md p-3 rounded-lg shadow-lg border"
        onSubmit={handleShortenUrl}
      >
        {/* Input Field */}
        <Input
          type="url"
          placeholder="Enter your lo♾♾ong URL"
          className="h-16 flex-1 p-4 text-white placeholder-gray-300 bg-white/10 border border-white/40 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />

        {/* Submit Button */}
        <Button
          className="h-16 px-8 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 flex items-center justify-center"
          type="submit"
          variant="secondary"
        >
          <span className="text-xl">Sharpen!</span>
        </Button>
      </form>
    </>
  );
};

export default URLInputSpace;
