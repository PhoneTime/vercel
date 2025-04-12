"use client"

import { useState } from "react"

export default function AppointmentPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [deviceModel, setDeviceModel] = useState("")
  const [issue, setIssue] = useState("")
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
          phone,
          deviceModel,
          issue,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setName("")
        setEmail("")
        setPhone("")
        setDeviceModel("")
        setIssue("")
      } else {
        alert("There was a problem. Please try again.")
      }
    } catch (error) {
      console.error("Form error:", error)
      alert("An error occurred. Please try again.")
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-teal-600 mb-6">Please fill in your details below — we’ll contact you as soon as possible to arrange your repair.</h1>

      {submitted ? (
        <p className="text-green-600 text-lg font-medium">
          ✅ Thank you for your request! We'll contact you shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Device Model</label>
            <input
              type="text"
              required
              value={deviceModel}
              onChange={(e) => setDeviceModel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Describe the Issue</label>
            <textarea
              required
              rows={4}
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  )
}
