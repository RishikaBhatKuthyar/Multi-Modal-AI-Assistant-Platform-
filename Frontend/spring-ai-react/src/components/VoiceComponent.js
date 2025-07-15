import React from "react";
import { useState } from "react";
import axios from "axios";

const VoiceComponent = () => {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await axios.post("http://localhost:8080/transcribe", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setTranscription(response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
            setTranscription("Error transcribing audio");
        }
    };

  return (
    <div className="voice-component-container">
    <div className="voice-component">
      <h2>Audio Transcriber</h2>

      <div className="file-input">
        <input
          type="file" accept="audio/*" onChange={handleFileChange}
        />
      </div>
      <button className="upload-button" onClick={handleUpload}>Upload and Transcribe</button>
      <div className="transcription-result">
        <h2>Audio to Text:</h2>
        <p>{transcription}</p>
        </div>
      </div>

    </div>
  );
}


export default VoiceComponent;