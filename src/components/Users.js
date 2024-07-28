import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUsersRequest,
  addUserRequest,
  updateUserRequest,
  deleteUserRequest
} from '../redux/actions/userActions';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  const loading = useSelector(state => state.user.loading);
  const error = useSelector(state => state.user.error);

  const [userForm, setUserForm] = useState({ id: '', name: '', email: '' });

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleAddUser = () => {
    dispatch(addUserRequest({...userForm,id:users.length+1}));
    setUserForm({ id: '', name: '', email: '' });
  };
  const handleUpdateUser = () => {
    dispatch(updateUserRequest(userForm));
    setUserForm({ id: '', name: '', email: '' });
  };
  
  const handleDeleteUser = id => {
    dispatch(deleteUserRequest(id));
  };
  
  return (
    <div>
      <h2>Users</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => setUserForm(user)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>{userForm.id ? 'Update User' : 'Add User'}</h3>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userForm.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userForm.email}
          onChange={handleChange}
        />
        {userForm.id ? (
          <button type="button" onClick={handleUpdateUser}>
            Update
          </button>
        ) : (
          <button type="button" onClick={handleAddUser}>
            Add
          </button>
        )}
      </form>
    </div>
  );
  };
  
  export default Users;
  

