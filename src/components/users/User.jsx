import React, { useEffect, useState } from "react";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios("http://localhost:5000/users").then((data) => setUsers(data.data));
  }, []);
  return (
    <div>
      {users.map((user) => (
        <div>
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
};

export default User;
