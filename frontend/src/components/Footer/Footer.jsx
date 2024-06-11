//import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="bg-[#1b1919] p-10" id="footer">
      <div className="flex flex-col lg:flex-row justify-around gap-10">
        <div className="w-full lg:w-[33%] flex flex-col gap-10">
          <img src={assets.logo_footer} alt="logo" className="w-48" />
          <p className="text-[#c8c8ca] text-2xl">
            Viverra gravida morbi egestas facilisis tortor netus non duis
            tempor.
          </p>
          <div className="flex gap-5">
            <img
              className="duration-100 hover:scale-105 cursor-pointer"
              src={assets.facebook_icon}
              alt="fb"
            />
            <img
              className="duration-100 hover:scale-105 cursor-pointer"
              src={assets.twitter_icon}
              alt="twitter"
            />
            <img
              className="duration-100 hover:scale-105 cursor-pointer"
              src={assets.linkedin_icon}
              alt="instagram"
            />
          </div>
        </div>
        <div className="w-full lg:w-auto flex flex-col gap-10">
          <img src={assets.logo_footer} alt="logo" className="w-32" />
          <ul className="text-[#c8c8ca] text-xl font-normal flex flex-col gap-3">
            <Link to={'/'}>Home</Link>
            <a href="#explore-menu">Menu</a>
            <a href="#food-display">Order online</a>
            <li>Catering</li>
            <li>Reservation</li>
          </ul>
        </div>
        <div className="w-full lg:w-auto flex flex-col gap-10">
          <img src={assets.logo_footer} alt="logo" className="w-32" />
          <ul className="text-[#c8c8ca] text-xl font-normal flex flex-col gap-3">
            <li>About us</li>
            <li>Testimonial</li>
            <li>Event</li>
          </ul>
        </div>
        <div className="w-full lg:w-auto flex flex-col gap-10">
          <img src={assets.logo_footer} alt="logo" className="w-32" />
          <ul className="text-[#c8c8ca] text-xl font-normal flex flex-col gap-3">
            <li>2972 Westheimer Rd. Santa Ana, Illinois 85486</li>
            <li>abc@email.com</li>
            <li>+123 4567 8901</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
