import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from "react";
import Footer from "./Footer";
import {Navigate, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Navbar from './Navbar';





const About = () => {

    const Navigate = useNavigate();
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
      }, []);


const blogItems = [
    {
      title: "How AI is Changing the Future of Online Matchmaking",
    },
    {
      title: "From First Message to First Date: Tips for a Smooth Transition",
    },
    {
      title: "Online Dating Safety: How to Protect Your Privacy",
    },
    {
      title: "Breaking the Ice: Conversation Starters That Actually Work",
    },
  ];


return (
    <div>
      <section  className="relative min-h-screen bg-black text-white px-4 py-10 sm:px-10">
      <Navbar />
      {/* 🔳 Center Image */}
      <div data-aos="fade-up"
         data-aos-delay="100"
        data-aos-offset="150"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
         className="relative z-10 mt-15 flex justify-center items-center">
        <img
          src="/images/Frame6.png"
          alt="Main Couple"
          className="rounded-2xl w-[280px] sm:w-[400px] md:w-[480px] object-cover shadow-lg"
        />
      </div>

      {/* 🔳 Hero Heading (on top of image and wider) */}
      <div data-aos="fade-up"
         data-aos-delay="500"
        data-aos-offset="150"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out" className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full px-6">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight text-white max-w-5xl text-center mx-auto">
          More Than matchmaking—<br />
          A place for Meaningful{" "}
          <span className="italic font-serif">Connections.</span>
        </h1>
      </div>
    </section>
    <section>
         <div className="bg-black text-white py-16 px-4 sm:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Left Title */}
        <div data-aos="slide-left"
         data-aos-delay="200"
        data-aos-offset="150"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
         className="md:w-1/2">
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            About <span className="italic font-serif">Milkha</span>
          </h2>
        </div>

        {/* Right Paragraph */}
        <div data-aos="slide-right"
         data-aos-delay="200"
        data-aos-offset="150"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out" className="md:w-1/2 text-base leading-relaxed space-y-4">
          <p>
            At Milkha, we believe that love is more than just a swipe—it's about real
            compatibility. Our AI-powered matchmaking system connects you with
            like-minded individuals based on values, interests, and lifestyle
            preferences.
          </p>
          <p>
            Whether you're looking for a deep connection, a lifelong partner, or
            someone who truly understands you, Milkha is designed to help you find
            the right match effortlessly.
          </p>
        </div>
      </div>
    </div>
    </section>
 
    <section data-aos="slide-left" data-aos-delay="100" className="bg-white px-4 sm:px-6 lg:px-16 py-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 hover:text-purple-500 hover:scale-95 transition-opacity">
            Dating Insights & Love Hacks
          </h2>
    
          <div className="border-t border-gray-200 mb-8" />
    
          <div className="grid md:grid-cols-3 gap-6">
            <div data-aos="fade-left" data-aos-delay="100" className="md:col-span-1 bg-purple-400 p-4 sm:p-6 rounded-xl
             text-white transition hover:shadow-xl
            hover:bg-gray-800">
              <img
                src="/images/Image.png"
                alt="Featured Couple"
                className="rounded-xl w-full h-64 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold leading-snug hover:scale-105 transition">
                The Role of Compatibility in Finding Lasting Love
              </h3>
              <button className="mt-4 bg-white text-purple-600 px-4 py-2 text-sm font-medium
               rounded flex items-center gap-2 hover:bg-white transition
               hover:font-serif hover:scale-105
               sm:scale-105 sm:hover:bg-white sm:hover:font-serif">
                Read More <FaArrowRight className="text-xs" />
              </button>
            </div>
    
            <div  data-aos="flip-left" data-aos-delay="100" className="md:col-span-2 grid sm:grid-cols-2 gap-6">
              {blogItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#F6F6F6] p-6 rounded-xl hover:shadow-md transition
                  hover:scale-105 hover:animate-pulse shadow-md"
                >
                  <h4 className="text-base font-bold text-gray-900 mb-4 leading-snug w-60">
                    {item.title}
                  </h4>
                  <button className="text-sm flex items-center gap-2 text-gray-800
                   font-medium hover:shadow border border-gray-200
                    rounded bg-white px-4 py-2 hover:bg-purple-500 hover:text-white transition
                    hover:scale-105">
                    Read More <FaArrowRight className="text-xs" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
        </div>
);
};





export default About;



