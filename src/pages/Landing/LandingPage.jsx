import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaPlus, FaChevronRight } from "react-icons/fa";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from './Navbar';

const LandingPage = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const blogItems = [
    { title: "How AI is Changing the Future of Online Matchmaking" },
    { title: "From First Message to First Date: Tips for a Smooth Transition" },
    { title: "Online Dating Safety: How to Protect Your Privacy" },
    { title: "Breaking the Ice: Conversation Starters That Actually Work" },
  ];

  const faqs = [
    {
      question: "How does Milkha match users?",
      answer:
        "Milkha matches users using AI-powered compatibility metrics focused on values, interests, and preferences—not just looks.",
    },
    {
      question: "What if I’m not finding the right matches?",
      answer:
        "Our system continuously refines your preferences and match suggestions the more you engage. Be sure your profile is complete and up to date.",
    },
    {
      question: "Can I delete my account if I no longer want to use Milkha?",
      answer:
        "Yes, you can delete your account anytime from the settings page. All your data will be securely removed.",
    },
    {
      question: "How do I know if profiles are real?",
      answer:
        "Yes! We follow strict data privacy policies to ensure your personal information remains protected. Messages and interactions are end-to-end encrypted.",
    },
  ];

  return (
    <div className="font-sans text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative min-h-screen bg-cover bg-center text-white animate-fade-in"
        style={{ backgroundImage: "url('/images/frame1.png')" }}
      >

       {/* Custom Navbar */}
        <Navbar />
        {/* Hero Content */}
        <div data-aos="fade-up"
         data-aos-delay="200"
        data-aos-offset="150"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
         className="relative z-10 flex flex-col items-center justify-center h-[calc(140vh-250px)] text-center px-4 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-4xl">
            Find Meaningful <span className="italic font-serif">Connections</span>,<br />
            Not Just <span className="italic font-serif">Matches</span>.
          </h1>
          <p className="text-base sm:text-lg mt-6 max-w-xl">
            Milkha helps you connect with like-minded people based on values, interests, and true compatibility.
          </p>
          <button
            className="mt-6 bg-[#693EE0] hover:bg-purple-500 text-white px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:scale-105"
            onClick={() => navigate("/sign-up")}
          >
            Sign Up →
          </button>
        </div>
      </section>

      {/* How it Works Section */}
      <section data-aos="fade-up" data-aos-delay="100" className="bg-[#ececec] text-white py-16 px-4 sm:px-8 lg:px-20 animate-fade-in-up">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#8b5cf6] mb-16 transition-all">
          Find Meaningful <span className="italic font-serif">Connections</span>,<br />
          Not Just <span className="italic font-serif">Matches</span>.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="flex flex-col items-center group">
            <div className="bg-[#c7b8fc] text-black rounded-xl p-4 w-80 h-34 group-hover:scale-105 transition-all duration-300">
              <h3 className="text-sm font-bold mb-2">01. Create Your Profile</h3>
              <p className="text-sm">Tell us about yourself! Add your details,
                 interests, and what you're looking for in a partner. The more we know,
                 the better your matches</p>
            </div>
            <img
              src="/images/Frame9.png"
              alt="Create Profile"
              className="mt-4 w-80 h-64 object-cover rounded-xl shadow-xl group-hover:scale-105 transition-all duration-300"
            />
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center">
            <div className="relative w-80 h-103 rounded-xl overflow-hidden shadow-xl group transition-all duration-300 hover:scale-105">
              <img src="/images/frame2.png" alt="Smart Match" className="w-full h-103 object-cover" />
              <div className="absolute top-4 left-4 text-white text-3xl font-semibold">02. Get Smart Match Suggestions</div>
              <div className="absolute bottom-4 left-4 right-4 text-md text-white">
                Our AI-powered system finds people who truly align
                 with your values, lifestyle,
                  and preferences—no endless swiping,
                 just real connections
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center group">
            <img
              src="/images/Frame6.png"
              alt="Break Ice"
              className="mb-4 w-80 h-64 object-cover rounded-xl shadow-xl group-hover:scale-105 transition-all duration-300"
            />
            <div className="bg-[#c7b8fc] text-black rounded-xl p-4 w-80 h-34 group-hover:scale-105 transition-all duration-300">
              <h3 className="text-sm font-bold mb-2">03. Break the Ice</h3>
              <p className="text-sm">Like someone? Say hi! Break the ice
                 with an AI-suggested opener or start a chat your way. Build
                 meaningful relationships at your own pace.</p>
            </div>
          </div>
        </div>
      </section>




      <div data-aos="fade-up" data-aos-delay="200" className="relative bg-[#fdf2f7] py-16 px-4 sm:px-8 lg:px-20 text-center overflow-hidden">
  {/* Section Title */}
  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
    Find Meaningful <span className="italic">Connections</span>,<br />
    Not Just <span className="italic">Matches.</span>
  </h2>

  {/* Features */}
  <div data-aos="fade-in" data-aos-delay="100" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12 text-left max-w-6xl mx-auto">
    {[
      {
        title: "AI-Powered Matchmaking",
        desc: "Smart recommendations based on compatibility, not just looks. Our algorithm understands what truly matters in relationships.",
      },
      {
        title: "Verified Profiles",
        desc: "Genuine connections with real people. We verify all profiles to ensure you're meeting authentic individuals.",
      },
      {
        title: "Private & Secure Messaging",
        desc: "Keep conversations safe and meaningful with end-to-end encryption and privacy controls.",
      },
      {
        title: "Value-Based Matching",
        desc: "Faith, lifestyle, and personal values matter. We match based on what's important to you.",
      },
    ].map((item, index) => (
      <div data-aos="fade-up" data-aos-delay="100" className="hover:scale-120 transition hover:border-gray-300 hover:border-1 rounded hover:p-3 " key={index}>
        <p className="text-sm font-bold mb-1">0{index + 1}</p>
        <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
        <p className="text-xs text-gray-700">{item.desc}</p>
      </div>
    ))}
  </div>

  {/* Profile Cards Section */}
  <div className="relative flex flex-col items-center justify-center mt-24 lg:flex-row gap-8 min-h-[1000px] max-w-5xl mx-auto">
    {/* Left Profile Card */}
    <div className="hidden lg:block relative z-10">
      <div className="bg-white rounded-2xl shadow-md w-85 max-h-[90%] p-6 transition hover:scale-105 duration-300 max-w-sm flex-1">
        {/* Image */}
        <div className="relative text-center justify-center w-52 ml-16 mt-8">
          <img
            src="/images/Image.png"
            alt="Maimuna A. Jehi"
            className="w-full h-72 object-cover rounded-xl hover:scale-105 transition"
          />
          <span className="absolute top-1 right-1 text-[10px] bg-purple-100 text-purple-700 font-medium px-2 py-[2px] rounded-full shadow-sm whitespace-nowrap">
            97% COMPLETE
          </span>
        </div>
        {/* Name + Basic Info */}
        <div className="flex gap-2 whitespace-nowrap mt-10 mb-8 justify-between">
        <div className="mt-4 text-start">
          <h3 className="text-sm font-semibold text-gray-800">Maimuna A. Jehi</h3>
          <p className="text-xs text-gray-500">24 YRS | MIDDLE-EAST, UAE</p>
        </div>
        {/* Like + Shortlist */}
        <div className="flex gap-1  ml-1 h-7 justify-center mt-4">
          <button className="flex-1 text-xs py-1 px-2 bg-pink-100 text-pink-600 rounded-md
           shadow-x1 font-medium
       hover:bg-pink-200 hover:scale-105 transition">
            ❤️ Like
          </button>
          <button className="flex-1 text-xs py-1 px-2 bg-purple-100 text-purple-600 rounded-md
           shadow-x1 font-medium
       hover:bg-pink-200 hover:scale-105 transition">
            ⭐ Shortlist
          </button>
          </div>
        </div>
        {/* About */}
        <div className="mt-4 text-left border-0 rounded px-2
        py-2 bg-gray-100 hover:scale-105 transition shadow-sm">
          <h4 className="text-xs font-semibold text-gray-700 mb-1">ABOUT MAIMUNA</h4>
          <p className="text-xs text-gray-600 hover:font-semibold">
            I’m passionate about exploring new cultures and staying active. I want to meet someone to fall in love with me for who I really am.
          </p>
        </div>
        {/* Interests */}
        <div className="mt-3 text-left border-0 rounded px-2 py-2 bg-gray-100">
          <h4 className="text-xs font-semibold text-gray-700 mb-1">INTERESTS</h4>
          <div className="flex flex-wrap gap-2">
            {["Fitness", "Travel", "Reading", "Photography", "Cooking"].map((tag) => (
              <span
                key={tag}
                className="text-[11px] bg-purple-50 text-purple-700 hover:bg-gray-800 hover:text-white hover:font-serif
             px-2 py-1 rounded-full border
           border-purple-200"
          >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Center Profile Card */}
    <div className="z-20 scale-105 sm:scale-110">
  <div className="bg-white rounded-2xl border-15 border-black  shadow-2xl w-full max-w-sm mx-auto p-6 transition hover:scale-105 duration-300">
    {/* Image */}
    <div className="relative flex justify-center mt-6">
      <div className="relative w-48 h-72">
        <img
          src="/images/pro.png"
          alt="Khalid Al Nahyan"
          className="w-full h-full object-cover rounded-xl"
        />
        <span className="absolute top-1 right-1 text-[10px] bg-purple-100 text-purple-700 font-medium px-2 py-[2px] rounded-full shadow-sm whitespace-nowrap">
          97% COMPLETE
        </span>
      </div>
    </div>


    {/* Name + Basic Info */}
    <div className="mt-6 mb-4 flex whitespace-nowrap justify-between ">
      <div className="mt-4 text-start">
      <h3 className="text-xs font-semibold text-gray-900">Khalid Al Nahyan</h3>
      <p className="text-xs text-gray-500 font-medium">27 YRS | MIDDLE-EAST, UAE</p>
    </div>

    {/* Like + Shortlist */}
    <div className="flex whitespace-nowrap justify-center gap-1 mt-4 h-7 ml-1">
      <button className="fkex-1 text-xs px-2 py-1 bg-pink-100 text-pink-600 rounded-sm
       shadow-x1 font-medium
       hover:bg-pink-200 hover:scale-105 transition">
        ❤️ Like
      </button>
      <button className="flex-1 text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded-sm shadow-x1 font-medium
       hover:bg-pink-200 hover:scale-105 transition">
        ⭐ Shortlist
      </button>
    </div>
    </div>

    {/* About */}
    <div className="mt-3 bg-gray-100 rounded px-3 py-2 text-left hover:scale-105 transition shadow-sm">

      <h4 className="text-xs font-semibold text-gray-700 mb-1">ABOUT KHALID</h4>
      <p className="text-xs text-gray-600 hover:font-semibold">
        I’m passionate about exploring new cultures and staying active. I want to meet someone to fall in love with me for who I really am.
      </p>
      </div>

    {/* Interests */}
    <div className="mt-3 bg-gray-100 rounded px-3 py-2 text-left shadow-sm hover:scale-105 transition">
      <h4 className="text-xs font-semibold text-gray-700 mb-1">INTERESTS</h4>
      <div className="flex flex-wrap gap-2">
        {["Fitness", "Travel", "Reading", "Photography", "Cooking"].map((tag) => (
          <span
            key={tag}
            className="text-[11px] bg-purple-50 text-purple-700 hover:bg-gray-800 hover:text-white hover:font-serif
             px-2 py-1 rounded-full border
           border-purple-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
</div>


    {/* Right Profile Card */}
    <div className="hidden lg:block relative z-10">
      <div className="bg-white rounded-2xl shadow-xl w-85 p-6 transition hover:scale-105 duration-300 hover:shadow-xl">
        {/* Image */}
        <div className="relative text-center justify-center w-52 ml-16 mt-8">
          <img
            src="/images/Image.png"
            alt="Rashid Mohammed"
            className="w-full h-72 object-cover rounded-xl"
          />
          <span className="absolute top-1 right-1 text-[10px] bg-purple-100 text-purple-700 font-medium px-2 py-[2px] rounded-full shadow-sm whitespace-nowrap">
            97% COMPLETE
          </span>
        </div>
        {/* Name + Basic Info */}
        <div className="flex gap-2 whitespace-nowrap mt-10 mb-8 justify-between">
        <div className="mt-4 text-left">
          <h3 className="text-sm font-semibold text-gray-800">Rashid Mohammed</h3>
          <p className="text-xs text-gray-500">29 YRS | MIDDLE-EAST, UAE</p>
        </div>
        {/* Like + Shortlist */}
        <div className=" flex gap-1  ml-1 h-7 justify-center mt-4">
          <button className="flex-1 text-xs py-1 px-2 bg-pink-100 text-pink-600 rounded-md shadow-x1 font-medium hover:bg-pink-200 hover:scale-105 transition ">
            ❤️ Like
          </button>
          <button className="flex-1 text-xs py-1 px-2 bg-purple-100 text-purple-600 rounded-md shadow-x1 font-medium hover:bg-purple-200 hover:scale-105 transition">
            ⭐ Shortlist
          </button>
          </div>
        </div>
        {/* About */}
        <div className="mt-4 px-2 py-2 text-left border-0 rounded bg-gray-100 shadow-sm hover:scale-105">
          <h4 className="text-xs font-semibold text-gray-700 mb-1">ABOUT RASHID</h4>
          <p className="text-xs text-gray-600 hover:font-semibold">
            I’m passionate about exploring new cultures and staying active. I want to meet someone to fall in love with me for who I really am.
          </p>
        </div>
        {/* Interests */}
        <div className="mt-3 text-left border-0 bg-gray-100 rounded shadow-sm hover:scale-105 px-2 py-2">
          <h4 className="text-xs font-semibold text-gray-700 mb-1">INTERESTS</h4>
          <div className="flex flex-wrap gap-2">
            {["Fitness", "Travel", "Reading", "Photography", "Cooking"].map((tag) => (
              <span
                key={tag}
                className="text-[11px] bg-purple-50 text-purple-700 hover:bg-gray-800 hover:text-white hover:font-serif
             px-2 py-1 rounded-full border
           border-purple-200"
          >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>





<section className="bg-white px-4 sm:px-6 lg:px-16 py-20 animate-slide-up">
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div data-aos="fade-right" data-aos-delay="100">
          <p className="text-sm font-semibold uppercase text-gray-700 mb-2">FAQS</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 hover:text-purple-500 hover:scale-120 transition">
            What would you like to <br /> know about Milkha?
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 rounded border-gray-300 border-1
           text-sm font-medium hover:bg-purple-500 hover:text-white
           text-black hover:scale-150 transition">
            Talk to us <FaChevronRight className="text-xs" />
          </button>
        </div>

        <div data-aos="fade-left" data-aos-delay="100" className="md:col-span-2 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-purple-50 rounded-xl p-4 md:p-6 shadow-sm
               transition hover:shadow-md
              hover:scale-90
              sm:hover:scale-90 sm:hover:shadow-sm"
            >
              <div
                onClick={() => toggle(index)}
                className="flex justify-between items-start cursor-pointer"
              >
                <h4 className="text-base font-semibold text-gray-900 leading-snug">
                  {faq.question}
                </h4>
                <button className="ml-4 mt-1 bg-purple-600 text-white rounded p-1 w-6 h-6 flex items-center justify-center">
                  <FaPlus className="text-xs" />
                </button>
              </div>
              {openIndex === index && (
                <p className="mt-3 text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Blog Section */}
    <section data-aos="slide-left" data-aos-delay="100" className="bg-white px-4 sm:px-6 lg:px-16 py-16 animate-fade-in">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 hover:text-purple-500 hover:scale-95 transition-opacity">
        Dating Insights & Love Hacks
      </h2>

      <div className="border-t border-gray-200 mb-8" />

      <div className="grid md:grid-cols-3 gap-6">
        <div data-aos="fade-left" data-aos-delay="100" className="md:col-span-1 bg-purple-400 p-4 sm:p-6 rounded-xl text-white transition hover:shadow-xl
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

        <div data-aos="flip-left" data-aos-delay="100" className="md:col-span-2 grid sm:grid-cols-2 gap-6">
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

export default LandingPage;
