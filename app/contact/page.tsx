"use client"

import React, { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-teal-600">Contact Us</h1>
      <p className="text-lg">Feel free to reach out via email, phone, or visit us in-store.</p>

      <div className="mt-6">
        <p className="text-lg">Address: Mooroolbark, Melbourne, Australia</p>
        <p className="text-lg">Email: Phonetime.au@gmail.com</p>
        <p className="text-lg">Phone: 0468897890</p>
      </div>

      <h2 className="text-xl font-semibold text-teal-600 mt-6">Leave a Message</h2>
      {submitted ? (
        <p className="text-green-600">Thank you for your message! We'll get back to you soon.</p>
      ) : (
        <form
          action="https://formspree.io/f/xblgqzjw"
          method="POST"
          className="mt-4"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
