const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Memo scheme
const memoScheme = new mongoose.Schema({
  title: String,
  content: String,
});

// Create a Memo model based on the scheme
const Memo = mongoose.model('Memo', memoScheme);

// Function to create a new memo
async function createMemo(memoDetails) {
  try {
    const newMemo = new Memo(memoDetails);
    const savedMemo = await newMemo.save();
    return savedMemo;
  } catch (error) {
    throw error;
  }
}

// Function to get memo details by ID
async function getMemoByID(memoId) {
  try {
    const memo = await Memo.findById(memoId);
    return memo;
  } catch (error) {
    throw error;
  }
}

// Function to update memo details by ID
async function updateMemoById(memoId, updateDetails) {
  try {
    const updateMemo = await Memo.findByIdAndUpdate(
      memoId,
      { $set: updateDetails },
      { new: true }
    );
    return updateMemo;
  } catch (error) {
    throw error;
  }
}

// Function to delete a memo by ID
async function deleteMemoById(memoId) {
  try {
    // Check if the memo exists
    const existingMemo = await Memo.findById(memoId);
    if (!existingMemo) {
      throw new Error('Memo not found');
    }

    // If the memo exists, delete it
    const deletedMemo = await Memo.findByIdAndDelete(memoId);
    return deletedMemo;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createMemo,
  getMemoByID,
  updateMemoById,
  deleteMemoById,
};
