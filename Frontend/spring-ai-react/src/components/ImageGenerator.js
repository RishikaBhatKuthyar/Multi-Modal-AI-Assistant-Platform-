import React,{useState} from "react";

function ImageGenerator() {
    const [prompt, setPrompt] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const generateImage = async () => {
  try {
    const response = await fetch(
      `http://localhost:8080/gen-images?prompt=${encodeURIComponent(prompt)}`
    );
    const data = await response.json(); 
    console.log("Generated response:", data);

    const urls = Array.isArray(data)
      ? data
      : Array.isArray(data.urls)
      ? data.urls
      : [data.urls ?? data];

    console.log("Parsed image URLs:", urls);
    setImageUrls(urls);
  } catch (error) {
    console.error("Error generating image:", error);
    setImageUrls([]); 
  }
};

  return (
    <div className="tab-content">
      <h2>Generate Image</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt for image"
      />
      <button onClick={generateImage}>Generate Image</button>

      <div className="image-grid">
        {imageUrls.map((url, index) => (
           <img key={index} src={url} alt={`Generated ${index}`} />
        ))}
        {[...Array(4-imageUrls.length)].map((_, index) => (
            <div key={index + imageUrls.length} 
                className="empty-image-slot"></div>
        ))}
      </div>
    </div>
  );
}

export default ImageGenerator;
