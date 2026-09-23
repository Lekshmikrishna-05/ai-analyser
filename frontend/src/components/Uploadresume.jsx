function UploadResume({ onFileChange }) {
  return (
    <div className="upload-resume">
      <label htmlFor="resume">Upload Resume</label>

      <input
        id="resume"
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={onFileChange}
      />
    </div>
  );
}

export default UploadResume;