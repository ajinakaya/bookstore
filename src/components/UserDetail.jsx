import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import '..css/userDetail';
const UserDetail = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/user/${id}`)
    .then(res => {
      setUser(res.data);
    })
    .catch(error => {
      console.error('Error fetching user:', error);
    });
}, [id]);

if (!user) {
  return <p>Loading...</p>;
}

  return (
    <div>
      <h1>User Detail</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      {/* Add other user details as needed */}
    </div>
  );
};

export default UserDetail;
