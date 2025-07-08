import React from "react";

const ContactSection: React.FC = () => {
  return (
    <section className="bg-blue-50 py-16 text-center">
      <h2 className="text-3xl font-bold mb-4 text-blue-900">
        We’d Love to Hear From You
      </h2>
      <p className="text-lg mb-6 text-blue-800 max-w-xl mx-auto">
        Have questions or want to learn more about De Emmaculate College? Reach
        out to us — we’re happy to help.
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <a
          href="mailto:emmaculatecollege@gmail.com"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition"
        >
          📧 Email Us
        </a>
        <a
          href="tel:+2347064369964"
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition"
        >
          📞 Call Us
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
