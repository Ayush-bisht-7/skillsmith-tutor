"use client";

import { useState } from "react";

export default function ResumeMaker() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experience: "",
    education: "",
    skills: ""
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Resume Maker</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-[#18181b] p-6 rounded-xl shadow-md flex flex-col gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="border p-2 rounded" required />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" required />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded" required />
          <textarea name="summary" value={form.summary} onChange={handleChange} placeholder="Professional Summary" className="border p-2 rounded" rows={2} />
          <textarea name="experience" value={form.experience} onChange={handleChange} placeholder="Work Experience" className="border p-2 rounded" rows={2} />
          <textarea name="education" value={form.education} onChange={handleChange} placeholder="Education" className="border p-2 rounded" rows={2} />
          <textarea name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma separated)" className="border p-2 rounded" rows={2} />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold">Generate Resume</button>
        </form>
      ) : (
        <div className="w-full max-w-2xl bg-white dark:bg-[#18181b] p-8 rounded-2xl shadow-2xl mt-4 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 mb-4">
            <div>
              <h2 className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 mb-1">{form.name}</h2>
              <div className="text-gray-600 dark:text-gray-300 text-sm">{form.email} | {form.phone}</div>
            </div>
            <div className="mt-2 sm:mt-0">
              <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-semibold">Professional Resume</span>
            </div>
          </div>
          {form.summary && (
            <section className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">Professional Summary</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{form.summary}</p>
            </section>
          )}
          {form.experience && (
            <section className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">Work Experience</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-line">{form.experience}</p>
            </section>
          )}
          {form.education && (
            <section className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">Education</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-line">{form.education}</p>
            </section>
          )}
          {form.skills && (
            <section className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">Skills</h3>
              <ul className="flex flex-wrap gap-2">
                {form.skills.split(",").map((skill, idx) => (
                  <li key={idx} className="bg-blue-50 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium">
                    {skill.trim()}
                  </li>
                ))}
              </ul>
            </section>
          )}
          <button onClick={() => setSubmitted(false)} className="mt-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Edit</button>
        </div>
      )}
    </div>
  );
}
