import React, { useState, useEffect } from "react";
import Tote from "../assets/Tote.png";
import "./EcoPointsSection.css";
import { Link } from "react-router-dom";

const sliderImages = [
  require("../assets/Man.png"),
  require("../assets/woman.png"),
  require("../assets/group-happy.png"),
];

const EcoPointsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#228B22] min-h-[70vh] px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white font-poppins">
        Start Earning Points & Join the Leaderboard
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Left: Image Slider */}
        <div className="flex-1 flex items-center justify-center max-w-xl relative">
          <img
            src={sliderImages[current]}
            alt="Eco activity"
            className="rounded-2xl object-cover w-full h-[400px] md:h-[650px] shadow-lg transition-all duration-700"
          />
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {sliderImages.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full border-2 border-white ${
                  current === idx ? "bg-green-500" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
        {/* Right: Text and Tote Bag */}
        <div className="flex-1 flex flex-col items-center md:items-start text-white max-w-md">
          <p className="mb-5 ml-6 text-md text-gray-200 text-center md:text-left font-poppins">
            Start earning eco-points by participating in <br /> sustainable
            activities and actions. Track your <br /> progress as you climb the
            leaderboard, <br />
            competing with others to make the greatest <br /> positive impact on
            the environment. Join the <br /> movement and see how your efforts{" "}
            <br /> contribute to a greener future!
          </p>
          <div className=" p-6 mb-6 flex flex-col items-center w-full max-w-xs">
            <img src={Tote} alt="Tote Bag" className="" />
          </div>
          <Link to="/signup">
            <button className=" btn-1 bg-white text-sm text-black font-poppins ml-9 mb-6 rounded-lg shadow hover:bg-gray-200 transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EcoPointsSection;
