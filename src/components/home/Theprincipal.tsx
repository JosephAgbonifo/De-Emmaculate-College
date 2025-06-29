import Image from "next/image";
import React from "react";

const Theprincipal = () => {
  return (
    <div className="bg-head md:flex py-10 md:p-20">
      <div className="flex md:flex-1 items-center justify-center">
        <Image
          src={"/images/principal.png"}
          width={200}
          height={200}
          alt="Mr Samuel"
          unoptimized
          className="rounded md:w-3/4"
        />
      </div>
      <div className="w-4/5 md:w-3/5 mx-auto text-justify py-10 text-gray-900">
        <h3 className="text-center text-2xl font-poppins font-bold">
          The Principal
        </h3>
        <p className="indent-2.5 pt-3">
          At De Emmaculate College, we are committed to academic excellence,
          character development, and holistic education. Under the leadership of
          our esteemed principal, Mr Abayomi Samuel Fadope, the school continues
          to uphold its legacy of nurturing well-rounded students who excel both
          in academics and personal growth.
        </p>
        <p className="indent-2.5 pt-3">
          With a passion for education and years of experience in leadership, Mr
          Abayomi Samuel Fadope fosters a learning environment that encourages
          discipline, innovation, and critical thinking. Our goal is to equip
          students with the knowledge and skills needed to succeed in a rapidly
          evolving world while instilling strong moral values that shape
          responsible leaders of tomorrow.
        </p>
        <p className="indent-2.5 pt-3">
          At De Emmaculate College, every student matters, and we are dedicated
          to providing an enriching and supportive atmosphere where they can
          thrive. We invite parents, guardians, and students to join us in this
          journey of academic and personal excellence.
        </p>
      </div>
    </div>
  );
};

export default Theprincipal;
