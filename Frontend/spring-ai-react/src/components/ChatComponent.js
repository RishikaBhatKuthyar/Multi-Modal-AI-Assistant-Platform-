import React from "react";
import { useState } from "react";   

function ChatComponent(){
    const[prompt, setPrompt] = useState('');
    const[response, setChatResponse] = useState('');

    const askAI = async () => {
       try{
        const response=await fetch(`http://localhost:8080/ask-ai?prompt=${encodeURIComponent(prompt)}`);
        const data= await response.text();
        console.log("AI response:", data);
        setChatResponse(data);
       } catch(error){
        console.error("Error asking AI:", error);       }
    };

    return(
        <div className="chat-container">
            <h2>Talk to AI</h2>
            <input type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a prompt" />
            <button onClick={askAI}>Ask AI</button>
            <div className="chat-response">
               <p>{response}</p>
            </div>
        </div>
    );
}

export default ChatComponent;