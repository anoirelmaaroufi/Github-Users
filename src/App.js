import React, { useState, useEffect } from "react";
import axios from "./axios";
import github from "./github.png";
import User from "./User";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserInfoPerson from "./UserInfoPerson";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("users")
        .then((response) => setUsers(response.data))
        .catch((error) => setError(error.message));
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (username) {
      const fetchUser = async () => {
        await axios
          .get(`users/${username}`)
          .then((response) => setUser(response.data))
          .catch((error) => setError(error.message));
      };
      fetchUser();
    } else {
      setUser(null);
    }
  };

  return (
    <Router>
      <div className="app">
        <Route exact path="/">
          <header className="app__header">
            <img src={github} alt="github" className="app__logo" />
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search A User..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </form>
          </header>
          <div className="app__users">
            <div className="users">
              {!user ? (
                users.map((user) => <User user={user} />)
              ) : !error ? (
                <User key={user.id} user={user} />
              ) : (
                <h1>{error}</h1>
              )}
            </div>
          </div>
        </Route>
        <Route path={`/:login`} children={<UserInfoPerson />}></Route>
      </div>
    </Router>
  );
}

export default App;
