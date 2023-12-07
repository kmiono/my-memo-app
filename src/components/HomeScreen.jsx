import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MemoListItem from './MemoListItem';
import {
  getSortedMemos,
  searchMemos,
  deleteMemoById,
} from '../services/searchService';

import * as sortService from '../services/sortService';

function HomeScreen() {
  const [memoList, setMemoList] = useState([]);
  const [sortOption, setSortOption] = useState('date');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state

        const sortedMemos = getSortedMemos(sortOption);

        let sortedAndFilteredMemos;
        if (sortOption === 'date') {
          sortedAndFilteredMemos = searchMemos(
            sortService.sortByDateAsc(sortedMemos),
            searchQuery
          );
        } else {
          sortedAndFilteredMemos = searchMemos(
            sortService.sortByTitleAsc(sortedMemos),
            searchQuery
          );
        }

        setMemoList(sortedAndFilteredMemos);
      } catch (error) {
        console.error('Error fetching or updating memo list:', error);
        setError('Error fetching memo list. Please try again.'); // Set error state
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sortOption, searchQuery]);

  const handleDeleteMemo = async (memoId) => {
    try {
      await deleteMemoById(memoId);

      setMemoList((prevMemoList) =>
        prevMemoList.filter((memo) => memo.id !== memoId)
      );
    } catch (error) {
      console.error('Error deleting memo:', error);
      // You may set an error state here if needed
    }
  };

  const handleSearch = () => {
    // Trigger a refetch with the updated searchQuery
    fetchData();
  };

  return (
    <div>
      {/* List of Memo Titles */}
      <ul>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          memoList.map((memo) => (
            <MemoListItem
              key={memo.id}
              memo={memo}
              onDelete={() => handleDeleteMemo(memo.id)}
            />
          ))
        )}
      </ul>

      {/* "Create New Memo" Button */}
      <Link to="/create">
        <button>Create New Memo</button>
      </Link>

      {/* "Sort by Date" and "Sort by Title" Options */}
      <div>
        <label>Sort by:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}>
          <option value="date">Date</option>
          <option value="title">Title</option>
        </select>
      </div>

      {/* "Search" Option */}
      <div>
        <label>Search:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default HomeScreen;
