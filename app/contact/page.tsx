"use client"

import React, { useState } from "react"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("https://formspree.io/f/xblgqzjw", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setName("")
        setEmail("")
        setMessage("")
      } else {
        alert("There was a problem submitting your message. Please try again later.")
      }
    } catch (error) {
      console.error("Error submitting form", error)
      alert("There was an error. Please try again.")
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* 标题 */}
      <h1 className="text-3xl font-bold text-teal-600 mb-4">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-6">
        Feel free to reach out via email, phone, or visit us in-store.
      </p>

      {/* 信息块 */}
      <div className="bg-gray-100 p-6 rounded-xl shadow-sm space-y-4 mb-10">
        <div>
          <span className="block text-gray-500 text-sm">📍 Address</span>
          <span className="text-lg text-gray-800 font-medium">
            Mooroolbark, Melbourne, Australia
          </span>
        </div>

        <div>
          <span className="block text-gray-500 text-sm">📧 Email</span>
          <span className="text-lg text-gray-800 font-medium">
            Phonetime.au@gmail.com
          </span>
        </div>

        <div>
          <span className="block text-gray-500 text-sm">📞 Phone</span>
          <span className="text-lg text-gray-800 font-medium">0468897890</span>
        </div>
      </div>

      {/* 留言区域 */}
      <h2 className="text-2xl font-semibold text-teal-600 mb-4">
        Leave a Message
      </h2>

      {submitted ? (
        <p className="text-green-600 text-lg font-medium">
          ✅ Thank you for your message! We'll get back to you soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Your Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Your Message
            </label>
            <textarea
              name="message"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  )
}
