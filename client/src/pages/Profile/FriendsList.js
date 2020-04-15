import React, { useState, useEffect, useContext } from 'react';
import { fetchFriends, searchFriends, addFriend, removeFriend } from '../../services/usersService';
import { UsersList } from '../../components/UsersList';
import { AuthContext } from '../../contexts/authContext';

export const FriendsList = () => {
  const { user, setUser } = useContext(AuthContext);
  const [friends, setFriends] = useState('');
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      // console.log(user);
      const friendsRetrieved = await fetchFriends();
      setFriends(friendsRetrieved);

      const usersRetrieved = await searchFriends();
      setUsers(usersRetrieved);
    })();
  }, [user]);

  const handleSearch = async e => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    const response = await searchFriends(searchTerm);
    setUsers(response);
  };
  const handleNewFriend = async userID => {
    const userUpdated = await addFriend(userID);
    setUser(userUpdated);
    setSearch('');
  };

  const handleRemoveFriend = async userID => {
    const userUpdated = await removeFriend(userID);
    setUser(userUpdated);
    setSearch('');
  };

  return (
    <div>
      <p>Friends</p>
      {friends.length === 0 ? (
        <p>You don't have any friends yet</p>
      ) : (
        <UsersList list={friends} handleRemoveFriend={handleRemoveFriend} />
      )}

      <p>Find more</p>
      <input type="text" onChange={handleSearch} value={search} />
      {users.length === 0 ? (
        <p>No results found</p>
      ) : (
        <>
          <UsersList
            list={users}
            type="users"
            handleNewFriend={handleNewFriend}
            friends={friends}
          />
        </>
      )}
    </div>
  );
};
