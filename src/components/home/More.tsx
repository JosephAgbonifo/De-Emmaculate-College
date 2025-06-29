import React from "react";

const More = () => {
  return (
    <div>
      <h3 className="my-10 text-center text-cta text-2xl font-poppins font-bold">
        Our Vision
      </h3>
      <Mission>
        <p className="p-10">
          Our vision is to prepare and motivate our students for rapidly
          changing world by instilling in them critical thinking skills, a
          global perspective, and a respect for core values of honesty, loyalty,
          perseverance, and compassion. students will have success for today and
          be prepared for tomorrow.
        </p>
      </Mission>
      <h3 className="my-10  text-center text-cta text-2xl font-poppins font-bold">
        Our Mission
      </h3>
      <Mission>
        <p className="p-10">
          Our mission is to work together to build a safe, respectful and
          nurturing environment focused on maximizing each child&apos;s sense of
          well-being and acquisition of skills for life and learning.
        </p>
      </Mission>
    </div>
  );
};

function Mission({ children }: { children: React.ReactElement }) {
  return (
    <div className="text-center before:content-['“'] after:content-['„'] before:text-cta before:text-7xl after:text-cta after:text-7xl before:absolute relative before:left-0 before:top-0 after:absolute after:bottom-0 after:right-0 w-4/5  md:w-1/2 m-auto">
      {children}
    </div>
  );
}

export default More;
