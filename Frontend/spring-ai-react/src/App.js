import React,{useState} from 'react';
import './App.css';
import ImageGenerator from './components/ImageGenerator';
import ChatComponent from './components/ChatComponent';
import RecipeGenerator from './components/RecipeGenerator';
import VoiceComponent from './components/VoiceComponent';
function App() {
  const [activeTab, setActiveTab] = useState('image-generator');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
<div className="App">
  <div className="tab-buttons">
    <button
      className={activeTab === 'image-generator' ? 'active' : ''}
      onClick={() => handleTabChange('image-generator')}
    >
      Image Generator
    </button>
    <button
      className={activeTab === 'chat' ? 'active' : ''}
      onClick={() => handleTabChange('chat')}
    >
      Chat
    </button>
    <div className="voice-component">
      <button
        className={activeTab === 'voice-component' ? 'active' : ''}
        onClick={() => handleTabChange('voice-component')}
      >
        Audio Transcriber
      </button>
    </div>
    <button
      className={activeTab === 'recipe-generator' ? 'active' : ''}
      onClick={() => handleTabChange('recipe-generator')}
    >
      Recipe Generator
    </button>
  </div>

  <div>
    {activeTab === 'image-generator' && <ImageGenerator/>}
    {activeTab === 'chat' && <ChatComponent />}
    {activeTab === 'voice-component' && <VoiceComponent/>}
    {activeTab === 'recipe-generator' && <RecipeGenerator />}
  </div>
</div>

  );
} 

export default App;
