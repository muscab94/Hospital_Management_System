import React, { useState, useEffect, useRef } from "react";

function SectionThree() {
  // States for each stat
  const [doctors, setDoctors] = useState(0);
  const [departments, setDepartments] = useState(0);
  const [labs, setLabs] = useState(0);
  const [awards, setAwards] = useState(0);

  const [hasCounted, setHasCounted] = useState(false); // only count once
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
          setHasCounted(true);

          // Animate numbers
          const animate = (target, setter) => {
            let count = 0;
            const duration = 2000;
            const step = Math.floor(duration / target);
            const timer = setInterval(() => {
              count += 1;
              setter(count);
              if (count >= target) clearInterval(timer);
            }, step);
          };

          animate(85, setDoctors);
          animate(18, setDepartments);
          animate(12, setLabs);
          animate(125, setAwards);
        }
      },
      { threshold: 0.5 } // start when half of section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [hasCounted]);

  return (
    <div ref={sectionRef}>
      <div className="w-full h-72 my-20 bg-blue-100 flex items-center justify-between px-20">
        <div className="bg-white w-60 h-[140px] relative">
          <i className="fa-solid fa-user-doctor absolute left-24 -top-8 bg-blue-700 text-[1.5em] text-white py-4 px-4 pr-10 rounded-full"></i>
          <h1 className="text-center pt-8 font-bold text-[2em]">{doctors}</h1>
          <p className="text-center text-[1.1em] pt-3">Doctors</p>
        </div>

        <div className="bg-white w-60 h-[140px] relative">
          <i className="fa-solid fa-hospital absolute left-24 -top-8 bg-blue-700 text-[1.5em] text-white py-4 px-4 pr-10 rounded-full"></i>
          <h1 className="text-center pt-8 font-bold text-[2em]">{departments}</h1>
          <p className="text-center text-[1.1em] pt-3">Departments</p>
        </div>

        <div className="bg-white w-60 h-[140px] relative">
          <i className="fa-solid fa-flask absolute left-24 -top-8 bg-blue-700 text-[1.5em] text-white py-4 px-4 pr-10 rounded-full"></i>
          <h1 className="text-center pt-8 font-bold text-[2em]">{labs}</h1>
          <p className="text-center text-[1.1em] pt-3">Research Labs</p>
        </div>

        <div className="bg-white w-60 h-[140px] relative">
          <i className="fa-solid fa-award absolute left-24 -top-8 bg-blue-700 text-[1.5em] text-white py-4 px-4 pr-10 rounded-full"></i>
          <h1 className="text-center pt-8 font-bold text-[2em]">{awards}</h1>
          <p className="text-center text-[1.1em] pt-3">Awards</p>
        </div>
      </div>
    </div>
  );
}

export default SectionThree;
