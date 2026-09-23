import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Uploadresume from "../components/Uploadresume";
import Jobdescription from "../components/Jobdescription";
import AnalyzeButton from "../components/Analyzebutton";
import Footer from "../components/Footer";

function Home() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const navigate = useNavigate();

  function handleFileChange(event) {
    const file = event.target.files[0];
    setResumeFile(file);
  }

  async function handleAnalyze() {
    if (!resumeFile) {
      alert("Please upload your resume");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter the job description");
      return;
    }

    const formData = new FormData();

    formData.append("resume", resumeFile);
    formData.append("job_description", jobDescription);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();

      console.log(data);

      navigate("/result", {
        state: {
          result: data,
        },
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong while analyzing the resume.");
    }
  }

  return (
    <div className="container">
      <Header
        title="AI Resume Analyzer"
        subtitle="Analyze your resume using AI"
      />

      <Uploadresume onFileChange={handleFileChange} />

      {resumeFile && (
        <p>Selected File: {resumeFile.name}</p>
      )}

      <Jobdescription
        value={jobDescription}
        onChange={(event) => setJobDescription(event.target.value)}
      />

      <AnalyzeButton onClick={handleAnalyze} />

      <Footer />
    </div>
  );
}

export default Home;