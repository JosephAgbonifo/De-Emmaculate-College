"use client";
import React from "react";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="bg-cta py-5">
      <p className="text-xl p-3 pl-1/5 font-bold ">Send Us A Message</p>
      <form className="md:grid  md:grid-cols-2">
        <input
          className="block text-sm w-4/5 md:2/5 bg-bluebg border-0 focus:outline-0 rounded m-auto h-10 p-5 my-5 "
          name="fulname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Fullname"
          type="text"
          required
        />
        <input
          className="block text-sm w-4/5 bg-bluebg border-0 focus:outline-0 rounded m-auto h-10 p-5 my-5 "
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
        />
        <textarea
          className="block col-span-2 text-sm hide-scrollbar resize-none w-4/5 bg-bluebg border-0 focus:outline-0 rounded m-auto h-20 p-5 my-5 "
          name="message"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          required
        >
          {message}
        </textarea>
        <input
          type="submit"
          className="block col-span-2 w-4/5 bg-text text-bluebg border-0 focus:outline-0 rounded m-auto h-10 hover:bg-gray-900 my-5 "
          value="Send Message"
        />
      </form>
    </div>
  );
}
