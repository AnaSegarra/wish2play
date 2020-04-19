import React, { useState, useEffect, useContext } from 'react';
import { fetchFriends, fetchUsers } from '../../services/usersService';
import { User } from '../../components/UserItem';
import { AuthContext } from '../../contexts/authContext';
import Pagination from '@material-ui/lab/Pagination';

export const FriendsList = () => {
  const { user, setUser } = useContext(AuthContext);
  const [friends, setFriends] = useState('');
  const [totalNumFriends, setTotalFriends] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await fetchFriends();
      console.log(response);
      setFriends(response.friends);
      setTotalFriends(response.totalFriends);
    })();
  }, [user]);

  const paginate = async (e, page) => {
    const { friends } = await fetchFriends(page);
    console.log('change to page', page);
    setFriends(friends);
    setCurrentPage(page);
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
      <Pagination count={Math.ceil(totalNumFriends / 4)} onChange={paginate} page={currentPage} />
    </div>
  );
};

export const UsersList = () => {
  const { user, setUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [totalNumUsers, setTotalUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await fetchUsers();
      setUsers(response.users);
      setTotalUsers(response.total);
    })();
  }, [user]);

  const handleSearch = async e => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    const response = await fetchUsers(searchTerm);
    setUsers(response);
  };

  const paginate = async (e, page) => {
    const response = await fetchUsers(search, page);
    console.log('change to page', page);
    setUsers(response.users);
    setCurrentPage(page);
  };
  return (
    <div>
      <p>Find more</p>
      <input type="text" onChange={handleSearch} value={search} />
      {users.length === 0 ? (
        <p>No results found</p>
      ) : (
        users.map(user => {
          return <User key={user._id} user={user} setUser={setUser} />;
        })
      )}
      <Pagination count={Math.ceil(totalNumUsers / 4)} onChange={paginate} page={currentPage} />
    </div>
  );
};
