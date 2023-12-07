// src/components/MemoDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function MemoDetailsScreen() {
  const history = useHistory();

  const [memoDetails, setMemoDetails] = useState({
    title: '',
    content: '',
  });

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isChanged) {
        const message =
          'You have unsaved changes. Are you sure you want to leave?';
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isChanged]);

  const handleMemoChange = (e) => {
    const { name, value } = e.target;
    setMemoDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    setIsChanged(true);
  };

  const handleSave = () => {
    // Implement the logic to update memoDetails on the backend (e.g., MongoDB)
    // For simplicity, let's assume a fetch request to update an existing memo
    fetch(`/api/memos/${memoId}`, {
      method: 'PUT', // Assuming you use PUT for updating existing resources
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memoDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Memo updated:', data);
        setIsChanged(false);
        history.push('/');
      })
      .catch((error) => {
        console.error('Error updating memo:', error);
        // Handle error, e.g., show a user-friendly message
      });
  };

  const handleDiscard = () => {
    if (window.confirm('Discard changes?')) {
      setIsChanged(false);
      history.push('/');
    }
  };

  const handleReturn = () => {
    if (
      isChanged &&
      !window.confirm('You have unsaved changes. Discard changes and return?')
    ) {
      return;
    }

    history.push('/');
  };

  return (
    <div>
      {/* Memo Title Input */}
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={memoDetails.title}
        onChange={handleMemoChange}
      />

      {/* Memo Content Input */}
      <label>Content:</label>
      <textarea
        name="content"
        value={memoDetails.content}
        onChange={handleMemoChange}
      />

      {/* "Save", "Discard Changes", and "Return to Home Screen" Buttons */}
      <button onClick={handleSave}>Save</button>
      <button onClick={handleDiscard}>Discard Changes</button>
      <button onClick={handleReturn}>Return to Home Screen</button>
    </div>
  );
}

export default MemoDetailsScreen;
