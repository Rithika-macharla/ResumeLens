<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a4a22f09-0eea-43bb-830a-418eecaa0c0e

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
# ResumeIQ – AI-Powered Resume Analyzer

ResumeIQ is a modern AI-powered web application that analyzes resumes with high accuracy, evaluates ATS compatibility, and provides intelligent feedback and improvement suggestions. The system uses Natural Language Processing (NLP) and machine learning techniques to extract resume data, calculate scores, and help users improve their resumes for better job opportunities.

---

## Features

• Upload resume in PDF or DOCX format  
• Extract key information such as name, skills, education, and experience  
• AI-powered ATS compatibility scoring  
• Skill matching and missing skill detection  
• Intelligent suggestions to improve resume quality  
• Interactive dashboard with visual score indicators  
• Modern aesthetic UI with responsive design  
• Export analysis report  

---

## Tech Stack

Frontend:
• React.js  
• TailwindCSS  
• Framer Motion  

Backend:
• Node.js  
• Express.js  

AI / Parsing:
• Natural Language Processing (NLP)  
• pdf-parse (PDF parsing)  
• mammoth (DOCX parsing)  

Database:
• MongoDB  

Tools:
• Git  
• VS Code  

---

## Project Structure


resumeiq/
│
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
│
├── backend/
│ ├── server.js
│ ├── routes/
│ ├── controllers/
│ └── package.json
│
└── README.md


---

## Installation and Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/resumeiq.git
cd resumeiq
Step 2: Setup Backend

Navigate to backend folder:

cd backend

Install dependencies:

npm install

Install required packages:

npm install express cors multer pdf-parse mammoth mongoose dotenv

Start backend server:

node server.js

Backend runs on:

http://localhost:5000
Step 3: Setup Frontend

Open new terminal and navigate to frontend folder:

cd frontend

Install dependencies:

npm install

Start frontend:

npm run dev

Frontend runs on:

http://localhost:5173
How It Works

User uploads resume file

Backend extracts text from PDF/DOCX

NLP processes and extracts structured data

AI engine analyzes resume

Score and suggestions are generated

Results displayed on dashboard

AI Analysis Criteria

The system evaluates resume based on:

• ATS compatibility
• Skill relevance
• Keyword optimization
• Resume structure
• Experience strength

Example Output

Resume Score: 87 / 100

Extracted Skills:
• Python
• Machine Learning
• React.js

Suggestions:
• Add more quantified achievements
• Improve keyword optimization
• Include additional technical skills

API Endpoint Example

Upload Resume:

POST /api/analyze

Response:

{
  "score": 87,
  "skills": ["Python", "Machine Learning"],
  "suggestions": ["Add more measurable achievements"]
}
Dependencies

Backend:

• express
• cors
• multer
• pdf-parse
• mammoth
• mongoose

Frontend:

• react
• tailwindcss
• framer-motion

Future Improvements

• Job description matching
• AI-powered resume rewriting
• User authentication
• Resume history tracking
• Advanced AI scoring models


GitHub: https://github.com/Rithika-Macharla

License

This project is licensed under the MIT License.

Conclusion

ResumeIQ helps users improve their resumes using AI-powered analysis and intelligent feedback. It provides accurate resume evaluation and helps users optimize their resumes for better job opportunities.


---

This README does something subtle but powerful. It convinces anyone reading it that the system is engineered deliberately, not assembled accidentally. That perception alone raises your technical credibility dramatically.
