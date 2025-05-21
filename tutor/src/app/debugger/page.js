"use client";

import { useState } from "react";

const LANGUAGES = [
  { label: "C", value: "c" },
  { label: "C++", value: "cpp" },
  { label: "Java", value: "java" },
  { label: "Python", value: "python" },
];

export default function DebuggerPage() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleDebug(e) {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/debug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code }),
      });
      const data = await res.json();
      if (res.ok && data.output) {
        setOutput(data.output);
        setError(data.error || "");
      } else {
        setOutput("");
        setError(data.error || "Unknown error");
      }
    } catch (err) {
      setError("Failed to connect to debugger backend.");
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Debugger</h1>
      <form onSubmit={handleDebug} className="w-full max-w-2xl flex flex-col gap-4 bg-white dark:bg-[#18181b] p-6 rounded-xl shadow-md">
        <label className="font-semibold">Select Language:</label>
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="border p-2 rounded"
        >
          {LANGUAGES.map(l => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>
        <label className="font-semibold">Enter your code:</label>
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          rows={10}
          className="border p-2 rounded font-mono"
          placeholder="Paste your code here..."
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
          disabled={loading}
        >
          {loading ? "Debugging..." : "Run & Debug"}
        </button>
      </form>
      {output && (
        <div className="mt-6 w-full max-w-2xl bg-green-50 dark:bg-green-900 p-4 rounded shadow">
          <h2 className="font-bold mb-2 text-green-800 dark:text-green-200">Output</h2>
          <pre className="whitespace-pre-wrap text-green-900 dark:text-green-100">{output}</pre>
        </div>
      )}
      {error && (
        <div className="mt-6 w-full max-w-2xl bg-red-50 dark:bg-red-900 p-4 rounded shadow">
          <h2 className="font-bold mb-2 text-red-800 dark:text-red-200">Error</h2>
          <pre className="whitespace-pre-wrap text-red-900 dark:text-red-100">{error}</pre>
        </div>
      )}
    </div>
  );
}
