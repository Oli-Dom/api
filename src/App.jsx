/* eslint-disable no-unused-vars */
import React, { useState } from 'react'; // Import React from 'react'
import './App.css';

function App() {
  const [currentImage, setCurrentImage] = useState(null);
  const [attributes, setAttributes] = useState([]);
  const [bannedAttributes, setBanned] = useState([]);

  let query =
    'https://api.thedogapi.com/v1/images/search? has_breeds=1&api_key=live_unU3IEb900DmzDIZr8yIdrogsuxNf0r41pZCJCro7ZDUKiSSpGTSyovDuPN2o4RC';

  const callAPI = async () => {
    try {
      const response = await fetch(query); // Send a request to the API
      const json = await response.json(); // Parse the JSON response

      // Check if the API response contains a valid URL
      if (
        json[0] &&
        json[0].breeds.length > 0 &&
        json[0].breeds[0].bred_for != null
      ) {
        setCurrentImage(json[0].url); // Set the currentImage state with the returned image URL
        console.log(json);
        setAttributes([
          json[0].breeds[0].bred_for,
          json[0].breeds[0].life_span,
          json[0].breeds[0].name,
        ]);
      } else {
        callAPI();
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  };

  // Function to handle button click for a specific attribute
  const handleAttributeClick = (attribute) => {
    // Handle the click event for the selected attribute
    setBanned([...bannedAttributes, attribute]);
  };

  return (
    <div className="content-container">
      <div className="result-container">
        <h2>Veni Vici!</h2>
        <h3>
          Discover the dogs that roam the Earth. You can select an attribute to
          ban it
        </h3>
        <br />
        <br />
        <div className="button-container">
          {/* Mapping over attributes and generating buttons */}
          {attributes.map((attribute, index) => (
            <button key={index} onClick={() => handleAttributeClick(attribute)}>
              {attribute}
            </button>
          ))}
        </div>
        <img src={currentImage} alt="Dog" />
        <button onClick={callAPI}>Show me da dog</button>
      </div>

      <div className="ban-container">
        <h3>Below are the banned attributes</h3>
        {/* Mapping over attributes and generating text*/}
        {bannedAttributes.map((bannedAttribute, index) => (
          <h2 key={index} onClick={() => handleAttributeClick(bannedAttribute)}>
            {bannedAttribute}
          </h2>
        ))}
      </div>
    </div>
  );
}

export default App;
