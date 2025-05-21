"use client";

import { useState } from "react";

export default function AIHelpBot() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAsk(e) {
    e.preventDefault();
    setLoading(true);
    setResponse("");
    setError("");
    try {
      // Use relative URL for API call so it works with Next.js proxy
      const res = await fetch("/api/ai-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (res.ok && data.response) setResponse(data.response);
      else setError(data.error || "Unknown error");
    } catch (err) {
      setError("Failed to connect to AI Help Bot backend.");
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">AI Help Bot</h1>
      <form onSubmit={handleAsk} className="w-full max-w-2xl flex flex-col gap-4 bg-white dark:bg-[#18181b] p-6 rounded-xl shadow-md">
        <label className="font-semibold">Ask your question:</label>
        <textarea
          value={query}
          onChange={e => setQuery(e.target.value)}
          rows={4}
          className="border p-2 rounded"
          placeholder="Type your question here..."
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </form>
      {response && (
        <div className="mt-6 w-full max-w-2xl bg-green-50 dark:bg-green-900 p-4 rounded shadow">
          <h2 className="font-bold mb-2 text-green-800 dark:text-green-200">AI Response</h2>
          <pre className="whitespace-pre-wrap text-green-900 dark:text-green-100">{response}</pre>
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
