import asyncHandler from 'express-async-handler';
// Desc     Auth user/set token
// route    POST /api/users/auth
// access   Public
const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Auth User' });
});

// Desc     Register a new user
// route    POST /api/users
// access   Public
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Register User' });
});

// Desc     Logout user
// route    POST /api/users/logout
// access   Public
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Logout User' });
});

// Desc     Get user profile
// route    GET /api/users/profile
// access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'User profile' });
});

// Desc     Update user profile
// route    PUT /api/users/profile
// access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Update user profile' });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
