import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// ... (import statements)

function CreateNewMemoScreen() {
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
    // Implement the logic to save memoDetails to the backend (e.g., MongoDB)
    // For simplicity, let's assume a fetch request
    fetch('/api/memos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memoDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Memo saved:', data);
        setIsChanged(false);
        history.push('/');
      })
      .catch((error) => {
        console.error('Error saving memo:', error);
        // Handle error, e.g., show a user-friendly message
      });
  };

  // ... (similar changes for handleDiscard and handleReturn)

  return (
    <div>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={memoDetails.title}
        onChange={handleMemoChange}
      />

      <label>Content:</label>
      <textarea
        name="content"
        value={memoDetails.content}
        onChange={handleMemoChange}
      />

      <button onClick={handleSave}>Save</button>
      {/* ... (other buttons and UI elements) */}
    </div>
  );
}

export default CreateNewMemoScreen;
