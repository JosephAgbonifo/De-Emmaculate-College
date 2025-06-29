"use client";
import React, { useEffect, useState } from "react";

type Slide = {
  caption: string;
  image: string;
};

const slides: Slide[] = [
  { caption: "Education - A passport to freedom", image: "./slides/1.png" },
  { caption: "Your Child Deserves The Best", image: "./slides/2.png" },
  { caption: "Experience Quality Education", image: "./slides/3.png" },
];

const TYPE_SPEED = 50; // ms between characters
const SLIDE_DURATION = 5000; // 5 seconds per slide

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typedCaption, setTypedCaption] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentCaption = slides[currentSlide].caption;

    if (charIndex < currentCaption.length) {
      const timeout = setTimeout(() => {
        setTypedCaption((prev) => prev + currentCaption.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, TYPE_SPEED);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentSlide]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTypedCaption("");
      setCharIndex(0);
    }, SLIDE_DURATION);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <>
      <div
        className={` bg-cover  via-bluebg to-secondary h-screen w-screen md:flex items-center pt-5 md:p-0`}
        style={{
          backgroundImage: `url(${slides[currentSlide].image})`,
          backgroundColor: "rgba(0,0,0,0.7)",
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="md:flex w-[90%] pt-32 md:pt-0  m-auto items-center text-center">
          <div className="flex-1 p-4">
            <h2 className="font-poppins text-left text-3xl md:text-5xl font-bold mb-4 bg-linear-to-l from-secondary to-cta bg-clip-text text-transparent">
              Welcome to
              <br />
              <span className="bg-linear-to-l from-secondary to-cta bg-clip-text text-transparent">
                Emmaculate College
              </span>
            </h2>
            <p className="md:text-3xl hidden md:block text-left text-cta">
              {typedCaption}
            </p>
          </div>
          <div className="relative md:w-[1/2] m-auto w-full mt-32">
            <p className="ml-[5%] p-5 text-left w-[90%] absolute bottom-0 rounded bg-secondary/80 z-10 md:text-3xl md:hidden flex items-center text-1xl text-text font-bold h-16 ">
              {typedCaption}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
