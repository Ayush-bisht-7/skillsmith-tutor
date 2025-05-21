"use client";

import { useState } from "react";

export default function VideoSummarizer() {
  const [link, setLink] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSummarize(e) {
    e.preventDefault();
    setLoading(true);
    setSummary("");
    setError("");
    try {
      // This should call your backend API route for summarization
      const res = await fetch("/api/summarize-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link }),
      });
      if (!res.ok) throw new Error("Failed to summarize video");
      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      setError("Could not summarize the video. Please try again or check your link.");
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Video Summarizer</h1>
      <form onSubmit={handleSummarize} className="w-full max-w-md flex flex-col gap-4">
        <input
          type="url"
          value={link}
          onChange={e => setLink(e.target.value)}
          placeholder="Paste video link here"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Summarize Video"}
        </button>
      </form>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {summary && (
        <div className="mt-8 w-full max-w-2xl bg-white dark:bg-[#18181b] p-6 rounded-xl shadow-md border">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line">{summary}</p>
        </div>
      )}
    </div>
  );
}
