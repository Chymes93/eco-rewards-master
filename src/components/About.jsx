import React from 'react';
import AboutUsImg from '../assets/AboutUs.png';
import WhoImg from '../assets/Who.png';
import MiniFooter from './MiniFooter';

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-start">
        <img
          src={AboutUsImg}
          alt="About Us"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
        <div className="relative z-20 px-6 md:px-16 max-w-3xl">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-8 mt-10 md:mt-0 font-poppins">
            ABOUT US
          </h1>
          <p className="text-white text-lg md:text-2xl font-normal leading-relaxed font-poppins">
            Ecorewards is a sustainability-focused platform that incentivizes
            individuals and businesses to adopt eco-friendly habits.
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-4 md:px-16 py-16 bg-white">
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={WhoImg}
            alt="Who We Are"
            className="rounded-3xl w-full max-w-md md:max-w-lg object-cover"
          />
        </div>
        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-black">
            Who&nbsp; We Are
          </h2>
          <p className="text-sm md:text-lg text-gray-800 font-poppins leading-snug">
            At Ecorewards, small daily choices lead to meaningful environmental
            impact. By rewarding actions like using reusable bags, choosing
            biodegradable packaging, and supporting refillable products,
            Ecorewards helps reduce waste and carbon emissions. Shoppers earn
            points through dynamic QR codes at checkout, which can be redeemed
            for discounts, gifts, or eco-lotteries. Our mission is to make
            sustainable living both rewarding and accessible. We partner with
            supermarkets, manufacturers, and communities to build a greener
            future—one action at a time. Join us and be part of the change.
          </p>
        </div>
      </section>
      <MiniFooter />
    </>
  );
};

export default About;
