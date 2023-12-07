// src/components/MemoListItem.js
import React from 'react';

const MemoListItem = ({ memo, onDelete }) => {
  const handleDeleteClick = () => {
    // Display a confirmation prompt
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this memo?'
    );
    // If the user confirms, call the onDelete function with memo ID
    if (isConfirmed && onDelete) {
      onDelete(memo.id);
    }
  };

  return (
    <li>
      <div>
        <h3>{memo.title}</h3>
        <p>{memo.content}</p>
      </div>
      <button onClick={handleDeleteClick}>Delete</button>
    </li>
  );
};

export default MemoListItem;
