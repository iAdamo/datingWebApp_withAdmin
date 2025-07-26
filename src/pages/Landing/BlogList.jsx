import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from "react";
import Footer from "./Footer";
import {Navigate, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Navbar from './Navbar';





const BlogList = () => {

    const Navigate = useNavigate();
    useEffect(() => {
      AOS.init({ duration: 800, once: true});
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
      <section className="relative min-h-screen bg-white text-black px-4 py-10 sm:px-10">
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
          className="rounded-2xl w-[280px] sm:w-[400px] md:w-[480px] object-cover shadow-lg bg-transparent opacity-30"
        />
      </div>

      {/* 🔳 Hero Heading (on top of image and wider) */}
      <div data-aos="fade-up"
         data-aos-delay="500"
        data-aos-offset="150"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
       className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full px-6">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight
         text-black max-w-5xl text-center mx-auto">
          More Than matchmaking—<br />
          A place for Meaningful{" "}
          <span className="italic font-serif">Connections.</span>
        </h1>
      </div>
    </section>

    <section className="px-4 sm:px-6 lg:px-24 py-16 text-gray-800 font-sans">
  {/* Intro Paragraph */}
  <div data-aos="fade-up" data-aos-delay="200"
   className="max-w-3xl mx-auto text-center mb-10">
    <p className="text-sm sm:text-base leading-relaxed hover:">
      At Milkha, we believe in deeper, more meaningful connections.
       Our platform brings together like-minded individuals guided by faith,
        ethics, and intentionality. This is more than matchmaking — it’s a mission to build lasting relationships on a solid foundation.
    </p>
  </div>

  {/* Introduction Section */}
  <div data-aos="fade-up" data-aos-delay="200" className="max-w-3xl mx-auto mb-16">
    <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
    <p className="text-sm sm:text-base leading-relaxed mb-6">
      From the beginning, Milkha was designed with purpose.
       We understand that meaningful connections don't happen overnight.
        That's why our platform is built around shared values,
         life goals, and cultural understanding — to help our users find partners that resonate on a deeper level.
    </p>
    <div data-aos="fade-up"
         data-aos-delay="500"
        data-aos-offset="150"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
         className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition">
      <img
        src="/images/blog1.png"
        alt="Notebook and plants"
        className="w-full h-auto object-cover hover:scale-110 transition"
      />
    </div>
    <p className="text-xs text-gray-500 mt-2 italic hover:scale-105 transition">
      A calm workspace fosters meaningful planning.
       The Milkha platform reflects this calm and clarity.
    </p>
  </div>

  {/* Culture and Code */}
  <div data-aos="fade-up"
         data-aos-delay="500"
        data-aos-offset="150"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out" className="max-w-3xl mx-auto mb-16">
    <h2 className="text-2xl font-semibold mb-4">Culture and Code</h2>
    <p className="text-sm sm:text-base leading-relaxed">
      We’re not just writing code.
       We're embedding cultural sensitivity,
        ethical design, and intentionality into every feature.
         Milkha isn’t about flashy gimmicks — it's about
          quiet confidence in offering what truly matters in relationships.
    </p>
  </div>

  {/* Wider Mission */}
  <div className="max-w-3xl mx-auto mb-16">
    <h2 className="text-2xl font-semibold mb-4">Wider Mission</h2>
    <ul className="list-disc list-inside text-sm sm:text-base space-y-2 mb-6 hover:scale-105 tranasition">
      <li>Supporting serious users seeking long-term commitment.</li>
      <li>Encouraging safe and respectful interaction.</li>
      <li>Promoting values-driven matchmaking and identity alignment.</li>
    </ul>
    <div  data-aos="fade-up"
         data-aos-delay="500"
        data-aos-offset="150"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
         className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition">
      <img
        src="/images/blog.png"
        alt="Team discussion"
        className="w-full h-auto object-cover"
      />
    </div>
    <p className="text-xs text-gray-500 mt-2 italic hover::scale-105 transition">
      Collaboration and purpose — the foundation of every product update we release.
    </p>
  </div>

  {/* Conclusion */}
  <div data-aos="fade-up"
         data-aos-delay="500"
        data-aos-offset="150"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
         className="max-w-3xl mx-auto text-center">
    <h2 className="text-2xl font-semibold mb-4 text-start ml-2">Conclusion</h2>
    <p className="text-sm sm:text-base leading-relaxed hover:scale-105 transition">
      We’re more than a product
       — we’re a community with intention.
        Milkha bridges the gap between tradition and technology,
         offering a space where authenticity thrives.
          Whether you're just beginning your journey or already know what you want,
           we’re here to support your path to love.
    </p>
  </div>
</section>

    
 
        <section data-aos="slide-left" data-aos-delay="100" className="bg-white px-4 sm:px-6 lg:px-16 py-16 animate-fade-in">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 hover:text-purple-500 hover:scale-95 transition-opacity">
               More Dating Insights & Love Hacks
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





export default BlogList;