import express from "express";
import { createServer as createViteServer } from "vite";
import multer from "multer";
import path from "path";
import fs from "fs";
// @ts-ignore
import pdf from "pdf-parse";
import mammoth from "mammoth";
import { GoogleGenAI } from "@google/genai";
import Database from "better-sqlite3";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const upload = multer({ storage: multer.memoryStorage() });

// Database setup
const db = new Database("resume_analyzer.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS analysis_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    score INTEGER,
    analysis_json TEXT
  )
`);

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in the environment.");
  }
  return new GoogleGenAI({ apiKey });
};

app.use(express.json({ limit: '10mb' }));

// API Routes
app.post("/api/analyze", upload.single("resume"), async (req: any, res: any) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const ai = getAI();
    const jobDescription = req.body.jobDescription || "";
    let resumeText = "";
    let filePart = null;

    if (req.file.mimetype === "application/pdf") {
      // Pass PDF directly to Gemini for robust parsing (including image-based PDFs)
      filePart = {
        inlineData: {
          data: req.file.buffer.toString("base64"),
          mimeType: "application/pdf"
        }
      };
    } else if (
      req.file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const data = await mammoth.extractRawText({ buffer: req.file.buffer });
      resumeText = data.value;
    } else {
      return res.status(400).json({ error: "Unsupported file format. Please upload PDF or DOCX." });
    }

    if (!filePart && !resumeText.trim()) {
      return res.status(400).json({ error: "Could not extract text from resume." });
    }

    const model = "gemini-2.5-flash"; // gemini-2.5-flash is stable and fast for parsing
    const promptText = `
      You are an expert ATS (Applicant Tracking System) and career coach. 
      Analyze the following resume and provide a detailed analysis in JSON format.
      ${resumeText ? `\nResume Text:\n${resumeText}\n` : ''}
      
      Job Description (if provided):
      ${jobDescription}
      
      The JSON response MUST follow this structure:
      {
        "personalInfo": {
          "name": "string",
          "email": "string",
          "phone": "string",
          "location": "string"
        },
        "summary": "string",
        "scores": {
          "overall": number (0-100),
          "atsCompatibility": number (0-100),
          "skillRelevance": number (0-100),
          "experienceStrength": number (0-100),
          "formatting": number (0-100)
        },
        "sections": {
          "skills": ["string"],
          "education": [{"institution": "string", "degree": "string", "year": "string"}],
          "experience": [{"company": "string", "role": "string", "duration": "string", "description": "string"}],
          "projects": [{"name": "string", "description": "string"}],
          "certifications": ["string"]
        },
        "analysis": {
          "strengths": ["string"],
          "weaknesses": ["string"],
          "suggestions": ["string"],
          "missingKeywords": ["string"],
          "actionVerbImprovements": [{"original": "string", "suggested": "string"}]
        },
        "jobMatch": {
          "matchPercentage": number (0-100),
          "missingSkills": ["string"],
          "recommendedSkills": ["string"]
        }
      }
      
      Ensure the JSON is valid and strictly follows the schema.
    `;

    const contents = filePart ? [filePart, promptText] : promptText;

    const response = await ai.models.generateContent({
      model: model,
      contents: contents as any,
      config: {
        responseMimeType: "application/json",
      },
    });

    const analysisResult = JSON.parse(response.text || "{}");

    // Save to history
    const stmt = db.prepare("INSERT INTO analysis_history (filename, score, analysis_json) VALUES (?, ?, ?)");
    stmt.run(req.file.originalname, analysisResult.scores.overall, JSON.stringify(analysisResult));

    res.json(analysisResult);
  } catch (error: any) {
    console.error("Analysis error:", error);
    res.status(500).json({ error: "Failed to analyze resume: " + error.message });
  }
});

app.get("/api/history", (req: any, res: any) => {
  try {
    const history = db.prepare("SELECT * FROM analysis_history ORDER BY timestamp DESC LIMIT 10").all();
    res.json(history.map((h: any) => ({
      ...h,
      analysis: JSON.parse(h.analysis_json)
    })));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
