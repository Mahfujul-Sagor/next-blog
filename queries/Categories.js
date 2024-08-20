"use server";
export const fetchCategories = async ()=> {
  const url = process.env.BASE_URL ? `${process.env.BASE_URL}/api/categories` : 'http://localhost:3000/api/categories';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}