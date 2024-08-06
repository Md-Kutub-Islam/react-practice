import { useEffect, useRef, useState } from "react";
import "./App.css";
import Pill from "./componenet/Pill";

function App() {
  const [searchterm, setSearchterm] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());
  const inputRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      if (searchterm.trim() === "") return setSuggestion("");

      await fetch(`https://dummyjson.com/users/search?q=${searchterm}`)
        .then((res) => res.json())
        .then((data) => setSuggestion(data))
        .catch((error) => console.log(error));
    };
    fetchUser();
  }, [searchterm]);
  // console.log(suggestion);

  const handleSelectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchterm("");
    setSuggestion([]);
    inputRef.current.focus();
  };

  const handleRemoveUser = (user) => {
    const updatedUsers = selectedUsers.filter(
      (selectedUser) => selectedUser.id !== user.id
    );
    setSelectedUsers(updatedUsers);

    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);
    setSelectedUserSet(updatedEmails);
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedUsers.length > 0
    ) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleRemoveUser(lastUser);
      setSuggestion([]);
    }
  };

  console.log("select", selectedUserSet);

  return (
    <div className="user-search-container">
      <div className="user-search-input">
        {/* Pills */}
        {selectedUsers &&
          selectedUsers.map((user) => (
            <Pill
              key={user.email}
              image={user.image}
              text={`${user.firstName} ${user.lastName}`}
              onClick={() => handleRemoveUser(user)}
            />
          ))}
        {/* input feild with search suggestions */}
        <div>
          <input
            ref={inputRef}
            type="text"
            value={searchterm}
            onChange={(e) => setSearchterm(e.target.value)}
            placeholder="Search for a user..."
            onKeyDown={handleKeyDown}
          />
          {/* Search suggestion */}
          <ul className="suggestions-list">
            {suggestion &&
              suggestion?.users?.map((user, index) =>
                !selectedUserSet.has(user.email) ? (
                  <li key={user.email} onClick={() => handleSelectUser(user)}>
                    <img
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                  </li>
                ) : (
                  <></>
                )
              )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
