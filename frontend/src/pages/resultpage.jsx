import { useLocation, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Result from "../components/result";
import Footer from "../components/Footer";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result;

  if (!result) {
    return (
      <div className="container">
        <Header
          title="Analysis Result"
          subtitle="No analysis result found"
        />

        <p>
          Please analyze a resume first.
        </p>

        <button onClick={() => navigate("/")}>
          Go to Home
        </button>

        <Footer />
      </div>
    );
  }

  return (
    <div className="container">
      <Header
        title="Analysis Result"
        subtitle="Your resume analysis"
      />

      <Result result={result} />

      <button onClick={() => navigate("/")}>
        Analyze Another Resume
      </button>

      <Footer />
    </div>
  );
}

export default ResultPage;