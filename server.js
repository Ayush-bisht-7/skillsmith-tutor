require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { YoutubeTranscript } = require("youtube-transcript");
const fetch = require("node-fetch");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Dummy summarizer for demonstration
app.post("/api/summarize-video", async (req, res) => {
  const { link } = req.body;
  if (!link || typeof link !== "string") {
    return res.status(400).json({ summary: "Invalid video link." });
  }
  try {
    // Extract YouTube video ID
    const match = link.match(/(?:v=|youtu.be\/)([\w-]{11})/);
    if (!match) {
      return res.status(400).json({ summary: "Invalid YouTube link format." });
    }
    const videoId = match[1];
    // Fetch transcript
    const transcriptArr = await YoutubeTranscript.fetchTranscript(videoId);
    if (!transcriptArr || transcriptArr.length === 0) {
      return res.status(404).json({ summary: "No transcript/captions found for this video. Try another video with captions enabled." });
    }
    const transcript = transcriptArr.map(t => t.text).join(" ");
    // Call Hugging Face Inference API (free tier, no token needed for light use)
    const hfRes = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.HF_TOKEN ? { "Authorization": `Bearer ${process.env.HF_TOKEN}` } : {})
      },
      body: JSON.stringify({ inputs: transcript.slice(0, 2000) }) // limit input size
    });
    const hfData = await hfRes.json();
    console.log("Hugging Face API response:", hfData); // Debug log
    let summary = "Could not summarize with Hugging Face API.";
    if (Array.isArray(hfData) && hfData[0]?.summary_text) {
      summary = hfData[0].summary_text;
    } else if (hfData.error) {
      summary = `Hugging Face API error: ${hfData.error}`;
    }
    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ summary: "Failed to summarize video. Try again later." });
  }
});

// Debugger endpoint
app.post("/api/debug", async (req, res) => {
  const { language, code } = req.body;
  if (!language || !code) {
    return res.status(400).json({ error: "Language and code are required." });
  }
  // File extension and run command per language
  const langConfig = {
    c:    { ext: ".c",    compile: "gcc {file} -o {base} && ./{base}", run: "./{base}" },
    cpp:  { ext: ".cpp",  compile: "g++ {file} -o {base} && ./{base}", run: "./{base}" },
    java: { ext: ".java", compile: "javac {file} && java {base}", run: "java {base}" },
    python: { ext: ".py", run: "python {file}" },
  };
  const config = langConfig[language];
  if (!config) return res.status(400).json({ error: "Unsupported language." });
  // Write code to temp file
  const base = `code_${Date.now()}`;
  const file = path.join(__dirname, `${base}${config.ext}`);
  fs.writeFileSync(file, code);
  let cmd = config.run.replace(/{file}/g, file).replace(/{base}/g, base);
  if (config.compile) {
    cmd = config.compile.replace(/{file}/g, file).replace(/{base}/g, base);
  }
  exec(cmd, { timeout: 5000 }, (err, stdout, stderr) => {
    // Clean up temp files
    try {
      fs.unlinkSync(file);
      if (language === "c" || language === "cpp") fs.unlinkSync(path.join(__dirname, base));
      if (language === "java") {
        fs.unlinkSync(path.join(__dirname, `${base}.class`));
      }
    } catch {}
    if (err) {
      return res.status(200).json({ output: stdout, error: stderr || err.message });
    }
    res.json({ output: stdout });
  });
});

// AI Help Bot endpoint
app.post("/api/ai-bot", async (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Query is required." });
  }
  try {
    // Use Hugging Face Inference API for conversational AI (light/free use)
    const hfRes = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.HF_TOKEN ? { "Authorization": `Bearer ${process.env.HF_TOKEN}` } : {})
      },
      body: JSON.stringify({ inputs: query })
    });
    const hfData = await hfRes.json();
    let response = "Could not get a response from AI.";
    if (hfData.generated_text) {
      response = hfData.generated_text;
    } else if (hfData.error) {
      response = `Hugging Face API error: ${hfData.error}`;
    }
    res.json({ response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get AI response. Try again later." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
