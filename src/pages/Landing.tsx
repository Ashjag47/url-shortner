import AboutAccordion from '@/components/AboutAccordion';
import URLInputSpace from '@/components/URLInputSpace';
import React from 'react';

const Landing = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        {/* Short Description of App */}
        <h2 className="my-10 sm:my-16 text-3xl sm:text-5xl lg:text-6xl text-white text-center font-extrabold shadow-lg transition-transform duration-500 hover:scale-105 animate-fade-in">
          The only URL{' '}
          <del className="text-gray-400 hover:text-red-500 transition-colors duration-300">
            Shortner
          </del>
          <span className="text-blue-500"> Sharpener </span>
          <br /> you'll ever need 👉 👇 <br />
          <span className="text-yellow-300 hover:text-yellow-400 transition-colors duration-300">
            To make your Life Easy 🖖
          </span>
        </h2>

        {/* Input box to enter URL and a button to shorten it */}
        <URLInputSpace />

        {/* Banner of URL Sharpener */}
        <div className="mt-10 flex justify-center">
          <img
            src="/banner.jpg"
            alt="URL Sharpener Banner"
            className="rounded-lg shadow-lg w-[90%] transition-transform duration-500 hover:scale-x-110"
          />
        </div>
      </div>
      {/* Accordion to show more about the app */}
      <AboutAccordion />
    </>
  );
};

export default Landing;
