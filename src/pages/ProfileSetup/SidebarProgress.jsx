import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import React from "react";

const steps = [
  {
    id: 1,
    title: "Personal",
    substeps: ["About You", "Partner Preferences"],
  },
  {
    id: 2,
    title: "Lifestyle",
    substeps: ["About You", "Partner Preferences"],
  },
  {
    id: 3,
    title: "Physical Appearance",
    substeps: ["About You", "Partner Preferences"],
  },
  {
    id: 4,
    title: "Marriage Plans",
    substeps: ["About You", "Partner Preferences"],
  },
  {
    id: 5,
    title: "Career & Education",
    substeps: ["About You", "Partner Preferences"],
  },
  {
    id: 6,
    title: "Interests & Hobbies",
    substeps: ["About You", "Partner Preferences"],
  },
];

const SidebarProgress = ({ activeStep }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true});
  }, []);
  return (
    <aside data-aos="slide-right"
    data-aos-delay="100"
   data-aos-offset="150"
   data-aos-duration="1000"
   data-aos-easing="ease-in-out" className="w-full max-h-100 max-w-[250px] bg-white rounded-2xl ml-10 shadow-md px-4 py-8 hidden lg:block">
      <ul data-aos="fade-up" data-aos-delay="500" className="space-y-6 relative">
        {steps.map((step, index) => {
          // Determine status
          const isCompleted = step.id < activeStep;
          const isCurrent = step.id === activeStep;

          return (
            <li key={step.id} className="relative">
              {/* Step Number & Title */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 flex items-center hover:scale-105 transition justify-center rounded-full text-xs font-light
                    ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isCurrent
                        ? "bg-purple-600 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                >
                  {step.id}
                </div>
                <span
                  className={`font-light text-sm hover:scale-105 transition ${
                    isCurrent ? "text-black" : isCompleted ? "text-gray-800" : "text-gray-600"
                  }`}
                >
                  {step.title}
                </span>
              </div>

              {/* Substeps only if active */}
              {step.substeps && isCurrent && (
                <ul className="ml-9 mt-3 space-y-3 hover:scale-105 transition">
                  {step.substeps.map((sub, subIndex) => (
                    <li key={subIndex} className="flex items-center gap-2 text-sm text-purple-700">
                      <div className="w-2 h-2 rounded-full bg-purple-600" />
                      {sub}
                    </li>
                  ))}
                </ul>
              )}

              {/* Connector Line */}
              {index !== steps.length - 1 && (
                <div className="absolute left-[11px] top-7 w-px h-full bg-gray-400"></div>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SidebarProgress;
