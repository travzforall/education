export const userService = {
  getUsersData: async () => {
    // Placeholder code to call the API to fetch user data
    const url = `https://18.189.14.69/api/v1/users/`;
    // Example fetch call
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const userData = await response.json();
    return userData;
  },

  // Method to fetch user data from the server
  fetchUserData: async (userId) => {
    // Placeholder code to call the API to fetch user data
    const url = `https://18.189.14.69/api/v1/users/${userId}`;
    // Example fetch call
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const userData = await response.json();
    return userData;
  },

  // Method to create a new user
  createUser: async (userData) => {
    // Placeholder code to call the API to create a new user
    const url = "https://18.189.14.69/api/v1/users";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
    const createdUser = await response.json();
    return createdUser;
  },

  // Method to update user data
  updateUser: async (userId, updatedUserData) => {
    // Placeholder code to call the API to update user data
    const url = `https://18.189.14.69/api/v1/users/${userId}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to update user data");
    }
    const updatedUser = await response.json();
    return updatedUser;
  },

  // Method to delete a user
  deleteUser: async (userId) => {
    // Placeholder code to call the API to delete a user
    const url = `https://18.189.14.69/api/v1/users/${userId}`;
    const options = {
      method: "DELETE",
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    // No need to return anything as user is deleted
  },
};
