import React from "react";
import { FaBookOpenReader } from "react-icons/fa6";

const WhyChooseUsData = [
  {
    title: "QUALITY EDUCATION",
    description:
      "We strictly follow a well-structured curriculum, ensuring that every child receives a high-quality education that meets recognized standards. Our team of seasoned teachers brings a wealth of experience, passion, and dedication to every classroom, creating an environment where students can thrive academically and personally.",
    icon: "/icons/experienced-faculty.png",
  },
  {
    title: "OUTSTANDING RESULTS",
    description:
      "our commitment to excellence reflects in our students' outstanding results. With a well-structured curriculum and seasoned educators dedicated to every child's success, we create an environment where students excel academically and develop holistically. Our focus on personalized learning, consistent support, and disciplined study habits ensures that our students achieve remarkable outcomes.",
    icon: "/icons/facilities.png",
  },
  {
    title: "EXTRACURRICULAR ACTIVITIES",
    description:
      "At De Emmaculate College, education goes beyond the classroom. We offer a rich range of extracurricular activities designed to nurture students' talents, interests, and personal growth. From sports and creative arts to clubs and leadership programs, our activities provide opportunities for every child to explore their passions, build confidence, and develop essential life skills.",
    icon: "/icons/holistic-development.png",
  },
];

const WhyChooseUs = () => {
  return (
    <div>
      <div className="bg-white py-10">
        <h2 className="text-center text-3xl font-bold mb-8 mt-10">
          Why Choose Us
        </h2>
        <div className="md:max-w-6xl w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {WhyChooseUsData.map((item, index) => (
            <div
              key={index}
              className="bg-secondary p-6 rounded-lg shadow-md flex flex-col items-center"
            >
              <FaBookOpenReader className="text-2xl mb-2" />
              <h3 className="text-xl font-poppins my-3 font-semibold text-cta mb-2">
                {item.title}
              </h3>
              <p className="text-text text-justify">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
