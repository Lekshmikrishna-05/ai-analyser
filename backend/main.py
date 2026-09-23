from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile, File, Form
import fitz 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to AI Resume Analyzer"
    }

@app.post("/analyze")
async def analyze(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    pdf_bytes = await resume.read()
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()

    print(text)

    skills = [
        "Python",
        "React",
        "FastAPI",
        "Docker",
        "Git",
        "SQL",
        "Machine Learning"
    ]

    matched_skills = []
    missing_skills = []

    for skill in skills:
        if skill in text:
            matched_skills.append(skill)
        else:
            missing_skills.append(skill)

    suggestions = []
    if missing_skills:
        skills_str = ", ".join(missing_skills)
        suggestions.append(f"Consider gaining hands-on experience or taking targeted courses in missing skill areas: {skills_str}.")
        suggestions.append("Tailor your resume bullet points to include projects or tools relevant to the job requirements.")
    else:
        suggestions.append("Excellent match! Your resume covers all key required skills.")

    if matched_skills:
        suggestions.append(f"Strong match for {len(matched_skills)} key skill(s): {', '.join(matched_skills)}. Highlight these prominently in your summary section.")

    return {
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "suggestions": suggestions,
        "job_description": job_description
    }