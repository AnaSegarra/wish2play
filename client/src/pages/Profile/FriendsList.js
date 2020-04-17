import React, { useState, useEffect, useContext } from 'react';
import { fetchFriends, fetchUsers } from '../../services/usersService';
import { User } from '../../components/UserItem';
import { AuthContext } from '../../contexts/authContext';

export const FriendsList = () => {
  const { user, setUser } = useContext(AuthContext);
  const [friends, setFriends] = useState('');
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      const friendsRetrieved = await fetchFriends();
      setFriends(friendsRetrieved);

      const usersRetrieved = await fetchUsers();
      setUsers(usersRetrieved);
    })();
  }, [user]);

  const handleSearch = async e => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    const response = await fetchUsers(searchTerm);
    setUsers(response);
  };

  return (
    <div>
      <p>Friends</p>
      {friends.length === 0 ? (
        <p>You don't have any friends yet</p>
      ) : (
        friends.map(friend => {
          return <User key={friend._id} user={friend} setUser={setUser} type="friends" />;
        })
      )}

      <p>Find more</p>
      <input type="text" onChange={handleSearch} value={search} />
      {users.length === 0 ? (
        <p>No results found</p>
      ) : (
        users.map(user => {
          return <User key={user._id} user={user} setUser={setUser} />;
        })
      )}
    </div>
  );
};
