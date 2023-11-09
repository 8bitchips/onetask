import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import searchUsers from '@wasp/actions/searchUsers';
import getUserDataset from '@wasp/queries/getUserDataset';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: users, isLoading, error } = useQuery(getUserDataset, { searchQuery });
  const searchUsersFn = useAction(searchUsers);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleSearch = () => {
    searchUsersFn({ searchQuery });
  };

  return (
    <div className='p-4'>
      <h1 className='text-4xl font-bold mb-4'>Welcome to the User Directory!</h1>
      <input
        type='text'
        placeholder='Search'
        className='border rounded py-2 px-4 mb-4'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Search
      </button>
      <div className='mt-4'>
        {users.map((user) => (
          <div
            key={user.id}
            className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
          >
            <div>{user.username}</div>
            <div>{user.nationality}</div>
            <div>
              <Link
                to={`/user/${user.id}`}
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;