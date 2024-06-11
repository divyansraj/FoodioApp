import React from "react";
import "./Header.css";
import { assets } from "../../assets/assets";

const Header = () => {
  return (
    <div className="pt-[80px]">
      <div className="hero-bg-1 h-screen lg:h-[70vh] pt-16">
        <div className="max-w-[1280px] items-center justify-center h-full lg:h-[70vh] mx-auto flex flex-col md:flex-row pt-10 lg:pt-0 md:pt-0">
          {/* hero left section */}
          <div className="effect flex flex-col w-full md:w-[50%] justify-center gap-6 md:gap-16 p-4 md:p-0">
            <h1 className="text-4xl md:text-6xl font-bold leading-normal text-black">
              Best Restaurant In <span className="text-[#f54748]">Town.</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-800">
              We provide the best food in town, we offer home delivery and
              dine-in services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <button className="text-lg py-3 px-8 md:py-4 md:px-10 text-white font-semibold bg-[#f54748] rounded-lg border-2 border-stone-200 duration-100 hover:border-zinc-600">
                Order now
              </button>
              <button className="text-lg py-3 px-8 md:py-4 md:px-10 text-[#f54748] font-semibold bg-[#f9e2e2] rounded-lg border-2 border-[#f9e2e2] duration-100 hover:border-zinc-600">
                Reservation
              </button>
            </div>
          </div>
          {/* hero right section */}
          <div className="w-full md:w-[50%] mt-6 md:mt-0 flex justify-center items-center">
            <img
              src={assets.hero_right1}
              alt="Hero Right"
              className="w-full md:w-auto"
            />
          </div>
        </div>
      </div>
      <div className="hero-bg-2 h-full hidden lg:block">
        <div className="effect max-w-[1280px] h-[70vh] mx-auto flex flex-col md:flex-row gap-10 p-4 md:p-0">
          {/* hero left section */}
          <div className="w-full md:w-[50%] md:p-14 flex justify-center items-center">
            <img
              src={assets.hero_right2}
              alt="Hero Right 2"
              className="w-full md:w-auto p-16"
            />
          </div>
          {/* hero right section */}
          <div className="flex flex-col w-full md:w-[50%] justify-center gap-6 md:gap-16 p-4 md:p-0">
            <h1 className="text-4xl md:text-6xl font-bold leading-normal text-black">
              Our Most Popular <span className="text-[#f54748]">Dish.</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-800">
              This dish is full of flavor and nutrition! Quinoa is a complete
              protein, providing all the essential amino acids your body needs,
              and is also a good source of fiber.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <button className="text-lg py-3 px-8 md:py-4 md:px-10 text-white font-semibold bg-[#f54748] rounded-lg border-2 border-stone-200 duration-100 hover:border-zinc-600">
                Order now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
