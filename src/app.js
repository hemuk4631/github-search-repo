import React, { useState } from "react";
import "./styles.css";
import axios from "axios";

function App() {
  const [api, setApi] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [checked, setChecked] = useState(false);
  const [username, setUsername] = useState("");
  const handelSubmit = async () => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      setApi(data);
    } catch (error) {
      setApi([]);
      setErrorMsg(error.response.data.message);
    }
  };

  return (
    <div className="App">
      <div className="input">
        <label htmlFor="username">Github username: </label>
        <input
          id="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="fork">Include forks: </label>
        <input
          id="fork"
          type="checkbox"
          onChange={(e) => setChecked(e.target.checked)}
        />
        {username.length === 0 ? (
          <button disabled onClick={handelSubmit}>
            Submit
          </button>
        ) : (
          <button onClick={handelSubmit}>Submit</button>
        )}
      </div>
      {api.length !== 0 ? (
        <section>
          <header>
            <div className="col">Name</div>
            <div className="col">Language</div>
            <div className="col">Description</div>
            <div className="col">Size</div>
          </header>
          {api
            .sort((a, b) => b.size - a.size)
            .filter((data) => (checked ? data : data.fork === false))
            .map((user) => (
              <div key={user.id}>
                <div className="col">{user.name}</div>
                <div className="col">{user.language}</div>
                <div className="col">{user.description}</div>
                <div className="col">{user.size}</div>
              </div>
            ))}
        </section>
      ) : (
        <div className="error">{errorMsg}</div>
      )}
    </div>
  );
}

export default App;
