// src/services/sortService.js

// Function to sort an array of items by date in ascending order
function sortByDateAsc(items) {
  return [...items].sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Function to sort an array of items by date in descending order
function sortByDateDesc(items) {
  return [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Function to sort an array of items by title in ascending order
function sortByTitleAsc(items) {
  return [...items].sort((a, b) => a.title.localeCompare(b.title));
}

// Function to sort an array of items by title in descending order
function sortByTitleDesc(items) {
  return [...items].sort((a, b) => b.title.localeCompare(a.title));
}

module.exports = {
  sortByDateAsc,
  sortByDateDesc,
  sortByTitleAsc,
  sortByTitleDesc,
};
