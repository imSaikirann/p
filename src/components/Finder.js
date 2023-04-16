import React, { useState } from "react";


function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setError(null);
        
      } else if(username=="") {
        setError("Enter deatils")
      } else {
        
        setUserData(null);
        setError("User not found");
      }
    } catch (error) {
      setUserData(null);
      setError("Something went wrong. Please try again later.");
    }
  };

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="con">
      <h1>GitHub User Finder</h1>
      <div className="inputF">
        <input type="text" placeholder="Enter username" value={username} onChange={handleInputChange} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="errorMsg">{error}</p>}
      {userData && (
        <div className="userD">
                  <div className="userDH">
                      <img src={userData.avatar_url} alt="User avatar" />
                      <div className="details">
                          <h2>{userData.name}</h2>
                          <p>{userData.bio}</p>
                          
                      </div>
                  </div>
          
           <a href={userData.html_url} target="_blank" rel="noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default App;