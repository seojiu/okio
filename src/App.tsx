import Home from 'older/pages/Home';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Younger from 'younger/pages/YoungerThan50';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Image} />
        <Route path="/older_than_50" component={Home} />
        <Route path="/younger_than_50" component={Younger} />
        {/* Add more routes for other pages if needed */}
      </Switch>
    </Router>
  );
}

function Image() {
  const [response, setResponse] = useState<any>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const res = await fetch('/predict', { method: 'POST', body: formData });
      const result = await res.json();
      console.log(result);
      setResponse(result);

      if (result && result.Predictions) {
        const predictionLabel = result.Predictions[0].Label; // Assuming there's only one prediction
        if (predictionLabel === "50대 이상") {
          window.location.href = "/older_than_50"; // Redirect to older_than_50 page
        }else if (predictionLabel === "50대 이하") {
          window.location.href = "/younger_than_50"; // Redirect to older_than_50 page
        }
      }

    } catch (error) {
      console.error("Error uploading the image:", error);
    }
  };

  let content;
  if (response && response.Predictions) {
    content = (
      <div>
        <h2>Age Prediction Results:</h2>
        <ul>
          {response.Predictions.map((prediction: any, index: number) => (
            <li key={index}>
              Label ID: {prediction['Label ID']} | Label: {prediction.Label} | Confidence: {prediction.Confidence}
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    content = (
      <div>
        <h1 style={{ fontSize: '3em', fontFamily: 'Jeju Gothic', position: 'absolute', top: '80px', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
          나이 분류
        </h1>
        <div className="upload-container">
          <label className="upload-label" htmlFor="upload-input">
            <br />
            <br />
            <br />
            <br />
            Click to upload an image
          </label>
          <input type="file" id="upload-input" className="upload-input" accept="image/*" onChange={handleImageUpload} />
        </div>
      </div>
    );
  }

  return <div className="App">{content}</div>;
}

function YoungerThan50() {
  return (
    <div className="App">
      <h1>You are younger than 50</h1>
    </div>
  );
}
