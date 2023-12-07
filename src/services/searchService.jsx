// src/services/searchService.js

// Function to search memos by title
function searchMemosByTitle(memos, query) {
  return memos.filter((memo) =>
    memo.title.toLowerCase().includes(query.toLowerCase())
  );
}

// Function to search memos by content
function searchMemosByContent(memos, query) {
  return memos.filter((memo) =>
    memo.content.toLowerCase().includes(query.toLowerCase())
  );
}

// Combine search by title and content
function searchMemos(memos, query) {
  const byTitle = searchMemosByTitle(memos, query);
  const byContent = searchMemosByContent(memos, query);

  // Use Set to ensure unique results and merge the arrays
  const uniqueResults = [...new Set([...byTitle, ...byContent])];

  return uniqueResults;
}

module.exports = {
  searchMemosByTitle,
  searchMemosByContent,
  searchMemos,
};
