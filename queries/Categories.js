"use server";

// Function to fetch categories from the API
export const fetchCategories = async () => {
  // Construct the URL based on the environment's BASE_URL or default to localhost
  const url = process.env.BASE_URL
    ? `${process.env.BASE_URL}/api/categories`
    : 'http://localhost:3000/api/categories';

  try {
    // Fetching the categories from the API
    const response = await fetch(url, {cache: 'force-cache'});

    // Check if the response is not okay, throw an error
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse and return the response data as JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error); // Log any errors that occur during fetch
    throw error; // Rethrow the error to be handled by the caller
  }
};
