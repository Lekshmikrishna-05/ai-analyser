function Result({ result }) {
  if (!result) {
    return null;
  }

  const matchedSkills = result.matched_skills || [];
  const missingSkills = result.missing_skills || [];
  const suggestions = result.suggestions || [
    ...(missingSkills.length > 0
      ? [
          `Focus on acquiring or highlighting experience in: ${missingSkills.join(", ")}.`,
          `Update your resume with relevant projects or coursework for missing skill keywords.`
        ]
      : ["Your resume matches all key skill requirements!"]),
    ...(matchedSkills.length > 0
      ? [`Emphasize your proficiency in ${matchedSkills.join(", ")} prominently in your resume.`]
      : [])
  ];

  return (
    <div className="result-container">
      <div className="skills-grid">
        {/* Left Side: Matched Skills */}
        <div className="skills-column matched-column">
          <div className="column-header">
            <span className="column-icon">✅</span>
            <h3>Matched Skills</h3>
            <span className="skill-count matched-count">{matchedSkills.length}</span>
          </div>
          <div className="skills-list">
            {matchedSkills.length > 0 ? (
              matchedSkills.map((skill, index) => (
                <div key={index} className="skill-item matched-item">
                  <span className="check-icon">✓</span>
                  <span>{skill}</span>
                </div>
              ))
            ) : (
              <p className="no-skills">No matched skills found.</p>
            )}
          </div>
        </div>

        {/* Right Side: Unmatched Skills */}
        <div className="skills-column unmatched-column">
          <div className="column-header">
            <span className="column-icon">❌</span>
            <h3>Unmatched Skills</h3>
            <span className="skill-count unmatched-count">{missingSkills.length}</span>
          </div>
          <div className="skills-list">
            {missingSkills.length > 0 ? (
              missingSkills.map((skill, index) => (
                <div key={index} className="skill-item unmatched-item">
                  <span className="cross-icon">✕</span>
                  <span>{skill}</span>
                </div>
              ))
            ) : (
              <p className="no-skills">All skills matched!</p>
            )}
          </div>
        </div>
      </div>

      {/* Suggestions Below */}
      <div className="suggestions-section">
        <div className="suggestions-header">
          <span className="suggestion-icon">💡</span>
          <h3>Suggestions & Recommendations</h3>
        </div>
        <ul className="suggestions-list">
          {suggestions.map((item, index) => (
            <li key={index} className="suggestion-item">
              <span className="bullet-point">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Result;