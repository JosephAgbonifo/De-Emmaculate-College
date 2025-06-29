import Image from "next/image";
import React from "react";

const dept = [
  {
    title: "SCIENCE",
    description:
      "The Science Department at De Emmaculate College is dedicated to fostering curiosity, critical thinking, and innovation. Our curriculum covers subjects like Mathematics, Physics, Chemistry, Biology, and Computer Science, ensuring students develop a strong foundation in scientific principles. With well-equipped laboratories and experienced teachers, we encourage hands-on learning and research, preparing students for careers in medicine, engineering, technology, and other scientific fields.",
    icon: "/departments/science.png",
  },
  {
    title: "ART",
    description:
      "Our Arts Department nurtures creativity, expression, and cultural appreciation. Students explore subjects such as Literature, Government, History, and Fine Arts, developing critical thinking and communication skills. Through engaging activities like drama, debate, and creative writing, we empower students to express themselves effectively and understand diverse perspectives. The Arts program at De Emmaculate College prepares students for careers in media, law, humanities, and social sciences.",
    icon: "/departments/arts.png",
  },
  {
    title: "COMMERCIAL",
    description:
      "The Commercial Department provides students with practical knowledge in business, finance, and entrepreneurship. Subjects like Accounting, Economics, Business Studies, and Marketing equip students with essential skills for the corporate world. Our curriculum emphasizes real-world applications, problem-solving, and financial literacy, ensuring students are prepared for careers in business management, banking, and entrepreneurship.",
    icon: "/departments/comm.png",
  },
];

const Departments = () => {
  return (
    <div>
      <div className="bg-white py-10">
        <h2 className="text-center text-3xl font-bold mb-8 mt-10">
          Our Departments
        </h2>
        <div className="md:max-w-6xl w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {dept.map((item, index) => (
            <div
              key={index}
              className="bg-secondary rounded-lg shadow-md flex flex-col items-center"
            >
              <div className="h-52 w-full relative object-cover  rounded-t-lg">
                <Image
                  src={item.icon}
                  alt={item.title}
                  className="rounded-t-lg"
                  fill
                  unoptimized
                />
              </div>

              <h3 className="pt-5 text-xl font-poppins my-3 font-semibold text-cta mb-2">
                {item.title}
              </h3>
              <p className="mx-5 mb-10 text-text text-justify">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Departments;
