import { FaCheck } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Pricing = () => {

    const Navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#9e6be9] to-[#f3d0e3] text-gray-900 font-sans px-4 py-10 sm:px-10">
     <Navbar />
      {/* Heading */}
      <div className="text-center mb-4 mt-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Pricing</h1>
        <p className="text-white text-sm sm:text-base mb-7">
          Upgrade to Plus, or Gold for an enhanced Milkha® experience.
        </p>
      </div>

      {/* Pricing Cards */}
      <div data-aos="fade-up" data-aos-delay="300" className="flex flex-col lg:flex-row items-center justify-center px-4 sm:px-10 gap-0 max-w-5xl mx-auto">
        {/* Basic */}
        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-sm flex-1 lg:rounded-r-none  transform transition duration-300 hover:scale-105 hover:shadow-xl">
          <h3 className="text-purple-800 font-semibold mb-2 pl-4">Milkha Basic</h3>
          <h2 className="text-3xl font-bold mb-4 pl-4">Free</h2>
          <ul className="text-sm space-y-3 mb-10">
            {[
              "Limited daily profile likes.",
              "Chat only with mutual matches.",
              "Appear in searches but with lower priority.",
              "Location, age, gender preferences.",
            ].map((text, idx) => (
              <li key={idx} className="flex items-center gap-2 text-gray-800 pl-4">
               <span className="p-[4px] border border-gray-300 rounded text-gray-800">
                  <FaCheck className="text-xs" />
                </span>
                {text}
              </li>
            ))}
          </ul>
          <button className="w-full bg-purple-600 text-white rounded-md py-2 hover:bg-purple-700 transition"
          onClick={()=> Navigate('/sign-up')}>
            Sign Up
          </button>
        </div>

        {/* Plus (Center Card) */}
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm transform scale-105 z-10 flex-1 relative transition duration-300 hover:scale-105 hover:shadow-xl">
          <h3 className="text-purple-800 font-semibold mb-2">Milkha Plus</h3>
          <h2 className="text-3xl font-bold mb-4">
            AED9.99<span className="text-purple-700 text-base font-medium">/mo</span>
          </h2>
          <ul className="text-sm space-y-3 mb-6">
            {[
              "Unlimited Profile Likes",
              "Appear higher in search results.",
              "No Ads",
              "Instantly view profiles that liked you.",
              "More Advanced Filters – Religion, interests, education, etc.",
            ].map((text, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-800">
                <FaCheck className="text-purple-500 mt-1" />
                {text}
              </li>
            ))}
          </ul>
          <button className="w-full bg-purple-600 text-white rounded-md py-2 hover:bg-purple-700 transition"
          onClick={()=> Navigate('/sign-up')}>
            Sign Up
          </button>
        </div>

        {/* Gold */}
        <div className="bg-white rounded-xl shadow-md p-6 w-4 h-90 max-w-sm flex-1 lg:rounded-l-none transform transition duration-300 hover:scale-105 hover:shadow-xl">
          <h3 className="text-purple-800 font-semibold pl-4 mb-2">Milkha Gold</h3>
          <h2 className="text-3xl font-bold mb-4 pl-4">
            AED19.99<span className="text-purple-700 text-base font-medium">/mo</span>
          </h2>
          <ul className="text-sm space-y-5 mb-6 pl-4">
            {[
              "All Milkha Plus features",
              "Appear at the top of searches.",
              "Premium Customer Support",
              "Incognito Mode",
            ].map((text, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-800">
                  <span className="p-[4px] border border-gray-300 rounded text-gray-800">
                  <FaCheck className="text-xs" />
                </span>
                {text}
              </li>
            ))}
          </ul>
          <button className="w-full bg-purple-600 text-white rounded-md py-2 hover:bg-purple-700 transition"
          onClick={()=> Navigate('/sign-up')}>
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
