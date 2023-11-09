import React, { useState } from 'react';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import searchUsers from '@wasp/actions/searchUsers';
import getUserDataset from '@wasp/queries/getUserDataset';

export function Search() {
  const [query, setQuery] = useState('');
  const [nationality, setNationality] = useState('');

  const { data: searchResults, isLoading, error } = useQuery(searchUsers, { query, nationality });
  const { data: userDataset } = useQuery(getUserDataset, { userId: 1, pageNumber: 1 });

  const handleSearch = () => {
    // Perform search
  };

  return (
    <div className='p-4'>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='Search'
          className='px-1 py-2 border rounded text-lg'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className='px-1 py-2 border rounded text-lg'
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        >
          <option value=''>All Nationalities</option>
          <option value='GB'>GB</option>
          <option value='US'>US</option>
          <option value='ES'>ES</option>
        </select>
        <button
          onClick={handleSearch}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Search
        </button>
      </div>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        'Error: ' + error
      ) : (
        <div>
          {searchResults.map((result) => (
            <div
              key={result.id}
              className='p-4 bg-gray-100 rounded-lg mb-4'
            >
              <img
                src={result.profilePicture}
                alt={result.username}
                className='w-16 h-16 rounded-full'
              />
              <div>{result.username}</div>
              <div>{result.nationality}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}