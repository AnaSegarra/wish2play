// dependencies
import React, { useState, useEffect, useContext } from 'react';
import Pagination from '@material-ui/lab/Pagination';

// local modules
import { fetchFriends, fetchUsers } from '../../services/usersService';
import { User } from '../../components/UserItem';
import { AuthContext } from '../../contexts/authContext';

// styled components
import { Input } from '../../styles/Form';
import { PeopleContainer } from '../../styles/Profile.styled';
import { StyledPagination } from '../../styles/Games.styled';

export const FriendsList = () => {
  const { user, setUser } = useContext(AuthContext);
  const [friends, setFriends] = useState();
  const [totalNumFriends, setTotalFriends] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await fetchFriends();
      setFriends(response.friends);
      setTotalFriends(response.totalFriends);
    })();
  }, [user]);

  const paginate = async (e, page) => {
    const { friends } = await fetchFriends(page);
    setFriends(friends);
    setCurrentPage(page);
  };

  if (!friends) return <></>;

  return (
    <PeopleContainer>
      <p className="friends">Friends</p>
      {friends.length === 0 ? (
        <p>You don't have any friends yet</p>
      ) : (
        friends.map(friend => {
          return <User key={friend._id} user={friend} setUser={setUser} type="friends" />;
        })
      )}
      {totalNumFriends > 0 && (
        <StyledPagination
          count={Math.ceil(totalNumFriends / 4)}
          onChange={paginate}
          page={currentPage}
          size="small"
        />
      )}
    </PeopleContainer>
  );
};

export const UsersList = () => {
  const { user, setUser } = useContext(AuthContext);
  const [users, setUsers] = useState();
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

    const { users, total } = await fetchUsers(searchTerm);
    setUsers(users);
    setTotalUsers(total);
  };

  const paginate = async (e, page) => {
    const { users } = await fetchUsers(search, page);
    setUsers(users);
    setCurrentPage(page);
  };

  if (!users) return <></>;

  return (
    <PeopleContainer>
      <Input type="text" onChange={handleSearch} value={search} placeholder="Find friends..." />
      {users.length === 0 ? (
        <p>No results found</p>
      ) : (
        users.map(user => {
          return <User key={user._id} user={user} setUser={setUser} />;
        })
      )}
      <StyledPagination
        count={Math.ceil(totalNumUsers / 4)}
        onChange={paginate}
        page={currentPage}
        size="small"
      />
    </PeopleContainer>
  );
};
