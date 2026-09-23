function Jobdescription({ value, onChange }) {
  return (
    <div>
      <h2>Job Description</h2>

      <textarea
        rows="8"
        cols="50"
        placeholder="Paste the job description here..."
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
}

export default Jobdescription;